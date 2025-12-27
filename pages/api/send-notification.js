import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const getTypeEmoji = (type) => {
  switch (type) {
    case 'deal': return '💼';
    case 'project': return '🏗️';
    case 'task': return '✅';
    case 'inventory': return '📦';
    case 'quote': return '📄';
    default: return '🔔';
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { to, subject, message, type } = req.body;

    if (!to || !subject) {
      return res.status(400).json({ error: "Recipient and subject are required" });
    }

    const data = await resend.emails.send({
      from: "Gold.Arch <onboarding@resend.dev>",
      to: [to],
      replyTo: "goldarch.notifications@gmail.com",
      subject: `${getTypeEmoji(type)} ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #007AFF; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 20px; background: #f9f9f9; }
            .message { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #e0e0e0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; background: #f0f0f0; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">${getTypeEmoji(type)} Gold.Arch Notification</h1>
            </div>
            <div class="content">
              <h2 style="color: #007AFF;">${subject}</h2>
              <div class="message">
                <p>${message || 'You have a new notification from Gold.Arch.'}</p>
              </div>
              <p>Log in to Gold.Arch to view more details.</p>
            </div>
            <div class="footer">
              <p>Gold.Arch Supplier Management System</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: error.message });
  }
}
