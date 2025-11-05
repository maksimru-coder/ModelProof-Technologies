# Vercel Environment Variables Setup

## ⚠️ Required Setup Before Dashboard Works

Your admin dashboard is failing because Vercel doesn't have the required environment variables. Follow these steps:

---

## 1. Set Environment Variables in Vercel

Go to your Vercel project settings:
1. Open https://vercel.com/your-project/settings/environment-variables
2. Add these **3 environment variables**:

### Required Variables:

| Variable Name | Value | Notes |
|---------------|-------|-------|
| `DATABASE_URL` | (already set) | Your Postgres connection string - should already exist |
| `ADMIN_PASSCODE` | `changeme123` | Or set your own secure passcode |
| `JWT_SECRET` | `your-secret-here` | Random string (e.g., 64 characters) |

---

## 2. How to Add Each Variable

For **ADMIN_PASSCODE**:
```
Name: ADMIN_PASSCODE
Value: changeme123
Environment: Production, Preview, Development (select all)
```

For **JWT_SECRET**:
```
Name: JWT_SECRET  
Value: (generate a random string like: openssl rand -hex 32)
Environment: Production, Preview, Development (select all)
```

---

## 3. Redeploy After Adding Variables

After adding the environment variables:

**Option A**: Trigger a new deployment
```bash
git commit --allow-empty -m "Trigger redeploy with env vars"
git push origin main
```

**Option B**: Use Vercel dashboard
- Go to Deployments tab
- Click "..." menu on latest deployment
- Click "Redeploy"

---

## 4. Test the Dashboard

Once redeployed (1-2 minutes):
1. Go to: https://modelproof.ai/api/dashboard
2. Enter your passcode when prompted
3. You should see the admin dashboard with organization management

---

## 5. Generate a Secure Admin Passcode

To create a strong passcode, use:

```bash
# Generate random 32-character hex string
openssl rand -hex 16

# Or generate base64 string
openssl rand -base64 24
```

Then update `ADMIN_PASSCODE` in Vercel with this value.

---

## ✅ Checklist

Before the dashboard works, ensure:
- [ ] `DATABASE_URL` exists in Vercel (check existing variables)
- [ ] `ADMIN_PASSCODE` is set in Vercel
- [ ] `JWT_SECRET` is set in Vercel  
- [ ] Code is pushed to GitHub
- [ ] Vercel has redeployed with the new environment variables

---

## 🔍 Troubleshooting

**"FUNCTION_INVOCATION_FAILED" error:**
- Missing environment variables (check Vercel settings)
- Prisma client not generated (vercel.json now fixes this)
- Database connection issue (check DATABASE_URL)

**"Invalid passcode" with correct passcode:**
- `ADMIN_PASSCODE` not set in Vercel
- Vercel hasn't redeployed since adding the variable

**Still getting errors?**
- Check Vercel function logs: Project → Deployments → Click deployment → Functions tab
- Look for specific error messages
