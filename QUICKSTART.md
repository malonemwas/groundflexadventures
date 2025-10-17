# 🚀 Quick Start Guide

Get Groundflex Adventures running in 5 minutes!

## Option 1: View Frontend Only (No Backend)

**Time: 1 minute**

1. Open `c:\groundflex\index.html` in your browser
2. Explore the carousel with 3 events
3. Click "Book Your Seat" to see booking modal
4. Fill form and click "Proceed to Payment" to see payment modal

**Limitations**: Emails won't send, payments won't process without backend

---

## Option 2: Full Setup (Frontend + Backend)

**Time: 5-10 minutes**

### Step 1: Install Backend
```bash
cd c:\groundflex
npm install
```

### Step 2: Get Email Credentials

**Gmail Setup:**
1. Go to https://myaccount.google.com
2. Click "Security" in left menu
3. Enable "2-Step Verification" if not enabled
4. Scroll down and click "App passwords"
5. Select "Mail" and "Windows Computer"
6. Copy the generated 16-character password

**Other Email Services:**
- Use your email provider's SMTP settings
- Uncomment relevant settings in `.env`

### Step 3: Create .env File

Create `.env` in `c:\groundflex` folder:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password

PORT=3000
NODE_ENV=development
```

### Step 4: Start Server
```bash
npm run dev
```

You should see:
```
╔════════════════════════════════════════╗
║   Groundflex Adventures Server         ║
║   🚐 Running on port 3000              ║
╚════════════════════════════════════════╝
```

### Step 5: Open Browser
Go to `http://localhost:3000`

✅ **Done!** Your system is now fully functional with:
- ✅ Carousel sliding
- ✅ Booking modal
- ✅ Email confirmations
- ✅ PDF ticket generation

---

## Testing Payments (Optional)

### Paystack Test Mode

1. Don't have Paystack account?
   - Sign up at https://paystack.com (test mode available)
   - No credit card needed for testing

2. Get test key:
   - Dashboard → Settings → API Keys & Webhooks
   - Copy "Test Public Key"

3. Update `index.html` (search for `pk_test_your_paystack_public_key`):
   ```javascript
   key: 'pk_test_your_actual_key_here'
   ```

4. Use test card:
   - Card: `4084084084084081`
   - Expiry: `12/25`
   - CVV: `123`

### PayPal Sandbox

1. Sign up at https://developer.paypal.com
2. Create sandbox app
3. Update `index.html` SDK script:
   ```html
   <script src="https://www.paypal.com/sdk/js?client-id=YOUR_SANDBOX_CLIENT_ID"></script>
   ```

### M-Pesa Test

- Display test number: `0718192656`
- Manual verification only (for now)

---

## Common Issues & Solutions

### Issue: "Cannot find module 'express'"
**Solution:**
```bash
npm install
```

### Issue: Email not working
**Solution:**
1. Check `.env` credentials are correct
2. Verify Gmail app password (not your regular password)
3. Check if using 2-factor authentication
4. Look in spam folder

### Issue: Carousel not sliding
**Solution:**
1. Refresh browser
2. Check browser console for errors (F12)
3. Verify `mainCarousel` element exists in HTML

### Issue: Port 3000 already in use
**Solution:**
Either:
- Kill process using port 3000
- Change PORT in `.env` to 3001

---

## File Checklist

Verify these files exist:
- ✅ `index.html` - Main landing page
- ✅ `server.js` - Backend API
- ✅ `package.json` - Dependencies list
- ✅ `.env.example` - Template
- ✅ `.env` - Your configuration
- ✅ `README.md` - Full documentation
- ✅ `BACKEND_SETUP.md` - Detailed setup

---

## Next Steps

### For Development:
- Review code comments in `index.html`
- Check `server.js` for API structure
- Test all carousel features
- Try booking different events

### For Production:
See `BACKEND_SETUP.md` sections:
- Database setup (MongoDB/PostgreSQL)
- Advanced payment integration
- Email templates customization
- Deployment to Heroku/AWS/etc

### For Customization:
- Edit event details in JavaScript (lines 1583-1620)
- Update email template (lines in `server.js`)
- Change colors in CSS (lines 13-19)
- Add more events to carousel

---

## Quick Test Checklist

- [ ] Carousel slides automatically
- [ ] Manual carousel buttons work
- [ ] Indicator dots are clickable
- [ ] Click "Book Your Seat" opens modal
- [ ] Modal shows correct event details
- [ ] Form submits without errors
- [ ] Payment modal shows correct 50% deposit
- [ ] Select payment method (Paystack/PayPal/M-Pesa)
- [ ] (Optional) Email arrives in inbox
- [ ] PDF downloads successfully

---

## Useful Commands

```bash
# Start development server (with auto-reload)
npm run dev

# Start production server
npm start

# Check if backend is running
curl http://localhost:3000/api/health

# View logs
npm run dev  # Output appears directly
```

---

## Get Help

1. **Carousel issues**: Check `index.html` lines 1622-1688
2. **Email issues**: Check `server.js` email configuration
3. **Payment issues**: Check API key configuration in `.env`
4. **Booking flow**: Check JavaScript lines 1723-1857

---

## Success! 🎉

You now have a fully functional booking platform with:
- 🎠 Auto-sliding event carousel
- 🎫 Professional booking modal
- 💳 Multiple payment options
- 📧 Automated email confirmations
- 📄 PDF ticket generation
- ♿ Accessible & responsive design

**Start with Option 1** to see frontend, then upgrade to **Option 2** for full functionality!

---

For detailed information, see:
- `README.md` - Full project documentation
- `BACKEND_SETUP.md` - Detailed backend setup
- Code comments in `index.html` and `server.js`