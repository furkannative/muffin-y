import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Validate Resend API key
if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not set. Test email functionality will not work.')
}

const resend = new Resend(process.env.RESEND_API_KEY || '')

export async function GET(request: NextRequest) {
  try {
    console.log('Testing email send...')
    console.log('API Key exists:', !!process.env.RESEND_API_KEY)
    
    // Validate API key before sending
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ 
        success: false, 
        message: 'RESEND_API_KEY is not configured. Please set it in your environment variables.' 
      }, { status: 500 })
    }
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'furkannative@gmail.com',
      subject: 'Test Email from Muffin',
      html: '<p>This is a test email to verify Resend is working.</p>',
      text: 'This is a test email to verify Resend is working.',
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ 
        success: false, 
        error: error,
        message: 'Failed to send test email' 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully!',
      data 
    })
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Error sending test email',
      error: String(error) 
    }, { status: 500 })
  }
}
