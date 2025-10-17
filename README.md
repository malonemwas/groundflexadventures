# 🚐 Groundflex Adventures - Kenyan Matatu Culture Photo Experience

A premium landing page and booking platform for immersive matatu (Kenyan van) photography experiences with integrated payment processing and order management.

## 🎯 Features

### 🎠 Main Carousel System
- **3 Event Carousel**: Auto-sliding showcase of upcoming adventures
- **Manual Controls**: Previous/Next buttons for user control
- **Indicator Dots**: Quick navigation between events
- **Auto-pause on Hover**: Smooth user experience
- **Responsive Design**: Works perfectly on all devices

#### Featured Events
1. **THIBA FALLS** (KES 2,500)
   - Full-day safari to Kirinyaga
   - Professional photography session
   - Swimming & exploration

2. **CHROME JUNGLE NIGHT** (KES 3,500)
   - Urban nightlife exploration
   - Night photography masterclass
   - Premium LED matatu

3. **GOLDEN HOUR SAFARI** (KES 4,000)
   - Cinematic sunset sessions
   - Fashion styling guidance
   - Premium interiors

### 📸 Per-Event Image Carousels
- 3 photos per event
- Individual navigation controls
- Smooth transitions

### 🎫 Booking System
- Elegant modal with event details
- Event information display
- Image gallery
- Booking form with validation
- Special requests field

### 💳 Payment System
- **50% Deposit Calculation**: Automatic deposit calculation
- **Multiple Payment Methods**:
  - Paystack (Kenya primary)
  - PayPal (International)
  - M-Pesa (Mobile money)
- **Payment Summary**: Clear breakdown of costs
- **PDF Ticket Generation**: Automatic download after payment

### 📧 Email Confirmation
- HTML-formatted confirmation emails
- Order details summary
- Payment reference
- Event reminders
- Professional branding

### 🛡️ Accessibility
- ARIA labels and semantic HTML
- Keyboard navigation support
- Reduced motion preferences respected
- Screen reader friendly
- Mobile-optimized

## 📁 Project Structure

```
groundflex/
├── index.html              # Main landing page with embedded CSS
├── server.js               # Node.js backend with Express
├── package.json            # Dependencies
├── .env.example            # Environment configuration template
├── .env                    # Environment variables (not committed)
├── BACKEND_SETUP.md        # Backend setup guide
├── README.md               # This file
│
├── Images/ (in root)
│   ├── Phenomenal Matwana Nganya Digital Art.jpeg
│   ├── Matwana Culture.jpeg
│   ├── FUNKADELICA.jpeg
│   ├── Ali Bomaye 🔥.jpeg
│   └── ... (40+ matatu culture images)
│
└── .zencoder/
    └── rules/
        └── repo.md         # Repository guidelines
```

## 🚀 Quick Start

### Frontend Only (No Backend)
1. Open `index.html` directly in browser
2. View carousel and booking flow
3. Payment modals will show (backend integration needed for actual payments)

### With Backend Server

#### Prerequisites
- Node.js v14+ 
- npm
- Gmail account (for emails)

#### Installation
```bash
# Install dependencies
npm install

# Copy environment template
copy .env.example .env

# Configure .env with your API keys
# (See BACKEND_SETUP.md for detailed instructions)

# Start development server
npm run dev

# Open http://localhost:3000 in browser
```

## 🎬 How It Works

### User Flow

1. **Browse Events** → User views the 3-event carousel with auto-sliding
2. **View Details** → Click an event to see full details with images
3. **Fill Booking Form** → Enter name, email, phone, number of seats
4. **Review & Proceed** → Confirm booking details
5. **Choose Payment** → Select Paystack, PayPal, or M-Pesa
6. **Process Payment** → 50% deposit charged
7. **Confirm & Download** → Receive confirmation email + PDF ticket

### Technical Architecture

```
Frontend (index.html)
    ↓ (Payment & Booking Data)
    ↓
Backend (server.js)
    ├── Email Service (Nodemailer)
    │   └── Sends confirmation emails
    ├── Payment Verification
    │   ├── Paystack API
    │   ├── PayPal API
    │   └── M-Pesa API
    └── Order Storage (Optional Database)
        ├── MongoDB
        └── PostgreSQL
```

## 🔧 Configuration

### Environment Variables (.env)

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Payment Keys
PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
PAYPAL_CLIENT_ID=your_client_id
MPESA_CONSUMER_KEY=xxxxx

# Server
PORT=3000
NODE_ENV=development
```

See `BACKEND_SETUP.md` for detailed configuration instructions.

## 💳 Payment Integration

### Paystack
- Primary payment method for Kenya
- Test mode available for development
- Automatic invoice generation

### PayPal
- International payments
- Sandbox mode for testing
- Buyer protection included

### M-Pesa
- Mobile money for Kenya
- Manual verification process
- Low transaction fees

See `BACKEND_SETUP.md` for API key setup and testing.

## 📧 Email Features

### Confirmation Email
- HTML formatted with branding
- Event details
- Payment summary
- Payment reference
- Next steps

### Reminder Email (Optional)
- Sent 24 hours before event
- Event details
- Location & time
- Attendance reminder

### Email Template
- Professional design
- Mobile optimized
- Brand consistent
- Clear call-to-action

## 📱 Responsive Design

Optimized for all devices:
- **Desktop**: Full-width carousel with side-by-side layout
- **Tablet (900px)**: Adjusted carousel width
- **Mobile (520px)**: Stacked layout, full-width components

## ♿ Accessibility Features

- ✅ Semantic HTML structure
- ✅ ARIA labels and descriptions
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Focus management
- ✅ Reduced motion support
- ✅ Color contrast compliance
- ✅ Screen reader friendly

## 🔐 Security

- ✅ CORS protection
- ✅ Input validation
- ✅ Environment variable protection
- ✅ HTTPS support (production)
- ✅ Secure payment handling
- ✅ XSS prevention
- ✅ CSRF protection

## 📊 Analytics (Optional)

Integrate with:
- Google Analytics
- Mixpanel
- Amplitude

Track:
- Carousel interactions
- Booking form submissions
- Payment completions
- Email delivery

## 🚀 Deployment

### Heroku
```bash
heroku login
heroku create groundflex-adventures
heroku config:set EMAIL_USER=xxxxx EMAIL_PASSWORD=xxxxx
git push heroku main
```

### Vercel
```bash
vercel
```

### AWS/DigitalOcean
See platform-specific deployment guides.

## 📋 API Endpoints

### POST /api/send-confirmation
Sends booking confirmation email
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "eventName": "THIBA FALLS",
  "eventDate": "23 November 2024",
  "numberOfSeats": 2,
  "depositAmount": 2500,
  "paymentReference": "groundflex_123456",
  "paymentMethod": "Paystack"
}
```

### POST /api/verify-payment
Verifies payment with gateway
```json
{
  "reference": "groundflex_123456",
  "method": "Paystack"
}
```

### POST /api/send-reminder
Sends 24-hour event reminder
```json
{
  "email": "john@example.com",
  "eventName": "THIBA FALLS",
  "eventDate": "23 November 2024"
}
```

### GET /api/health
Health check endpoint

## 🐛 Troubleshooting

### Carousel not sliding
- Check JavaScript console for errors
- Verify `main-carousel` element exists
- Check CSS display properties

### Booking modal not opening
- Verify modal element IDs
- Check if JavaScript is loaded
- Look for console errors

### Email not sending
- Verify Gmail app password
- Check `.env` configuration
- Enable "Less secure apps" if needed
- Check spam folder

### Payment failing
- Verify API keys are correct
- Check if keys are for test environment
- Ensure internet connection
- Review payment gateway logs

## 📚 Documentation

- `BACKEND_SETUP.md` - Detailed backend setup
- `index.html` - Code comments throughout
- `server.js` - API endpoint documentation

## 🤝 Support

For issues:
1. Check troubleshooting section
2. Review console logs
3. Check `.env` configuration
4. Verify API keys
5. Contact support@groundflexadventures.com

## 📄 License

MIT License - Feel free to use and modify

## 🙏 Credits

- **Design**: Modern glassmorphism with Kenyan cultural elements
- **Images**: Curated matatu culture photography
- **Fonts**: Orbitron + Poppins from Google Fonts
- **Payment**: Paystack, PayPal, M-Pesa integration
- **Email**: Nodemailer with Gmail

## 🎉 Enjoy!

Experience the vibrant energy of Kenyan matatu culture with Groundflex Adventures!

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Status**: Production Ready ✅# grounflexxadventures
# groundflexadventures
# groundflexadventures
