# 🧪 Testing Guide - Groundflex Adventures

Complete testing procedures for all features.

## Test Environment Setup

### Prerequisites
- Node.js installed
- .env configured with test credentials
- Server running (`npm run dev`)
- Browser (Chrome/Firefox/Safari)

### Test Data
```
Email: test@example.com
Phone: +254718192656
Name: John Doe
Seats: 2
```

---

## 1. Frontend Testing

### 1.1 Carousel Auto-Sliding
**Steps:**
1. Open http://localhost:3000 or index.html directly
2. Wait 6 seconds
3. Verify first event (THIBA FALLS) is visible
4. Wait 6 seconds
5. Verify carousel slides to second event (CHROME JUNGLE NIGHT)
6. Wait 6 seconds
7. Verify third event (GOLDEN HOUR SAFARI) appears
8. Wait 6 seconds
9. Verify carousel loops back to first event

**Expected**: Events rotate smoothly every 6 seconds

**Result**: ✅ Pass / ❌ Fail

---

### 1.2 Manual Carousel Navigation
**Steps:**
1. Click "❮" (Previous) button
2. Verify carousel slides to previous event
3. Click "❯" (Next) button multiple times
4. Verify carousel advances to next events

**Expected**: Carousel responds immediately to clicks

**Result**: ✅ Pass / ❌ Fail

---

### 1.3 Indicator Dots Navigation
**Steps:**
1. Click second indicator dot
2. Verify carousel jumps to second event
3. Click third indicator dot
4. Verify carousel shows third event
5. Click first indicator dot
6. Verify carousel shows first event

**Expected**: Clicking dots immediately jumps to that event

**Result**: ✅ Pass / ❌ Fail

---

### 1.4 Pause on Hover
**Steps:**
1. Hover mouse over carousel
2. Wait 10 seconds
3. Verify carousel doesn't slide
4. Move mouse away
5. Wait 6 seconds
6. Verify carousel resumes sliding

**Expected**: Carousel pauses on hover, resumes when mouse leaves

**Result**: ✅ Pass / ❌ Fail

---

### 1.5 Per-Event Image Carousels
**Steps:**
1. Navigate to first event slide
2. Look for 3 images on the right
3. Click "→" button on images
4. Verify second image appears
5. Click "→" again
6. Verify third image appears
7. Click "←" button
8. Verify images go backward

**Expected**: Each event has working image carousel

**Result**: ✅ Pass / ❌ Fail

---

### 1.6 Event Information Display
**Steps:**
1. Examine first event slide
2. Verify contains:
   - Event title: "THIBA FALLS"
   - Price: "KES 2,500"
   - Date: "23 November 2024"
   - Duration: "Full Day (8 hours)"
   - Group Size: "Up to 15 people"
   - Location: "Kirinyaga, Kenya"
   - Inclusions list with 5 items

**Expected**: All event info accurately displayed

**Result**: ✅ Pass / ❌ Fail

---

## 2. Booking Modal Testing

### 2.1 Open Booking Modal
**Steps:**
1. View first event
2. Click "Book Your Seat" button
3. Wait for modal to open

**Expected**: Booking modal opens smoothly, showing event details

**Result**: ✅ Pass / ❌ Fail

---

### 2.2 Modal Shows Correct Event
**Steps:**
1. Click "Book Your Seat" on Event 1 (THIBA FALLS)
2. Check modal title says "Book Your Event"
3. Check event name shown is "THIBA FALLS"
4. Check price is "KES 2,500"
5. Verify 3 event images displayed
6. Close modal and repeat for Event 2 and 3

**Expected**: Modal shows correct event data for each event

**Result**: ✅ Pass / ❌ Fail

---

### 2.3 Form Input Validation
**Steps:**
1. Open booking modal
2. Leave all fields empty
3. Click "Proceed to Payment"
4. Verify form shows validation error

**Expected**: Form requires all fields

**Result**: ✅ Pass / ❌ Fail

---

### 2.4 Form Submission
**Steps:**
1. Open booking modal for Event 1
2. Enter:
   - Name: "John Doe"
   - Email: "test@example.com"
   - Phone: "+254718192656"
   - Seats: "2"
3. Leave special requests blank
4. Click "Proceed to Payment"

**Expected**: Form closes and payment modal opens

**Result**: ✅ Pass / ❌ Fail

---

### 2.5 Close Modal (X Button)
**Steps:**
1. Open booking modal
2. Click X button (top right)

**Expected**: Modal closes smoothly

**Result**: ✅ Pass / ❌ Fail

---

### 2.6 Close Modal (Click Outside)
**Steps:**
1. Open booking modal
2. Click on dark area outside modal
3. Release

**Expected**: Modal closes

**Result**: ✅ Pass / ❌ Fail

---

### 2.7 Keyboard Navigation (ESC)
**Steps:**
1. Open booking modal
2. Press ESC key

**Expected**: Modal closes

**Result**: ✅ Pass / ❌ Fail

---

## 3. Payment Modal Testing

### 3.1 Open Payment Modal
**Steps:**
1. Open booking modal
2. Fill form with test data
3. Click "Proceed to Payment"

**Expected**: Payment modal opens with summary

**Result**: ✅ Pass / ❌ Fail

---

### 3.2 Payment Summary - Correct Calculations
**Steps:**
1. Open payment modal after booking for Event 1
2. Verify displays:
   - Event: THIBA FALLS
   - Price per seat: KES 2,500
   - Number of seats: 2
   - Deposit (50%): KES 2,500 (highlighted orange)

**Expected**: 
- Deposit = Event Price × 0.5 × Number of Seats
- KES 2,500 × 0.5 × 2 = KES 2,500 ✓

**Result**: ✅ Pass / ❌ Fail

---

### 3.3 Payment Summary - Different Events
**Steps:**
1. Test Event 2 booking (KES 3,500)
   - Verify deposit shows KES 1,750
2. Test Event 3 booking (KES 4,000)
   - Verify deposit shows KES 2,000

**Expected**: Correct 50% calculation for each event

**Result**: ✅ Pass / ❌ Fail

---

### 3.4 Payment Summary - Multiple Seats
**Steps:**
1. Book Event 1 with 3 seats
2. Verify: KES 2,500 × 0.5 × 3 = KES 3,750

**Expected**: Deposit multiplies by seat count

**Result**: ✅ Pass / ❌ Fail

---

### 3.5 Payment Options Visible
**Steps:**
1. Open payment modal
2. Verify shows three payment buttons:
   - Paystack
   - PayPal
   - M-Pesa

**Expected**: All payment methods available

**Result**: ✅ Pass / ❌ Fail

---

## 4. Payment Processing Testing

### 4.1 Paystack Test Payment (Requires Test Key)
**Steps:**
1. Configure .env with Paystack test key
2. Open payment modal
3. Click "Paystack" button
4. Paystack popup should open
5. Enter test card:
   - Card: 4084084084084081
   - Expiry: 12/25
   - CVV: 123
6. Enter amount and complete

**Expected**: Payment processes, success message shows

**Result**: ✅ Pass / ❌ Fail

---

### 4.2 PayPal Test Payment (Requires Sandbox)
**Steps:**
1. Configure PayPal SDK with sandbox client ID
2. Open payment modal
3. Click "PayPal" button
4. PayPal window opens
5. Use sandbox account credentials
6. Approve payment

**Expected**: Payment processes successfully

**Result**: ✅ Pass / ❌ Fail

---

### 4.3 M-Pesa Payment Display
**Steps:**
1. Open payment modal
2. Click "M-Pesa" button
3. Verify displays:
   - Payment instructions
   - Phone number: 0718192656
   - Reference number

**Expected**: M-Pesa instructions displayed

**Result**: ✅ Pass / ❌ Fail

---

## 5. Backend Email Testing

### 5.1 Email Configuration Test
**Steps:**
1. Start server: `npm run dev`
2. Check console for message: "✓ Email service is ready"

**Expected**: No email configuration errors

**Result**: ✅ Pass / ❌ Fail

---

### 5.2 Manual Email Test (Using curl)
**Steps:**
```bash
curl -X POST http://localhost:3000/api/send-confirmation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "your-email@gmail.com",
    "eventName": "THIBA FALLS",
    "eventDate": "23 November 2024",
    "eventLocation": "Kirinyaga, Kenya",
    "numberOfSeats": 2,
    "pricePerSeat": 2500,
    "totalPrice": 5000,
    "depositAmount": 2500,
    "paymentReference": "test_ref_123",
    "paymentMethod": "Test",
    "timestamp": "2024-11-20T10:00:00Z"
  }'
```

**Expected**: Response shows success, email arrives in inbox

**Result**: ✅ Pass / ❌ Fail

---

### 5.3 Email Content Verification
**Steps:**
1. After test payment completes
2. Check email inbox
3. Verify email contains:
   - Professional HTML formatting
   - Event details
   - Payment summary
   - Payment reference
   - Next steps instructions

**Expected**: Professional, complete confirmation email

**Result**: ✅ Pass / ❌ Fail

---

## 6. PDF Ticket Testing

### 6.1 PDF Generation
**Steps:**
1. Complete test payment
2. Verify PDF auto-downloads
3. File name format: Groundflex_EVENT_NAME_Ticket.pdf

**Expected**: PDF file downloads successfully

**Result**: ✅ Pass / ❌ Fail

---

### 6.2 PDF Content
**Steps:**
1. Open downloaded PDF
2. Verify contains:
   - Groundflex header with logo
   - Customer name
   - Customer email
   - Event name
   - Event date
   - Payment reference
   - Price information

**Expected**: Professional PDF with all required info

**Result**: ✅ Pass / ❌ Fail

---

## 7. Responsive Design Testing

### 7.1 Desktop (1920px+)
**Steps:**
1. Open on desktop browser at 1920x1080
2. Verify:
   - Carousel fills width properly
   - Event images display side-by-side
   - All text readable
   - No overflow

**Expected**: Desktop layout optimal

**Result**: ✅ Pass / ❌ Fail

---

### 7.2 Tablet (900px)
**Steps:**
1. Resize browser to 900px width
2. Verify:
   - Carousel adjusts width
   - Modal still readable
   - No horizontal scroll

**Expected**: Tablet layout works correctly

**Result**: ✅ Pass / ❌ Fail

---

### 7.3 Mobile (520px)
**Steps:**
1. Resize browser to 520px width
2. Verify:
   - Carousel stacks properly
   - Buttons remain clickable
   - Modal adjusts to screen
   - Text readable

**Expected**: Mobile layout optimized

**Result**: ✅ Pass / ❌ Fail

---

### 7.4 Mobile Touch Testing
**Steps:**
1. Test on actual phone (iOS/Android)
2. Verify:
   - Carousel swipes work (if implemented)
   - Buttons are touch-friendly (44px minimum)
   - Modal closes properly

**Expected**: Optimal mobile touch experience

**Result**: ✅ Pass / ❌ Fail

---

## 8. Accessibility Testing

### 8.1 Keyboard Navigation
**Steps:**
1. Tab through carousel controls
2. Tab to "Book Your Seat" buttons
3. Press Enter to open modal
4. Tab through form fields
5. Press Escape to close modal

**Expected**: Full keyboard navigation works

**Result**: ✅ Pass / ❌ Fail

---

### 8.2 Screen Reader Testing (NVDA/JAWS)
**Steps:**
1. Enable screen reader
2. Navigate carousel
3. Verify announcements for:
   - Event names
   - Button purposes
   - Form labels
   - Modal titles

**Expected**: All content accessible to screen reader

**Result**: ✅ Pass / ❌ Fail

---

### 8.3 High Contrast Mode
**Steps:**
1. Enable high contrast in OS settings
2. Verify all text still readable
3. Check button colors still clear

**Expected**: All content visible in high contrast

**Result**: ✅ Pass / ❌ Fail

---

## 9. Error Handling Testing

### 9.1 Network Error
**Steps:**
1. Disconnect internet
2. Try to make payment
3. Verify error message shows

**Expected**: Graceful error handling

**Result**: ✅ Pass / ❌ Fail

---

### 9.2 Invalid Form Input
**Steps:**
1. Enter invalid email format
2. Try to submit
3. Verify validation error

**Expected**: Form validation prevents submission

**Result**: ✅ Pass / ❌ Fail

---

### 9.3 Missing .env Variables
**Steps:**
1. Remove critical .env variable
2. Start server
3. Verify error message in console

**Expected**: Clear error about missing configuration

**Result**: ✅ Pass / ❌ Fail

---

## 10. Performance Testing

### 10.1 Page Load Time
**Steps:**
1. Open DevTools (F12)
2. Go to Performance tab
3. Record page load
4. Check timing

**Expected**: Page loads in <3 seconds

**Result**: ✅ Pass / ❌ Fail

---

### 10.2 Carousel Smoothness
**Steps:**
1. Open Performance tab
2. Record 10 seconds of carousel sliding
3. Check frame rate

**Expected**: 60 FPS smooth scrolling

**Result**: ✅ Pass / ❌ Fail

---

### 10.3 Email Send Time
**Steps:**
1. Make payment
2. Time from payment completion to email arrival
3. Record time

**Expected**: Email arrives within 2-5 seconds

**Result**: ✅ Pass / ❌ Fail

---

## Test Results Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Carousel auto-slide | ✅/❌ | |
| Manual navigation | ✅/❌ | |
| Booking modal | ✅/❌ | |
| Payment modal | ✅/❌ | |
| Paystack payment | ✅/❌ | |
| PayPal payment | ✅/❌ | |
| M-Pesa display | ✅/❌ | |
| Email sending | ✅/❌ | |
| PDF generation | ✅/❌ | |
| Mobile responsive | ✅/❌ | |
| Accessibility | ✅/❌ | |
| Error handling | ✅/❌ | |
| Performance | ✅/❌ | |

---

## Sign-Off

**Tested By**: ________________  
**Date**: ________________  
**Environment**: Development / Staging / Production  
**Browser**: ________________  
**OS**: ________________  

**All Tests Passed**: ✅ Yes / ❌ No  

**Issues Found**:
```
1.
2.
3.
```

**Notes**:
```


```

---

## Quick Retest Checklist

After fixes, verify:
- [ ] Carousel slides
- [ ] Booking works
- [ ] Payment modal shows correct amount
- [ ] Email arrives
- [ ] PDF downloads
- [ ] Mobile responsive

---

For help, refer to:
- QUICKSTART.md - Quick setup
- README.md - Full documentation
- BACKEND_SETUP.md - Backend configuration