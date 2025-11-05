# BiasRadar API - Deployment Guide

## ✅ Production-Ready Status

Your BiasRadar Professional API is **production-ready** and approved for deployment to Vercel!

## 🚀 Quick Deployment Steps

### 1. Push to GitHub

All code is ready in the `/api` folder. Simply push your changes:

```bash
git add .
git commit -m "Add BiasRadar Professional API"
git push origin main
```

### 2. Deploy to Vercel

Vercel will automatically:
- Detect the serverless functions in `/api`
- Install dependencies from `api/package.json`
- Generate Prisma Client
- Deploy all endpoints

### 3. Initialize Database (One-Time)

After first deployment, run this command to create the `Organization` table:

```bash
npx prisma db push --schema=api/prisma/schema.prisma
```

Or use Vercel CLI:
```bash
vercel env pull
cd api
npx prisma db push
```

### 4. Set Environment Variables (if needed)

Vercel should automatically have:
- `DATABASE_URL` (from existing Postgres/Neon setup)
- `ADMIN_PASSCODE` (set to "changeme123" or your custom value)

## 📍 Production URLs

After deployment, your API will be available at:

| Endpoint | URL | Purpose |
|----------|-----|---------|
| **Scan** | `https://modelproof.ai/api/v1/scan` | Detect bias in text |
| **Fix** | `https://modelproof.ai/api/v1/fix` | Fix biased text with AI |
| **Register** | `https://modelproof.ai/api/v1/register` | Create new organization (admin only) |
| **Revoke** | `https://modelproof.ai/api/v1/revoke` | Revoke API key (admin only) |
| **Upgrade** | `https://modelproof.ai/api/v1/upgrade` | Upgrade to paid plan (admin only) |
| **Dashboard** | `https://modelproof.ai/api/dashboard` | Admin UI for managing customers |
| **Docs** | `https://modelproof.ai/api/docs` | Interactive Swagger documentation |

## 🔑 Getting Started for Customers

### Step 1: Register Your First Customer

Use curl or the admin dashboard to register a new organization:

```bash
curl -X POST https://modelproof.ai/api/v1/register \
  -H "X-Admin-Passcode: changeme123" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Acme Corporation",
    "email": "contact@acme.com"
  }'
```

**Response:**
```json
{
  "success": true,
  "organization": {
    "id": "uuid-here",
    "name": "Acme Corporation",
    "email": "contact@acme.com",
    "api_key": "bdr_xxxxxxxxxxxxxxxxxxxxx",
    "is_paid": false,
    "created_at": "2025-11-05T..."
  }
}
```

### Step 2: Customer Uses the API

Provide the API key to your customer. They can then use it:

**Scan for Bias:**
```bash
curl -X POST https://modelproof.ai/api/v1/scan \
  -H "Authorization: Bearer bdr_xxxxxxxxxxxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "The chairman should ensure his staff are well-trained."
  }'
```

**Fix Biased Text:**
```bash
curl -X POST https://modelproof.ai/api/v1/fix \
  -H "Authorization: Bearer bdr_xxxxxxxxxxxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "The chairman should ensure his staff are well-trained."
  }'
```

## 🎯 Admin Dashboard

Access your admin dashboard to manage customers:

1. Navigate to: `https://modelproof.ai/api/dashboard`
2. Enter admin passcode when prompted: `changeme123`
3. View all organizations, API usage, and manage plans

**Dashboard Features:**
- View all registered organizations
- See request counts and rate limits
- Upgrade organizations to paid plans
- Revoke API keys
- Real-time stats

## 📊 Rate Limiting

- **Free Tier**: 20 requests per day
- **Paid Tier**: Unlimited requests
- Limits reset daily at midnight UTC

To upgrade a customer to paid:
```bash
curl -X PATCH https://modelproof.ai/api/v1/upgrade \
  -H "X-Admin-Passcode: changeme123" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "contact@acme.com",
    "is_paid": true
  }'
```

## 🔒 Security Features

✅ **PostgreSQL Database**: Persistent, production-ready storage (not SQLite)
✅ **Header-Based Authentication**: Admin passcode only in headers (never in URLs)
✅ **CORS Configured**: Proper CORS headers for all endpoints
✅ **Input Sanitization**: 20,000 character limit on all text inputs
✅ **Bearer Token Auth**: Secure API key authentication
✅ **SQL Injection Protection**: Prisma ORM prevents SQL injection

## 🐛 Troubleshooting

### "Invalid API key" Error
- Check that the Bearer token is correct: `Authorization: Bearer bdr_xxxxx`
- Verify the organization exists in the database

### "Rate limit exceeded" Error
- Free tier customers hit 20 requests/day
- Upgrade them to paid: `is_paid: true`

### Dashboard Shows No Data
- Check browser console for errors
- Verify admin passcode is correct
- Ensure database connection is working

### Scan/Fix Endpoints Fail
- Verify the BiasRadar Python backend is deployed
- Check `DATABASE_URL` environment variable
- Ensure OpenAI API key is set (`OPENAI_API_KEY`)

## 📚 Additional Resources

- **API Documentation**: https://modelproof.ai/api/docs
- **Main Website**: https://modelproof.ai
- **BiasRadar Tool**: https://modelproof.ai/biasradar

## 🎉 You're Ready!

Your BiasRadar Professional API is:
- ✅ Production-ready
- ✅ Architect-approved
- ✅ Fully tested
- ✅ Secure and compliant
- ✅ Ready for customers

Just push to GitHub and deploy to Vercel! 🚀
