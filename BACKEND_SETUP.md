# Groundflex Adventures - Backend Setup Guide

## Overview
This guide covers the setup of the Node.js backend server for order confirmations, email notifications, and payment verification.

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Gmail account (or other email service)
- Paystack, PayPal, and M-Pesa accounts (for payment testing)

## Installation Steps

### 1. Install Dependencies
```bash
cd c:\groundflex
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

Edit `.env` with your configuration:

#### Email Configuration (Required)

**For Gmail:**
1. Go to [Google Account Settings](https://myaccount.google.com)
2. Enable "2-Step Verification"
3. Generate an "App Password" for Mail
4. Add to `.env`:
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**For Other Email Services:**
```
EMAIL_SERVICE=smtp.example.com
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-password
```

#### Payment Gateway Configuration

**Paystack:**
1. Sign up at [Paystack](https://paystack.com)
2. Go to Dashboard → Settings → API Keys & Webhooks
3. Add to `.env`:
```
PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxx
```

**PayPal:**
1. Sign up at [PayPal Developer](https://developer.paypal.com)
2. Create a Sandbox app
3. Get your Client ID
4. Add to `.env`:
```
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_client_secret
```

**M-Pesa:**
1. Register at [Safaricom Daraja](https://developer.safaricom.co.ke/)
2. Create an app for Lipa Na M-Pesa Online
3. Get your Consumer Key and Consumer Secret
4. Add to `.env`:
```
MPESA_CONSUMER_KEY=xxxxx
MPESA_CONSUMER_SECRET=xxxxx
```

### 3. Update Frontend Configuration

In `index.html`, update the Paystack and PayPal keys in the JavaScript:

Search for `pk_test_your_paystack_public_key` and replace with your actual key:
```javascript
key: process.env.PAYSTACK_PUBLIC_KEY
```

For PayPal, update the SDK script tag:
```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_ACTUAL_CLIENT_ID&currency=USD"></script>
```

## Running the Server

### Development Mode
```bash
npm run dev
```
This uses `nodemon` for auto-restart on file changes.

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

Check health:
```bash
curl http://localhost:3000/api/health
```

## API Endpoints

### 1. Send Booking Confirmation
**POST** `/api/send-confirmation`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "eventName": "THIBA FALLS",
  "eventDate": "23 November 2024",
  "eventLocation": "Kirinyaga, Kenya",
  "numberOfSeats": 2,
  "pricePerSeat": 2500,
  "totalPrice": 5000,
  "depositAmount": 2500,
  "paymentReference": "groundflex_1234567890",
  "paymentMethod": "Paystack",
  "timestamp": "2024-11-20T10:30:00Z"
}
```

Response:
```json
{
  "success": true,
  "message": "Confirmation email sent successfully",
  "reference": "groundflex_1234567890"
}
```

### 2. Verify Payment
**POST** `/api/verify-payment`

Request body:
```json
{
  "reference": "groundflex_1234567890",
  "method": "Paystack"
}
```

### 3. Send Event Reminder
**POST** `/api/send-reminder`

Request body:
```json
{
  "email": "john@example.com",
  "eventName": "THIBA FALLS",
  "eventDate": "23 November 2024",
  "eventTime": "06:30 AM",
  "eventLocation": "Kirinyaga, Kenya"
}
```

### 4. Health Check
**GET** `/api/health`

Response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Frontend Integration

The frontend automatically sends order confirmation requests when a payment is completed:

```javascript
// This is called after successful payment
async function sendOrderConfirmation(name, email, event, numberOfPeople, reference, paymentMethod) {
  const orderData = {
    name, email, eventName: event.name, eventDate: event.date,
    eventLocation: event.location, numberOfSeats: numberOfPeople,
    pricePerSeat: event.price, totalPrice: event.price * numberOfPeople,
    depositAmount: (event.price * 0.5) * numberOfPeople,
    paymentReference: reference, paymentMethod,
    timestamp: new Date().toISOString()
  };

  const response = await fetch('/api/send-confirmation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });

  if (response.ok) {
    console.log('Order confirmation sent');
    generateTicketPDF(name, email, event, numberOfPeople, reference);
  }
}
```

## Testing Payment Gateways

### Paystack Test Cards
- Visa: `4084084084084081` | Expiry: `12/25` | CVV: `123`
- Mastercard: `5061017108000000` | Expiry: `12/25` | CVV: `123`

### PayPal Sandbox
- Use your sandbox account at [PayPal Sandbox](https://sandbox.paypal.com)

### M-Pesa Test
- Use test credentials from Safaricom Daraja

## Database Setup (Optional)

For production, store orders in a database:

### MongoDB
```bash
npm install mongoose
```

Create a model:
```javascript
const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  eventName: String,
  numberOfSeats: Number,
  totalPrice: Number,
  depositAmount: Number,
  paymentReference: String,
  paymentMethod: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
```

### PostgreSQL
```bash
npm install pg
```

## Troubleshooting

### Email not sending
- Check `.env` credentials
- Verify Gmail app password (not regular password)
- Check if "Less secure app access" is disabled
- Check spam/trash folder

### Payment verification failing
- Verify API keys are correct
- Check if test mode is enabled
- Ensure payment reference is correct

### CORS errors
- Update `CORS_ORIGIN` in `.env`
- Ensure frontend and backend are on same origin or configure CORS properly

## Deployment

### Heroku
```bash
# Login to Heroku
heroku login

# Create app
heroku create groundflex-adventures

# Set environment variables
heroku config:set EMAIL_USER=xxxxx EMAIL_PASSWORD=xxxxx

# Deploy
git push heroku main
```

### Vercel
```bash
npm install -g vercel
vercel
```

Update `.env` with production URLs.

### AWS/DigitalOcean
See deployment guides in respective platforms' documentation.

## Security Considerations

1. **Never commit `.env` to version control**
2. **Use HTTPS in production**
3. **Implement rate limiting for API endpoints**
4. **Validate all user inputs**
5. **Use environment variables for sensitive data**
6. **Implement CSRF protection**
7. **Add authentication for admin endpoints**
8. **Enable CORS only for trusted origins**

## Monitoring

Set up monitoring for:
- Email delivery failures
- Payment verification errors
- Server uptime
- Error logs

Example monitoring services:
- Sentry (error tracking)
- Loggly (log management)
- New Relic (performance)
- UptimeRobot (uptime monitoring)

## Support

For issues or questions:
1. Check logs: `npm run dev` outputs detailed logs
2. Verify `.env` configuration
3. Test API endpoints with Postman
4. Check email service documentation
5. Review payment gateway API docs

---

**Last Updated:** November 2024