import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abc@gmail.com',
    pass: 'password123' 
  }
});

app.post('/api/register', async (req, res) => {
  const { event, user } = req.body;

  if (!event || !user || !user.email || !user.name || !user.attendees) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (user.attendees < 1 || user.attendees > event.remaining) {
    return res.status(400).json({ error: `Invalid number of attendees. Only ${event.remaining} spots available.` });
  }

  const mailOptions = {
    from: 'abc@gmail.com',
    to: user.email,
    subject: `Registration Confirmation for ${event.title}`,
    html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f5f7fa;
      color: #1f2a44;
      line-height: 1.6;
    }
    .container {
      max-width: 640px;
      margin: 24px auto;
      background: linear-gradient(145deg, #ffffff, #f8fafc);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(90deg, #3b82f6, #60a5fa);
      padding: 32px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 40px;
    }
    .content h2 {
      color: #3b82f6;
      font-size: 26px;
      font-weight: 600;
      margin: 0 0 24px;
    }
    .content p {
      font-size: 16px;
      margin: 0 0 20px;
      color: #4b5563;
    }
    .event-details {
      background-color: #f8fafc;
      padding: 24px;
      border-radius: 12px;
      margin-bottom: 24px;
      border-left: 4px solid #3b82f6;
    }
    .event-details ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .event-details li {
      font-size: 15px;
      margin-bottom: 12px;
      color: #4b5563;
    }
    .event-details li strong {
      color: #1f2a44;
      font-weight: 600;
    }
    .cta-button {
      display: inline-block;
      padding: 12px 32px;
      background: linear-gradient(90deg, #3b82f6, #60a5fa);
      color: #ffffff;
      text-decoration: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      text-align: center;
    }
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }
    .footer {
      background-color: #f1f5f9;
      padding: 24px;
      text-align: center;
      font-size: 14px;
      color: #6b7280;
    }
    .footer a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    @media only screen and (max-width: 600px) {
      .container {
        margin: 12px;
        border-radius: 12px;
      }
      .content {
        padding: 24px;
      }
      .header {
        padding: 24px;
      }
      .header h1 {
        font-size: 24px;
      }
      .event-details {
        padding: 20px;
      }
      .cta-button {
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Smart City Initiative</h1>
    </div>
    <div class="content">
      <h2>Registration Confirmed!</h2>
      <p>Dear ${user.name},</p>
      <p>We're thrilled to confirm your registration for <strong>${event.title}</strong>. Get ready for an exciting experience!</p>
      <div class="event-details">
        <p><strong>Event Details:</strong></p>
        <ul>
          <li><strong>Date:</strong> ${event.date}</li>
          <li><strong>Time:</strong> ${event.time}</li>
          <li><strong>Location:</strong> ${event.location}</li>
          <li><strong>Attendees:</strong> ${user.attendees}</li>
          <li><strong>Description:</strong> ${event.description}</li>
        </ul>
      </div>
      <p>Mark your calendar and join us for an unforgettable event. Visit our website for more details or to manage your registration.</p>
      <a href="#" class="cta-button">Explore Event Details</a>
    </div>
    <div class="footer">
      <p>Smart City Initiative Team<br>
      <a href="mailto:support@smartcityinitiative.com">support@smartcityinitiative.com</a> | 
      <a href="#">www.smartcityinitiative.com</a></p>
      <p>Questions? We're here to help!</p>
    </div>
  </div>
</body>
</html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Registration successful, email sent!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});