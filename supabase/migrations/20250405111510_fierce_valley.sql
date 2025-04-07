/*
  # Initial Schema Setup for Investment Platform

  1. New Tables
    - `profiles`
      - Extended user profile information
      - Linked to auth.users
      - Stores bank account details
    
    - `balances`
      - Tracks user account balances
      - One balance record per user
      - Updated on transactions
    
    - `transactions`
      - Records all money movements
      - Types: deposit, withdrawal
      - Links to users and maintains audit trail
    
    - `admin_balances`
      - Platform-wide balance tracking
      - Total deposits and withdrawals
      - Used for admin reporting

  2. Security
    - Enable RLS on all tables
    - Policies for user access to own data
    - Admin-only access to admin_balances
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  bank_name text,
  bank_account_number text,
  bank_account_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create balances table
CREATE TABLE IF NOT EXISTS balances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount decimal(19,2) DEFAULT 0.00 NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT positive_balance CHECK (amount >= 0)
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('deposit', 'withdrawal')),
  amount decimal(19,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  reference text UNIQUE,
  payment_provider text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin_balances table
CREATE TABLE IF NOT EXISTS admin_balances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_deposits decimal(19,2) DEFAULT 0.00 NOT NULL,
  total_withdrawals decimal(19,2) DEFAULT 0.00 NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_balances ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Balances policies
CREATE POLICY "Users can view own balance"
  ON balances FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Transactions policies
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Admin balances policies (only accessible by service role)
CREATE POLICY "No direct access to admin_balances"
  ON admin_balances FOR ALL
  TO authenticated
  USING (false);

-- Functions
CREATE OR REPLACE FUNCTION update_balances_on_transaction()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' THEN
    IF NEW.type = 'deposit' THEN
      -- Update user balance
      UPDATE balances
      SET amount = amount + NEW.amount,
          updated_at = now()
      WHERE user_id = NEW.user_id;
      
      -- Update admin total deposits
      UPDATE admin_balances
      SET total_deposits = total_deposits + NEW.amount,
          updated_at = now()
      WHERE id = (SELECT id FROM admin_balances LIMIT 1);
    ELSIF NEW.type = 'withdrawal' THEN
      -- Update user balance
      UPDATE balances
      SET amount = amount - NEW.amount,
          updated_at = now()
      WHERE user_id = NEW.user_id;
      
      -- Update admin total withdrawals
      UPDATE admin_balances
      SET total_withdrawals = total_withdrawals + NEW.amount,
          updated_at = now()
      WHERE id = (SELECT id FROM admin_balances LIMIT 1);
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_balances_after_transaction
  AFTER UPDATE OF status ON transactions
  FOR EACH ROW
  WHEN (OLD.status != 'completed' AND NEW.status = 'completed')
  EXECUTE FUNCTION update_balances_on_transaction();

-- Insert initial admin balance record
INSERT INTO admin_balances (id) VALUES (gen_random_uuid())
ON CONFLICT DO NOTHING;