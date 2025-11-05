# 🚀 BiasRadar API - Complete Deployment Summary

## ✅ What's Been Implemented

### 1. Three-Tier Plan System

| Plan | Rate Limit | Expiration | Auto-Block |
|------|------------|------------|------------|
| **Demo** | 20 req/day | 5 days | ✅ Yes |
| **Free** | 20 req/day | Never | ❌ No |
| **Paid** | Unlimited | Never | ❌ No |

### 2. Admin Dashboard Features

✅ **Passcode-protected access** at `/api/dashboard`  
✅ **Create Organization form** with plan type selection  
✅ **Auto-generated API keys** (format: `bdr_xxxxxxxxxxxxx...`)  
✅ **Plan badges** with color coding:
  - 🟢 Green = Paid (unlimited)
  - 🟡 Orange = Demo (shows days left)
  - 🔵 Gray = Free (20/day)
  - 🔴 Red = Expired demo

✅ **Table columns**:
  - Name, Email, API Key (truncated)
  - Plan badge with days countdown
  - Requests (usage counter)
  - Created date
  - Expires date (demo only)
  - Actions (Upgrade, Revoke)

✅ **Statistics dashboard**:
  - Total Organizations
  - Paid Customers
  - Total Requests Today

### 3. Database Schema

```prisma
model Organization {
  id              String   @id @default(uuid())
  name            String
  email           String   @unique
  is_paid         Boolean  @default(false)
  plan_type       String   @default("free")      // NEW
  api_key         String   @unique
  requests_made   Int      @default(0)
  last_reset      DateTime @default(now())
  created_at      DateTime @default(now())
  demo_expires_at DateTime?                      // NEW
}
```

### 4. API Endpoints

#### Public API
- ✅ Scan for bias: `POST /api/scan`
- ✅ Fix biased text: `POST /api/fix`
- ✅ Bearer token authentication
- ✅ Rate limiting by plan type
- ✅ Demo expiration checking
- ✅ Auto-block expired demos

#### Admin API (`/api/admin`)
- ✅ `GET`: List all organizations
- ✅ `POST`: Create organization with plan type
- ✅ `PATCH`: Upgrade to paid plan
- ✅ `POST` (revoke): Delete organization
- ✅ X-Admin-Passcode header authentication

#### Dashboard (`/api/dashboard`)
- ✅ HTML dashboard with JavaScript
- ✅ Passcode prompt on load
- ✅ Real-time stats
- ✅ Create, upgrade, revoke actions

#### Documentation (`/api/docs`)
- ✅ Swagger UI
- ✅ Interactive API explorer

---

## 🔧 Environment Variables Required

### In Vercel Dashboard:

1. **DATABASE_URL**
   - Your Postgres connection string
   - Format: `postgresql://user:pass@host/db?sslmode=require`
   - Set for: Production, Preview, Development

2. **ADMIN_PASSCODE**
   - Your dashboard password
   - Example: `changeme123`
   - Set for: Production, Preview, Development

---

## 📋 Deployment Checklist

### Already Completed:
- [x] Database schema updated with `plan_type` and `demo_expires_at`
- [x] Migration applied to development database
- [x] Dashboard UI updated with plan selector
- [x] Admin API supports creating demo/free/paid accounts
- [x] Public API checks demo expiration
- [x] Rate limiting updated for all plan types
- [x] Auto-generated API keys (bdr_xxxxx format)
- [x] Passcode protection working
- [x] Revoke functionality implemented

### To Deploy to Production:

1. **Set Environment Variables in Vercel**:
   ```
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add DATABASE_URL (your Postgres connection)
   - Add ADMIN_PASSCODE (your chosen password)
   - Check all environments: Production, Preview, Development
   ```

2. **Deploy Code**:
   ```bash
   git add .
   git commit -m "Add demo plan support with 5-day expiration"
   git push origin main
   ```

3. **Apply Migration to Production Database**:
   ```bash
   # Get production DATABASE_URL from Vercel
   export DATABASE_URL="your_production_db_url"
   cd api
   npx prisma db push
   ```

4. **Test Dashboard**:
   - Visit: https://modelproof.ai/api/dashboard
   - Enter passcode
   - Create a test demo organization
   - Verify expiration date appears
   - Test API with the generated key

---

## 🎯 How to Use After Deployment

### Creating a Demo Account:

1. Go to: https://modelproof.ai/api/dashboard
2. Enter your admin passcode
3. Fill in form:
   - **Name**: Tech Startup Inc
   - **Email**: demo@techstartup.com
   - **Plan**: Demo (20 req/day for 5 days, then auto-expires)
4. Click "Create Organization"
5. Copy the API key from the popup: `bdr_a1b2c3d4...`
6. Share with customer

### Customer Uses API:

```bash
# Scan for bias
curl -X POST https://www.modelproof.ai/api/scan \
  -H "Authorization: Bearer bdr_a1b2c3d4..." \
  -H "Content-Type: application/json" \
  -d '{"text": "Sample text to analyze"}'

# Fix biased text
curl -X POST https://www.modelproof.ai/api/fix \
  -H "Authorization: Bearer bdr_a1b2c3d4..." \
  -H "Content-Type: application/json" \
  -d '{"text": "Sample text to fix"}'
```

### What Happens After 5 Days:

- ✅ Dashboard badge shows "EXPIRED" (red)
- ✅ API returns 403 error: "Demo period expired"
- ✅ Customer must contact you to upgrade
- ✅ You can click "Upgrade to Paid" or "Revoke"

---

## 📚 Documentation Files Created

1. **`api/DASHBOARD_GUIDE.md`**
   - Complete dashboard usage guide
   - Field descriptions
   - Plan types explained
   - Workflow examples
   - Troubleshooting

2. **`api/MIGRATION_GUIDE.md`**
   - Database migration instructions
   - Schema changes explained
   - Production deployment steps
   - Verification checklist

3. **`api/ENVIRONMENT_VARIABLES.md`**
   - Required environment variables
   - Where to find DATABASE_URL
   - How to set in Vercel
   - Common mistakes

4. **`api/DEPLOYMENT_SUMMARY.md`** (this file)
   - Complete feature overview
   - Deployment checklist
   - Usage examples

---

## 🔍 Key Features Highlights

### Auto-Expiration System:
- Demo accounts created with `demo_expires_at = now() + 5 days`
- Public API checks expiration before processing requests
- Returns 403 error if expired
- Dashboard shows "EXPIRED" badge automatically

### Smart Rate Limiting:
- **Paid**: No limits, no checks
- **Demo/Free**: 20 requests/day
- Resets daily at midnight UTC
- Different error messages per plan type

### Secure Admin Access:
- Dashboard requires `X-Admin-Passcode` header
- HTML loads publicly (no sensitive data)
- Data fetched via authenticated AJAX
- Invalid passcode = prompt again

### Flexible Plan Management:
- Create with any plan type
- Upgrade demo/free → paid anytime
- Revoke any account permanently
- No downgrade (by design for revenue protection)

---

## ✅ Production Ready!

Your BiasRadar API is now fully configured with:

✅ Three-tier pricing (Demo, Free, Paid)  
✅ Auto-expiring demo accounts (5 days)  
✅ Rate limiting by plan type  
✅ Admin dashboard with management tools  
✅ Secure passcode authentication  
✅ API key generation and revocation  
✅ PostgreSQL database with migrations  
✅ Vercel serverless deployment  
✅ Complete documentation  

**Next Step**: Deploy to Vercel and set environment variables!

---

## 🚨 Important Notes

1. **Always set DATABASE_URL and ADMIN_PASSCODE in Vercel before deploying**
2. **Run `npx prisma db push` on production database after first deploy**
3. **API keys are shown only once - save them immediately**
4. **Revoke is permanent - cannot be undone**
5. **Demo expiration is automatic - no manual intervention needed**

---

## 📞 Support

- Dashboard: https://modelproof.ai/api/dashboard
- API Docs: https://modelproof.ai/api/docs
- GitHub: Check README.md for additional info

**Happy deploying!** 🎉
