# 📊 Admin Dashboard Guide

## 🔐 Accessing the Dashboard

**URL**: https://modelproof.ai/api/dashboard

When you visit the dashboard, you'll be prompted to enter your admin passcode (the value of `ADMIN_PASSCODE` environment variable in Vercel).

---

## ➕ Creating a New Organization

The dashboard has a form at the top to create new organizations (customers).

### Required Fields:

| Field | Description | Example |
|-------|-------------|---------|
| **Organization Name** | The company or organization name | `Acme Corporation` |
| **Contact Email** | Main contact email for this organization | `contact@acme.com` |

### What Happens:

1. Fill in the organization name and email
2. Click "Create Organization"
3. ✅ An API key is **automatically generated** (format: `bdr_xxxxxxxxxxxxx...`)
4. You'll see a success message with the full API key
5. **Copy and share this API key with your customer** - they'll need it to use the API

### Notes:

- ✨ API keys are **auto-generated** - you don't need to create them manually
- 📧 Email addresses must be **unique** - can't register the same email twice
- 🆓 New organizations start on the **FREE plan** (20 requests/day)
- 🔑 The API key is only shown once during creation - make sure to save it!

---

## 📋 Managing Organizations

Once organizations are created, you can:

### View Organization Details:
- **Name**: Company/organization name
- **Email**: Contact email
- **API Key**: Truncated view (first 20 characters)
- **Plan**: FREE or PAID badge
- **Requests**: Usage count (e.g., "15 / 20" for free tier)
- **Created**: Registration date

### Actions Available:

#### 1. Upgrade to Paid
- Click the **"Upgrade"** button
- Changes plan from FREE to PAID
- Grants **unlimited API requests**
- No rate limiting

#### 2. Downgrade to Free
- Click the **"Downgrade"** button
- Changes plan from PAID to FREE
- Rate limit returns to **20 requests/day**

#### 3. Revoke API Key
- Click the **"Revoke"** button
- ⚠️ **Permanently deletes** the organization
- Customer's API key stops working immediately
- Cannot be undone

---

## 📊 Dashboard Statistics

At the top of the dashboard, you'll see three key metrics:

1. **Total Organizations**: Number of registered customers
2. **Paid Customers**: Organizations on the paid plan
3. **Total Requests Today**: Combined API usage across all organizations

These stats update automatically when you create, upgrade, or revoke organizations.

---

## 🔄 Rate Limiting

### Free Plan:
- ✅ 20 requests per day
- ⏰ Resets daily at midnight UTC
- 🚫 Blocked after 20 requests with "Rate limit exceeded" error

### Paid Plan:
- ✅ Unlimited requests
- 💰 No daily limit
- ⚡ No rate limiting

---

## 📝 Example Workflow

### Onboarding a New Customer:

1. **Create Organization**:
   - Name: `Tech Startup Inc`
   - Email: `api@techstartup.com`
   - Click "Create Organization"

2. **Copy API Key**:
   - Alert shows: `bdr_a1b2c3d4e5f6...`
   - Copy the full key

3. **Share with Customer**:
   ```bash
   # Send them this example:
   curl -X POST https://modelproof.ai/api/public \
     -H "Authorization: Bearer bdr_a1b2c3d4e5f6..." \
     -H "Content-Type: application/json" \
     -d '{"text": "Sample text to scan"}'
   ```

4. **Monitor Usage**:
   - Check "Requests" column in dashboard
   - Watch for approaching 20/20 limit

5. **Upgrade When Ready**:
   - Customer needs unlimited access
   - Click "Upgrade" button
   - Confirm upgrade
   - ✅ Now unlimited requests

---

## 🚨 Troubleshooting

### Passcode Not Being Asked:
- Clear browser cache
- Try incognito/private browsing mode
- Check browser console for JavaScript errors

### "Organization already exists" Error:
- Email addresses must be unique
- Use a different email or revoke the existing organization first

### API Key Not Showing:
- API keys are only displayed once during creation
- If lost, you must revoke and create a new organization

### Dashboard Shows Empty:
- Check that `DATABASE_URL` is set in Vercel
- Verify database connection
- Check Vercel function logs for errors

---

## 🔒 Security Best Practices

1. **Never share your admin passcode** (`ADMIN_PASSCODE`)
2. **Only share API keys** (`bdr_xxx...`) with customers
3. **Store API keys securely** - customers should use environment variables
4. **Revoke compromised keys** immediately via the dashboard
5. **Monitor usage** regularly for suspicious activity

---

## 📚 Quick Reference

### Customer API Usage:

**Scan for Bias:**
```bash
curl -X POST https://modelproof.ai/api/public \
  -H "Authorization: Bearer API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{"text": "Your text here"}'
```

**Fix Biased Text:**
```bash
curl -X POST https://modelproof.ai/api/public/fix \
  -H "Authorization: Bearer API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{"text": "Your text here"}'
```

### Documentation for Customers:
- API Docs: https://modelproof.ai/api/docs
- Interactive Swagger UI with examples

---

## ✅ Summary

- **Create**: Name + Email → Auto-generated API key
- **Manage**: Upgrade/Downgrade plans, Revoke keys
- **Monitor**: Track usage and customer count
- **Secure**: Passcode-protected admin access
