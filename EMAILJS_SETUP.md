# EmailJS Setup Guide

## 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month)
3. Verify your email address

## 2. Add Email Service
1. Go to "Email Services" in your dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions for Gmail:
   - Allow EmailJS to access your Gmail
   - Grant necessary permissions

## 3. Create Email Template
1. Go to "Email Templates" 
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Contact Form Message from {{from_name}}

**Body:**
```
You have received a new message from your portfolio contact form:

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
Reply-to: {{reply_to}}
```

4. Save the template and note the Template ID

## 4. Get Your Configuration IDs
After setup, you'll have:
- **Service ID**: Found in Email Services (e.g., `service_abc123`)
- **Template ID**: Found in Email Templates (e.g., `template_xyz789`)  
- **Public Key**: Found in Account > API Keys (e.g., `user_qwe456`)

## 5. Update Configuration
Replace the placeholder values in `src/js/contactForm.js`:

```javascript
this.emailjsConfig = {
  serviceId: 'service_abc123',     // Your actual service ID
  templateId: 'template_xyz789',   // Your actual template ID
  publicKey: 'user_qwe456'         // Your actual public key
};
```

## 6. Test the Form
1. Run `npm run dev`
2. Fill out the contact form
3. Check your Gmail for the test message

## Security Notes
- The public key is safe to expose in client-side code
- EmailJS handles rate limiting and spam protection
- Free plan includes 100 emails/month
- All emails will come FROM your Gmail TO your Gmail

## Troubleshooting
- Check browser console for errors
- Verify all IDs are correct
- Ensure Gmail service is properly connected
- Check EmailJS dashboard for delivery status