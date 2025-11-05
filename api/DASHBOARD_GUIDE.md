# 📊 Admin Dashboard Guide - BiasRadar API

## 🔐 Accessing the Dashboard

**URL**: https://modelproof.ai/api/dashboard

When you visit the dashboard, you'll be **automatically prompted** to enter your admin passcode (the value of `ADMIN_PASSCODE` environment variable in Vercel).

---

## ➕ Creating a New Organization

The dashboard has a form at the top to create new organizations (customers).

### Required Fields:

| Field | Description | Example |
|-------|-------------|---------|
| **Organization Name** | The company or organization name | `Acme Corporation` |
| **Contact Email** | Main contact email for this organization | `contact@acme.com` |
| **Plan Type** | Choose from Demo, Free, or Paid | `Demo` |

### Plan Types:

#### 🟡 Demo Plan
- ✅ 20 requests/day
- ⏰ **Expires after 5 days** (auto-calculated)
- 🚫 **Automatically blocks API access** after expiration
- 💡 Perfect for trials and testing
- ⚠️ Shows "DEMO (Xd left)" badge in dashboard

#### 🔵 Free Plan
- ✅ 20 requests/day
- ♾️ **No expiration**
- 🔄 Resets daily at midnight UTC
- 💡 Standard free tier

#### 🟢 Paid Plan
- ✅ **Unlimited requests**
- ♾️ No expiration
- 🚀 No rate limiting
- 💰 Premium customers

### What Happens:

1. Fill in the organization name, email, and select plan type
2. Click "Create Organization"
3. ✅ An API key is **automatically generated** (format: `bdr_xxxxxxxxxxxxx...`)
4. You'll see a success popup with:
   - Organization details
   - Full API key
   - Plan limits and expiration (for demo)
5. **Copy and share this API key with your customer**

### Notes:

- ✨ API keys are **auto-generated** - you don't create them manually
- 📧 Email addresses must be **unique** - can't register the same email twice
- 🔑 The API key is only shown once during creation - **save it!**
- ⏰ Demo accounts show expiration date in the table

---

## 📋 Managing Organizations

Once organizations are created, the dashboard displays them in a table with these columns:

### Table Columns:

| Column | Description |
|--------|-------------|
| **Name** | Company/organization name |
| **Email** | Contact email address |
| **API Key** | Truncated view (first 20 characters) |
| **Plan** | Badge showing FREE / DEMO (Xd left) / PAID / EXPIRED |
| **Requests** | Current usage (e.g., "15 / 20" for limited plans) |
| **Created** | Registration date |
| **Expires** | Expiration date (demo only) or "—" |
| **Actions** | Upgrade and Revoke buttons |

### Plan Badges:

- 🔵 **FREE**: Gray badge, 20 req/day, no expiration
- 🟡 **DEMO (3d left)**: Orange badge, shows days remaining
- 🔴 **EXPIRED**: Red badge, demo period ended, API blocked
- 🟢 **PAID**: Green badge, unlimited requests

---

## 🎛️ Actions Available:

### 1. Upgrade to Paid
- **Button**: "Upgrade to Paid" (visible for Free and Demo accounts)
- **Action**: Converts account to unlimited paid plan
- **Effect**: 
  - Removes rate limiting
  - Clears expiration date (for demos)
  - Changes badge to green "PAID"
  - Grants unlimited API requests

### 2. Revoke API Key
- **Button**: "Revoke" (visible for all accounts)
- **Action**: ⚠️ **Permanently deletes** the organization
- **Effect**:
  - Customer's API key stops working immediately
  - All data is removed from database
  - Cannot be undone
  - Use for: expired demos, suspicious activity, cancelled customers

---

## 📊 Dashboard Statistics

At the top of the dashboard, you'll see three key metrics:

1. **Total Organizations**: Count of all registered customers
2. **Paid Customers**: Organizations on the paid plan
3. **Total Requests Today**: Combined API usage across all organizations

These stats update automatically when you create, upgrade, or revoke organizations.

---

## 🔄 Rate Limiting by Plan

### Free Plan:
- ✅ 20 requests per day
- ⏰ Resets daily at midnight UTC
- 🚫 Returns 429 error after 20 requests
- ♾️ Never expires

### Demo Plan:
- ✅ 20 requests per day
- ⏰ Resets daily at midnight UTC
- 🚫 Returns 429 error after 20 requests
- ⏳ **Expires after 5 days**
- 🚫 Returns 403 "Demo expired" after expiration date

### Paid Plan:
- ✅ Unlimited requests
- 💰 No daily limit
- ⚡ No rate limiting
- ♾️ Never expires

---

## 📝 Example Workflows

### Workflow 1: Creating a Demo Account

1. **Fill in form**:
   - Name: `Tech Startup Inc`
   - Email: `demo@techstartup.com`
   - Plan: `Demo (20 req/day for 5 days, then auto-expires)`

2. **Click "Create Organization"**

3. **Copy API key from popup**:
   ```
   ✅ Organization created successfully!
   
   Name: Tech Startup Inc
   Email: demo@techstartup.com
   Plan: DEMO
   API Key: bdr_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6...
   
   ⏰ Demo expires: 11/10/2025 (5 days)
   20 requests/day limit
   
   Share the API key with the customer.
   ```

4. **Send to customer**:
   ```bash
   curl -X POST https://modelproof.ai/api/public \
     -H "Authorization: Bearer bdr_a1b2c3d4e5f6..." \
     -H "Content-Type: application/json" \
     -d '{"text": "Sample text to scan"}'
   ```

5. **Monitor in dashboard**:
   - See "DEMO (5d left)" badge
   - Watch requests count (e.g., "12 / 20")
   - See expiration date: "11/10/2025"

6. **After 5 days**:
   - Badge changes to "EXPIRED" (red)
   - API returns 403 error
   - Customer must upgrade to paid

---

### Workflow 2: Upgrading Demo to Paid

1. **Find organization** in dashboard table
2. **Click "Upgrade to Paid"** button
3. **Confirm** the upgrade
4. **✅ Success**:
   - Badge changes from "DEMO (2d left)" to "PAID"
   - Expiration date changes to "—"
   - Requests column shows just count (no limit)
   - Customer now has unlimited access

---

### Workflow 3: Revoking an Expired Demo

1. **Identify expired account**:
   - Badge shows "EXPIRED" in red
   - API already blocked
2. **Click "Revoke"** button
3. **Confirm deletion**
4. **✅ Organization removed** from database
5. Customer's API key no longer works

---

## 🚨 Troubleshooting

### Passcode Not Being Asked:
- ✅ **Fixed**: Now prompts automatically on page load
- Try: Clear browser cache and reload
- Try: Incognito/private browsing mode
- Check: Browser console for JavaScript errors

### "Organization already exists" Error:
- Email addresses must be unique
- Use a different email or revoke the existing organization first

### Demo Not Expiring:
- Check the "Expires" column for the expiration date
- API automatically blocks access after expiration
- Dashboard shows "EXPIRED" badge automatically

### API Key Not Showing:
- API keys are only displayed once during creation
- If lost, you must revoke and create a new organization
- No way to retrieve lost keys (security feature)

### Dashboard Shows Empty:
- Check that `DATABASE_URL` is set in Vercel
- Verify database connection
- Check Vercel function logs for errors
- Ensure passcode was entered correctly

---

## 🔒 Security Best Practices

1. **Protect your admin passcode** (`ADMIN_PASSCODE`)
   - Never share it publicly
   - Only for dashboard access
   - Different from API keys

2. **Distribute API keys** (`bdr_xxx...`)
   - Share these with customers
   - One key per organization
   - Store in environment variables

3. **Monitor usage regularly**
   - Check "Requests" column daily
   - Watch for suspicious patterns
   - Revoke compromised keys immediately

4. **Handle expired demos**
   - Review expired demos weekly
   - Revoke or upgrade as needed
   - Don't leave expired accounts active

---

## 📚 Customer API Usage

Once you've created an organization and shared their API key, they can use:

### Scan for Bias:
```bash
curl -X POST https://modelproof.ai/api/public \
  -H "Authorization: Bearer API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{"text": "Your text here"}'
```

### Fix Biased Text:
```bash
curl -X POST https://modelproof.ai/api/public/fix \
  -H "Authorization: Bearer API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{"text": "Your text here"}'
```

### View Documentation:
- **API Docs**: https://modelproof.ai/api/docs
- **Interactive Swagger UI** with live examples
- **13 bias dimensions** explained

---

## ✅ Quick Reference

### Creating Organizations:
- **Demo**: 20/day, expires in 5 days, auto-blocks
- **Free**: 20/day, never expires
- **Paid**: Unlimited, never expires

### Managing Organizations:
- **Upgrade**: Free/Demo → Paid (unlimited)
- **Revoke**: Permanent deletion, cannot undo

### Monitoring:
- **Dashboard stats**: Total, Paid, Requests
- **Table view**: Plan badges, expiration dates, usage
- **Auto-refresh**: Load new data anytime

---

## 🎯 Summary

The admin dashboard gives you complete control over BiasRadar API customers:

✅ Create demo accounts for trials (5-day expiration)  
✅ Create free accounts for low-volume users  
✅ Create paid accounts for unlimited access  
✅ Monitor usage and track expiration dates  
✅ Upgrade accounts when customers convert  
✅ Revoke access for expired/cancelled accounts  
✅ Passcode-protected secure admin access  

**Perfect for managing a production API business!** 🚀
