import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || ''

serve(async (req) => {
  try {
    const { user, event } = await req.json()

    // Only send email for signup events
    if (event !== 'user.signup') {
      return new Response(JSON.stringify({ message: 'Event not handled' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    const email = user.email
    const name = user.user_metadata?.full_name || 'User'

    // Send welcome email via Resend
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #f97316; font-size: 32px; margin: 0;">Muffin</h1>
        </div>
        
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #333; font-size: 24px; margin-top: 0;">Hoş Geldin ${name}! 🎉</h2>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Muffin ailesine katıldığın için çok mutluyuz!
          </p>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Artık AI destekli işe alım sürecini kullanmaya başlayabilirsin. Mükemmel adayları bulmak için hazır mısın?
          </p>
          
          <div style="margin: 30px 0;">
            <a href="https://your-domain.com/ex3" 
               style="display: inline-block; background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Dashboard'a Git
            </a>
          </div>
          
          <p style="color: #999; font-size: 14px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            Herhangi bir sorunuz varsa, bizimle iletişime geçmekten çekinmeyin.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
          <p>Bu email Muffin tarafından gönderilmiştir.</p>
        </div>
      </div>
    `

    const textContent = `
Hoş Geldin ${name}! 🎉

Muffin ailesine katıldığın için çok mutluyuz!

Artık AI destekli işe alım sürecini kullanmaya başlayabilirsin. Mükemmel adayları bulmak için hazır mısın?

Dashboard'a git: https://your-domain.com/ex3

Herhangi bir sorunuz varsa, bizimle iletişime geçmekten çekinmeyin.

Bu email Muffin tarafından gönderilmiştir.
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Muffin <onboarding@resend.dev>',
        to: email,
        subject: 'Muffin\'e Hoş Geldin! 🎉',
        html: emailContent,
        text: textContent,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Resend error:', error)
      throw new Error(`Failed to send email: ${error}`)
    }

    const data = await response.json()
    console.log('Email sent successfully:', data)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Welcome email sent successfully',
        emailId: data.id 
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in send-welcome-email function:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
