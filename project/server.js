import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fueltrixteam@gmail.com',
    pass: 'eqnd bkeo iwqk egmh'
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
    from: 'fueltrixteam@gmail.com',
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
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333333;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background-color: #1a73e8;
            padding: 20px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            padding: 30px;
          }
          .content h2 {
            color: #1a73e8;
            font-size: 24px;
            margin-bottom: 20px;
          }
          .content p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
          }
          .event-details {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 20px;
          }
          .event-details ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .event-details li {
            font-size: 16px;
            margin-bottom: 10px;
            color: #555555;
          }
          .event-details li strong {
            color: #333333;
          }
          .cta-button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #1a73e8;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
            margin: 20px 0;
            text-align: center;
          }
          .footer {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #777777;
          }
          .footer a {
            color: #1a73e8;
            text-decoration: none;
          }
          @media only screen and (max-width: 600px) {
            .container {
              margin: 10px;
            }
            .content {
              padding: 20px;
            }
            .header {
              padding: 15px;
            }
            .header h1 {
              font-size: 20px;
            }
            .cta-button {
              display: block;
              width: 100%;
              box-sizing: border-box;
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
            <h2>Registration Successful!</h2>
            <p>Dear ${user.name},</p>
            <p>Thank you for registering for <strong>${event.title}</strong>. We're excited to have you join us!</p>
            <div class="event-details">
              <p><strong>Event Details:</strong></p>
              <ul>
                <li><strong>Date:</strong> ${event.date}</li>
                <li><strong>Time:</strong> ${event.time}</li>
                <li><strong>Location:</strong> ${event.location}</li>
                <li><strong>Number of Attendees:</strong> ${user.attendees}</li>
                <li><strong>Description:</strong> ${event.description}</li>
              </ul>
            </div>
            <p>We look forward to seeing you there! Add this event to your calendar or visit our website for more details.</p>
            <a href="#" class="cta-button">View Event Details</a>
          </div>
          <div class="footer">
            <p>Smart City Initiative Team<br>
            <a href="mailto:support@smartcityinitiative.com">support@smartcityinitiative.com</a> | 
            <a href="#">www.smartcityinitiative.com</a></p>
            <p>If you have any questions, feel free to contact us!</p>
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