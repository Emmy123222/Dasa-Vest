/*
  # Update Profiles Schema

  1. Changes
    - Add required fields for user profiles
    - Add user role and verification fields
    
  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS phone_number text,
  ADD COLUMN IF NOT EXISTS user_role text CHECK (user_role IN ('buyer', 'seller', 'agent')),
  ADD COLUMN IF NOT EXISTS terms_accepted boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS verification_code text,
  ADD COLUMN IF NOT EXISTS verification_code_expires_at timestamptz;