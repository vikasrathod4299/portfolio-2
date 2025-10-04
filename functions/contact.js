export async function onRequest(context) {
  try {
    const { env } = context
    const { name, email, message } = await context.request.json()

    if (!email || !message) {
      return new Response(
        JSON.stringify(
          { error: 'Email and message are required.' },
          { status: 400, headers: { 'content-type': 'application/json' } },
        ),
      )
    }

    const payload = {
      from: 'Portfolio Contact <contact@vikasrathod.dev>',
      to: 'vikas.rv4299@gmail.com',
      subject: `New message from ${name || 'Visitor'}`,
      reply_to: email,
      text: message,
      html: `<h3>New portfolio message</h3>
             <p><strong>Name:</strong> ${name || 'Anonymous'}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    }

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.VITE_RESEND_API_KEY}`,
      },
      body: JSON.stringify(payload),
    })

    if (!resp.ok) {
      const errorData = await resp.json()
      console.log('Resend err: ', errorData)
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: errorData }),
        { status: 500, headers: { 'content-type': 'application/json' } },
      )
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in contact function: ', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}
