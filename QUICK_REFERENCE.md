# ⚡ Quick Reference Card

## Start Server
```bash
npm install          # First time only
npm run dev          # Development mode (auto-reload)
npm start            # Production mode
```

## Verify Setup
```bash
# Check server running
curl http://localhost:3000/api/health

# View logs
npm run dev  # Shows in console
```

---

## Files Overview

| File | What It Does |
|------|-------------|
| `index.html` | Complete frontend + carousel JS |
| `server.js` | Backend API + email service |
| `package.json` | Node.js dependencies |
| `.env` | Configuration (EMAIL, PAYMENT KEYS) |
| `.env.example` | Config template |
| `README.md` | Full documentation |
| `BACKEND_SETUP.md` | Detailed setup guide |
| `QUICKSTART.md` | 5-minute start guide |
| `TESTING_GUIDE.md` | Complete testing procedures |

---

## Configuration (`.env`)

### Minimal Setup
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
PORT=3000
```

### Full Setup
```env
# Email
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_REPLY_TO=support@example.com

# Payment (get from each service)
PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
PAYPAL_CLIENT_ID=xxxxx

# Server
PORT=3000
NODE_ENV=development
```

---

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/send-confirmation` | POST | Send booking email |
| `/api/verify-payment` | POST | Verify with gateway |
| `/api/send-reminder` | POST | Send event reminder |
| `/api/health` | GET | Check server status |

### Example API Call
```bash
curl -X POST http://localhost:3000/api/send-confirmation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "eventName": "THIBA FALLS",
    "numberOfSeats": 2,
    "depositAmount": 2500,
    "paymentReference": "ref_123",
    "paymentMethod": "Paystack"
  }'
```

---

## Events Data

| Event | Price | Duration | Location |
|-------|-------|----------|----------|
| THIBA FALLS | KES 2,500 | 8 hours | Kirinyaga |
| CHROME JUNGLE NIGHT | KES 3,500 | 4 hours | Nairobi |
| GOLDEN HOUR SAFARI | KES 4,000 | 3 hours | Coastal |

Deposit = Price × 0.5 × Number of Seats

---

## JavaScript Key Functions

### Main Carousel
```javascript
nextMainSlide()         // Go to next event
prevMainSlide()         // Go to previous event
goToMainSlide(index)    // Jump to specific event
startMainAutoSlide()    // Start auto-sliding
stopMainAutoSlide()     // Stop auto-sliding
```

### Booking
```javascript
openBookingModal(eventId)    // Open booking for event
closeBookingModal()          // Close booking modal
```

### Payment
```javascript
openPaymentModal()      // Open payment screen
closePaymentModal()     // Close payment modal
```

---

## HTML Key IDs

| Element | ID |
|---------|-----|
| Main Carousel | `mainCarousel` |
| Booking Modal | `bookingModal` |
| Payment Modal | `paymentModal` |
| Booking Form | `bookingForm` |
| Previous Button | `mainPrev` |
| Next Button | `mainNext` |

---

## Payment Methods

### Paystack
- API Key: `pk_test_xxxxx` (test) or `pk_live_xxxxx` (live)
- Test Card: `4084084084084081` | Exp: `12/25` | CVV: `123`
- Region: Primary for Kenya

### PayPal
- Client ID: Get from developer.paypal.com
- Test Mode: Use Sandbox account
- Region: Global payments

### M-Pesa
- Phone: `0718192656` (test)
- Type: Mobile money (manual verification)
- Region: Kenya only

---

## Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| Module not found | Run `npm install` |
| Port 3000 in use | Change PORT in .env or kill process |
| Email not sending | Check .env credentials, enable 2FA in Gmail |
| Payment not working | Verify API keys, check if test mode |
| Carousel not sliding | Check browser console, refresh page |
| Modal not opening | Verify modal ID in HTML and JS |

---

## Quick Test Checklist

- [ ] Server starts: `npm run dev`
- [ ] Carousel slides automatically
- [ ] Click "Book Your Seat" opens modal
- [ ] Form validation works
- [ ] Payment modal shows 50% deposit
- [ ] Mobile responsive (resize to 520px)
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] (Optional) Test email by calling API

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Tab | Navigate form fields |
| Enter | Submit form / Click button |
| Escape | Close modal |
| Arrow Keys | Carousel (if implemented) |

---

## Mobile Breakpoints

| Device | Width | Behavior |
|--------|-------|----------|
| Desktop | 1920px+ | Full carousel with 2-3 columns |
| Tablet | 900px | Adjusted carousel |
| Mobile | 520px | Stacked layout |

---

## Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Page Load | <3s | TBD |
| Carousel FPS | 60 | TBD |
| Email Send | 2-5s | TBD |
| PDF Gen | 1-2s | TBD |

---

## Important Files to Edit

**Event Details** (Update events):
- File: `index.html`
- Lines: 1583-1620

**Email Template** (Customize emails):
- File: `server.js`
- Lines: 75-150

**Styling** (Change colors/fonts):
- File: `index.html`
- Lines: 13-19 (CSS variables)

**Payment Keys** (Production):
- File: `.env`
- Lines: Various (get from services)

---

## Deployment Checklist

- [ ] Update .env with production credentials
- [ ] Test all payment methods
- [ ] Verify email service working
- [ ] Test on production URL
- [ ] Enable HTTPS
- [ ] Set up monitoring/alerts
- [ ] Configure database (if needed)
- [ ] Set up SSL certificate
- [ ] Enable CORS for production domain
- [ ] Review security settings

---

## Support Resources

| Need | Resource |
|------|----------|
| Full Setup | BACKEND_SETUP.md |
| Quick Start | QUICKSTART.md |
| Testing | TESTING_GUIDE.md |
| Documentation | README.md |
| Full Info | IMPLEMENTATION_SUMMARY.md |

---

## Git Commands

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit: Groundflex Adventures"

# Before deployment
git status
git add .
git commit -m "Pre-deployment configuration"
git push origin main

# Heroku deployment
heroku login
git push heroku main
```

---

## Environment Variables Quick Setup

### Gmail App Password
1. Go myaccount.google.com → Security
2. Enable 2-Step Verification
3. App passwords → Mail → Windows
4. Copy 16-char password to .env

### Paystack API Key
1. Go paystack.com → Dashboard
2. Settings → API Keys & Webhooks
3. Copy Test Public Key to .env
4. Line in code: `key: 'pk_test_xxxxx'`

### PayPal Client ID
1. Go developer.paypal.com
2. Create Sandbox app
3. Copy Client ID to .env
4. Update SDK script in index.html line 8

---

## Status Indicators

✅ = Feature Complete & Working  
🟡 = Partial/Needs Configuration  
❌ = Not Implemented  

---

## Next Steps

1. **Now**: Run `npm run dev`
2. **First**: Configure `.env` with email
3. **Second**: Get Paystack/PayPal keys (optional)
4. **Third**: Test booking flow
5. **Final**: Deploy to production

---

## Quick Decision Tree

```
Want to view frontend only?
→ Open index.html in browser

Want full system with email?
→ Install Node.js
→ Run npm install
→ Configure .env
→ Run npm run dev
→ Open http://localhost:3000

Want to go production?
→ Get API keys from services
→ Update .env with production keys
→ Deploy to Heroku/AWS
→ Update frontend with live keys
→ Test payment gateways
→ Enable HTTPS
```

---

## One-Line Starters

```bash
# View only
open index.html

# Start dev server
npm run dev

# Test API
curl http://localhost:3000/api/health

# View logs
npm run dev

# Production
npm start
```

---

## Useful Links

- **Paystack**: https://paystack.com
- **PayPal**: https://developer.paypal.com
- **Gmail App**: https://myaccount.google.com
- **Heroku**: https://heroku.com
- **Node.js**: https://nodejs.org

---

**Last Updated**: November 2024  
**Version**: 1.0.0  
**Status**: ✅ Production Ready