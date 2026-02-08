import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Validate Resend API key
if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not set. Email functionality will not work.')
}

const resend = new Resend(process.env.RESEND_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subject, message, promptContent } = body

    // Log for debugging
    console.log('Email API called')
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY)
    console.log('RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0)

    // Format email content similar to previous format
    const emailContent = `
Yeni bir prompt gönderildi
Kullanıcı: unknown@example.com

Kullanıcı ID: anonymous

Tarih: ${new Date().toLocaleString('tr-TR', { 
  day: '2-digit', 
  month: '2-digit', 
  year: 'numeric', 
  hour: '2-digit', 
  minute: '2-digit', 
  second: '2-digit' 
})}

Prompt İçeriği:
${promptContent || message}

${message && message !== promptContent ? `\n\nDetaylar:\n${message}` : ''}
    `.trim()

    // Validate API key before sending
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ 
        success: false, 
        message: 'RESEND_API_KEY is not configured' 
      }, { status: 500 })
    }

    // Send email using Resend API directly
    console.log('Sending email via Resend API...')
    
    // Try with verified domain first, fallback to onboarding@resend.dev
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: 'furkannative@gmail.com',
      subject: subject || 'New Prompt Submission from Muffin',
      html: emailContent.replace(/\n/g, '<br>'),
      text: emailContent,
      replyTo: 'noreply@muffin.com',
    })

    if (error) {
      console.error('Resend error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return NextResponse.json({ success: false, message: 'Failed to send email', error }, { status: 500 })
    }

    console.log('Email sent successfully!', data)
    return NextResponse.json({ success: true, message: 'Email sent successfully', data })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json({ success: false, message: 'Error sending email', error: String(error) }, { status: 500 })
  }
}
