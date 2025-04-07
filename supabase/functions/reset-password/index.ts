import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import { SmtpClient } from 'npm:@sendgrid/mail@8.1.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { email } = await req.json();
    
    // Generate a random 6-digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 1);

    // Store the reset code in the user's profile
    const { data: userData, error: userError } = await supabaseClient
      .from('profiles')
      .update({
        reset_password_code: resetCode,
        reset_password_expires_at: resetExpires.toISOString(),
      })
      .eq('email', email);

    if (userError) throw userError;

    // Send email with reset code
    const sgMail = new SmtpClient();
    sgMail.setApiKey(Deno.env.get('SENDGRID_API_KEY') ?? '');

    const msg = {
      to: email,
      from: 'noreply@yourdomain.com',
      subject: 'Reset Your Password',
      text: `Your password reset code is: ${resetCode}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Reset Your Password</h2>
          <p>You requested to reset your password. Use this code to set a new password:</p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; letter-spacing: 5px;">
            ${resetCode}
          </div>
          <p>This code will expire in 1 hour.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    };

    await sgMail.send(msg);

    return new Response(
      JSON.stringify({ message: 'Password reset code sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});