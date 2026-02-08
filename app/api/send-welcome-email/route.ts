import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Validate Resend API key
if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not set. Welcome email functionality will not work.')
}

const resend = new Resend(process.env.RESEND_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 })
    }

    // Validate API key before sending
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ 
        success: false, 
        message: 'RESEND_API_KEY is not configured' 
      }, { status: 500 })
    }

    // Format welcome email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #f97316; font-size: 32px; margin: 0;">Muffin</h1>
        </div>
        
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #333; font-size: 24px; margin-top: 0;">Hoş Geldin ${name || 'Kullanıcı'}! 🎉</h2>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Muffin ailesine katıldığın için çok mutluyuz!
          </p>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Artık AI destekli işe alım sürecini kullanmaya başlayabilirsin. Mükemmel adayları bulmak için hazır mısın?
          </p>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3004'}/ex3" 
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
Hoş Geldin ${name || 'Kullanıcı'}! 🎉

Muffin ailesine katıldığın için çok mutluyuz!

Artık AI destekli işe alım sürecini kullanmaya başlayabilirsin. Mükemmel adayları bulmak için hazır mısın?

Dashboard'a git: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3004'}/ex3

Herhangi bir sorunuz varsa, bizimle iletişime geçmekten çekinmeyin.

Bu email Muffin tarafından gönderilmiştir.
    `

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Muffin <onboarding@resend.dev>',
      to: email,
      subject: 'Muffin\'e Hoş Geldin! 🎉',
      html: emailContent,
      text: textContent,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ success: false, message: 'Failed to send email', error }, { status: 500 })
    }

    console.log('Welcome email sent successfully!', data)
    return NextResponse.json({ success: true, message: 'Welcome email sent successfully', data })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json({ success: false, message: 'Error sending email', error: String(error) }, { status: 500 })
  }
}
