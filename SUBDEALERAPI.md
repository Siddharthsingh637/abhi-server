# Sub Dealer Form Integration - Quick Reference

## 📋 Database Schema
The `SubDealerLead` model stores all sub-dealer inquiries with automatic timestamps.

## 🔗 API Endpoint
**POST** `/dealer`

### Request Body
```json
{
  "name": "String (required)",
  "phone": "String (required)",
  "email": "String (required)",
  "company": "String (optional)",
  "city": "String (optional)",
  "message": "String (optional)"
}
```

### Success Response (201)
```json
{
  "success": true,
  "message": "Sub dealer application submitted successfully",
  "lead": {
    "id": 1,
    "name": "John Doe",
    "phone": "9876543210",
    "email": "john@example.com",
    "company": "ABC Motors",
    "city": "Delhi",
    "message": "Interested in partnership",
    "isProcessed": false,
    "createdAt": "2026-01-22T10:30:00Z"
  }
}
```

## 📧 Automatic Emails Sent
1. **To Admin** (support@abhilashit.in)
   - Subject: 🤝 New Sub Dealer Lead Received
   - Contains full application details

2. **To Applicant** (if email provided)
   - Subject: ✅ Sub Dealer Application Received
   - Confirmation message
   - Expected response timeframe
   - Application summary

## ✨ Key Features
- ✅ Data saved to database immediately
- ✅ Instant API response (non-blocking)
- ✅ Background email delivery via Resend API
- ✅ Error handling and logging
- ✅ Professional HTML email templates
- ✅ Support team tracking with `isProcessed` flag

## 🔧 Configuration Needed
Add to `.env`:
```
RESEND_API_KEY=your_resend_api_key_here
```

## 🧪 Example cURL Request
```bash
curl -X POST http://localhost:3000/dealer \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rajesh Kumar",
    "phone": "9876543210",
    "email": "rajesh@example.com",
    "company": "RK Motors",
    "city": "Mumbai",
    "message": "Very interested in becoming a sub-dealer in Mumbai region"
  }'
```

## 📊 Response Times
- API Response: < 100ms (database write + immediate return)
- Email Send: Background (no blocking)
- User sees success immediately

## 🔄 Updated Files
- [src/controllers/dealerController.js](../src/controllers/dealerController.js)
- [src/utils/serviceMailer.js](../src/utils/serviceMailer.js)
- [prisma/schema.prisma](../prisma/schema.prisma) - already has model

## 📞 Support
For email delivery issues, check Resend API dashboard or logs.
