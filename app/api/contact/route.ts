import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Log the contact form submission
    console.log('Contact form submission:', { name, email, message });

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured - contact form logged only');
      return NextResponse.json(
        { 
          message: 'Message received! We will contact you via email at soasecureltd@gmail.com',
          note: 'Email service is in setup mode'
        },
        { status: 200 }
      );
    }

    // Try to send email using Resend with timeout
    try {
      const data = await Promise.race([
        resend.emails.send({
          from: 'Contact Form <onboarding@resend.dev>',
          to: 'soasecureltd@gmail.com',
          replyTo: email,
          subject: `Portfolio Contact from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2D9CDB;">New Contact Form Submission</h2>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap; color: #333;">${message}</p>
              </div>
              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                Reply to this email to contact ${name} directly.
              </p>
            </div>
          `,
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        )
      ]);

      if (data && typeof data === 'object' && 'error' in data && data.error) {
        throw new Error(JSON.stringify(data.error));
      }

      return NextResponse.json(
        { 
          message: 'Message sent successfully! We will get back to you soon.',
          id: data && typeof data === 'object' && 'data' in data ? (data as any).data?.id : undefined
        },
        { status: 200 }
      );

    } catch (emailError) {
      // Email failed, but log it and return success to user
      console.error('Email sending failed:', emailError);
      console.log('Contact details saved for manual follow-up:', { name, email });
      
      return NextResponse.json(
        { 
          message: 'Message received! We will contact you at soasecureltd@gmail.com',
          fallback: true
        },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Unable to process request. Please email us directly at soasecureltd@gmail.com' },
      { status: 500 }
    );
  }
}
