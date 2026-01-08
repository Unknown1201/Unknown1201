# 📧 Email Integration Setup Guide

This portfolio uses **EmailJS** for contact form and order notifications without requiring a backend server.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (300 emails/month)
3. Verify your email address

### Step 2: Add Email Service
1. Go to **Email Services** in dashboard
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal)
   - **Outlook**
   - **Yahoo**
   - Or use any SMTP service
4. Connect your email account
5. Copy the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Templates

#### Template 1: Contact Form
1. Go to **Email Templates** → **Create New Template**
2. Set Template Name: `Contact Form Submission`
3. Copy this template:

```html
Subject: New Contact Form Message from {{from_name}}

Hello,

You have received a new message from your portfolio contact form:

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent from Portfolio Contact Form
```

4. Copy the **Template ID** (e.g., `template_contact123`)

#### Template 2: Order Form
1. Create another template: `New Order Submission`
2. Use this template:

```html
Subject: New Order from {{customer_name}}

Hello,

You have received a new order:

Customer Details:
- Name: {{customer_name}}
- Email: {{customer_email}}
- Phone: {{customer_phone}}

Order Items:
{{order_items}}

Total: {{total_price}}

Additional Requirements:
{{requirements}}

---
Sent from Portfolio Order Form
```

3. Copy the **Template ID** (e.g., `template_order456`)

### Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. Find **Public Key** section
3. Copy your public key (e.g., `YOUR_PUBLIC_KEY_HERE`)

### Step 5: Update Configuration

Open `src/lib/emailService.js` and replace placeholders:

```javascript
// Line 6: Replace with your public key
window.emailjs.init("YOUR_PUBLIC_KEY_HERE");

// Line 15: Replace with your service ID
"SERVICE_ID"

// Line 16: Replace with contact template ID
"CONTACT_TEMPLATE_ID"

// Line 42: Replace with your service ID
"SERVICE_ID"

// Line 43: Replace with order template ID
"ORDER_TEMPLATE_ID"

// Lines 22 & 52: Replace with your email
to_email: "your-email@example.com"
```

### Example Configuration:
```javascript
// After replacement:
window.emailjs.init("abc123XYZ456");

const response = await window.emailjs.send(
  "service_gmail123",
  "template_contact789",
  {
    from_name: formData.name,
    // ...
    to_email: "yourname@gmail.com",
  }
);
```

## 🧪 Testing

1. Run your portfolio: `npm run dev`
2. Fill out the contact form
3. Submit the form
4. Check your email inbox (connected to EmailJS)
5. You should receive the form submission!

## 📝 Social Links Configuration

Update your actual social media links in:

### Footer.jsx (Line 28-31):
```jsx
<a href="https://twitter.com/yourhandle" target="_blank">Twitter</a>
<a href="https://github.com/yourhandle" target="_blank">GitHub</a>
<a href="https://linkedin.com/in/yourhandle" target="_blank">LinkedIn</a>
```

### Contact.jsx (Line 114-116):
```jsx
<a href="https://twitter.com/yourhandle" target="_blank">Twitter / X →</a>
<a href="https://github.com/yourhandle" target="_blank">GitHub →</a>
<a href="https://linkedin.com/in/yourhandle" target="_blank">LinkedIn →</a>
```

### Hero.jsx (if you have social icons):
Update any social links in the hero section as well.

## 🔧 Alternative: Custom Backend

If you prefer using your own backend instead of EmailJS:

1. Uncomment the fetch call in `emailService.js`:
```javascript
// In simulateEmailSend function:
fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```

2. Create backend endpoint (Express.js example):
```javascript
app.post('/api/send-email', async (req, res) => {
  // Use nodemailer or similar
  const transporter = nodemailer.createTransport({ /* config */ });
  await transporter.sendMail({ /* email data */ });
  res.json({ success: true });
});
```

## 🎨 Customization

### Change Button Colors
In `Contact.jsx`, update button gradient:
```javascript
background: 'linear-gradient(135deg, #eab308 0%, #d97706 100%)',
```

### Change Success/Error Messages
In `emailService.js`, modify return messages:
```javascript
return { 
  success: true, 
  message: "Your custom success message!" 
};
```

## 📊 EmailJS Limitations (Free Plan)

- **300 emails/month**
- **Upgrade** for more: [EmailJS Pricing](https://www.emailjs.com/pricing)
- Alternative free services: 
  - Formspree (50 submissions/month)
  - Web3Forms (unlimited)
  - Getform (50 submissions/month)

## ❓ Troubleshooting

### Emails not sending?
1. Check browser console for errors
2. Verify all IDs are correct (Service ID, Template IDs, Public Key)
3. Make sure EmailJS script is loaded (check Network tab)
4. Check EmailJS dashboard for usage/errors

### Emails going to spam?
1. Use a custom domain email (not Gmail)
2. Set up SPF/DKIM records
3. Use professional email content

### Need Help?
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/support/)

---

**Pro Tip:** Always test your forms before deploying! Use a test email first, then update to your real email once everything works.
