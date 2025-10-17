const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./'));

// Email configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  // For development: disable certificate verification if needed
  // For production: remove this line and use proper Gmail App Password
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production'
  }
});

// Test email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('✓ Email service is ready');
  }
});

// ===== API ENDPOINTS =====

/**
 * POST /api/send-confirmation
 * Sends booking confirmation email and stores order data
 */
app.post('/api/send-confirmation', async (req, res) => {
  try {
    const {
      name,
      email,
      eventName,
      eventDate,
      eventLocation,
      numberOfSeats,
      pricePerSeat,
      totalPrice,
      depositAmount,
      amountPaid,
      paymentType,
      paymentReference,
      paymentMethod,
      timestamp
    } = req.body;

    // Validate required fields
    if (!name || !email || !eventName || !paymentReference) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email template
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Poppins', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 30px; border-radius: 8px; text-align: center; margin-bottom: 30px; }
          .header h1 { margin: 0; font-size: 24px; }
          .header p { margin: 5px 0 0; opacity: 0.95; }
          .content { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .section { margin-bottom: 20px; }
          .section-title { font-weight: 600; color: #f97316; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd; }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { font-weight: 500; color: #666; }
          .detail-value { color: #333; }
          .highlight { background: #fff3e0; padding: 12px; border-left: 4px solid #f97316; border-radius: 4px; margin: 15px 0; }
          .cta { display: inline-block; background: #f97316; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; margin: 15px 0; text-align: center; }
          .footer { text-align: center; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
          .reference { background: white; padding: 15px; border-radius: 6px; border: 2px dashed #f97316; text-align: center; margin: 20px 0; }
          .reference-label { font-size: 12px; color: #999; }
          .reference-value { font-size: 18px; font-weight: bold; color: #f97316; font-family: monospace; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔥 Groundflex Adventures</h1>
            <p>Your Booking Confirmation</p>
          </div>

          <div class="content">
            <h2 style="margin-top: 0; color: #333;">Thank You, ${name}!</h2>
            <p>Your booking has been confirmed. Here are your event details:</p>

            <div class="section">
              <div class="section-title">📅 Event Information</div>
              <div class="detail-row">
                <span class="detail-label">Event:</span>
                <span class="detail-value"><strong>${eventName}</strong></span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${eventDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Location:</span>
                <span class="detail-value">${eventLocation}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Group Size:</span>
                <span class="detail-value">${numberOfSeats} ${numberOfSeats === 1 ? 'person' : 'people'}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">💰 Payment Details</div>
              <div class="detail-row">
                <span class="detail-label">Price per seat:</span>
                <span class="detail-value">KES ${pricePerSeat.toLocaleString()}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Total Amount:</span>
                <span class="detail-value">KES ${totalPrice.toLocaleString()}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Payment Type:</span>
                <span class="detail-value">${paymentType || 'Deposit (50%)'}</span>
              </div>
              <div class="detail-row" style="font-weight: bold;">
                <span class="detail-label">Amount Paid:</span>
                <span class="detail-value" style="color: #f97316;">KES ${(amountPaid || depositAmount).toLocaleString()}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Payment Method:</span>
                <span class="detail-value">${paymentMethod}</span>
              </div>
            </div>

            <div class="reference">
              <div class="reference-label">Payment Reference</div>
              <div class="reference-value">${paymentReference}</div>
            </div>

            <div class="highlight">
              <strong>⚠️ Important:</strong> Please save your payment reference. You'll need it for check-in on the day of the event.
            </div>

            <div class="section" style="background: white; padding: 15px; border-radius: 6px;">
              <div class="section-title">📋 Next Steps</div>
              <ul style="margin: 10px 0; padding-left: 20px; color: #666;">
                <li>Keep this email safe for reference</li>
                <li>Arrive 15 minutes early on event day</li>
                <li>Bring valid ID for verification</li>
                <li>Any questions? Reply to this email</li>
              </ul>
            </div>

            <p style="margin-top: 30px; color: #f97316; font-weight: 600;">🚐 Get ready for an unforgettable Groundflex Adventure!</p>
          </div>

          <div class="footer">
            <p>Groundflex Adventures | ${new Date(timestamp).toLocaleDateString()}</p>
            <p>For support, email: support@groundflexadventures.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `✓ Booking Confirmed - ${eventName} - Groundflex Adventures`,
      html: emailHTML,
      replyTo: process.env.EMAIL_REPLY_TO || process.env.EMAIL_USER
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✓ Email sent to ${email}:`, info.messageId);

    // TODO: Save order to database
    // const order = new Order({
    //   name, email, eventName, eventDate, eventLocation,
    //   numberOfSeats, pricePerSeat, totalPrice, depositAmount,
    //   paymentReference, paymentMethod, timestamp
    // });
    // await order.save();

    res.json({
      success: true,
      message: 'Confirmation email sent successfully',
      reference: paymentReference
    });

  } catch (error) {
    console.error('Error sending confirmation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send confirmation email',
      message: error.message
    });
  }
});

/**
 * POST /api/verify-payment
 * Verify payment with payment gateway (for backend verification)
 */
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { reference, method } = req.body;

    if (!reference || !method) {
      return res.status(400).json({ error: 'Missing reference or method' });
    }

    // TODO: Implement payment verification based on method
    // For Paystack: Use Paystack API to verify
    // For PayPal: Use PayPal API to verify
    // For M-Pesa: Use M-Pesa API to verify

    console.log(`Verifying payment: ${reference} via ${method}`);

    res.json({
      success: true,
      verified: true,
      reference
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      error: 'Payment verification failed'
    });
  }
});

/**
 * POST /api/send-reminder
 * Send event reminder email (call 24 hours before event)
 */
app.post('/api/send-reminder', async (req, res) => {
  try {
    const { email, eventName, eventDate, eventTime, eventLocation } = req.body;

    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Poppins', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 30px; border-radius: 8px; text-align: center; }
          .content { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Event Reminder</h1>
          </div>
          <div class="content">
            <h2>Your Groundflex Adventure is Tomorrow!</h2>
            <p>Don't miss out! Here's a quick reminder:</p>
            <ul>
              <li><strong>Event:</strong> ${eventName}</li>
              <li><strong>Date:</strong> ${eventDate}</li>
              <li><strong>Time:</strong> ${eventTime}</li>
              <li><strong>Location:</strong> ${eventLocation}</li>
            </ul>
            <p><strong>See you soon! 🚐</strong></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `🔔 Reminder: ${eventName} Tomorrow!`,
      html: emailHTML
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Reminder sent' });

  } catch (error) {
    console.error('Error sending reminder:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send reminder'
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Groundflex Adventures Server         ║
║   🚐 Running on port ${PORT}            ║
╚════════════════════════════════════════╝
  `);
});