# 🔧 Required Environment Variables for Vercel

## ⚠️ Critical Issue: DATABASE_URL Missing

Your API functions are failing because **DATABASE_URL is not set in Vercel**.

---

## 📋 Required Variables

You need to set these **2 environment variables** in Vercel:

### 1. DATABASE_URL
**Value**: Your Postgres connection string from Neon/Vercel Postgres

**Where to find it:**
- Vercel Dashboard → Storage → Your Database → Settings → Connection String
- Or check your main app's existing environment variables

**Format:**
```
postgresql://username:password@host/database?sslmode=require
```

**Add to Vercel:**
1. Go to: https://vercel.com/[your-username]/[project-name]/settings/environment-variables
2. Click "Add New"
3. Name: `DATABASE_URL`
4. Value: `postgresql://...` (your full connection string)
5. Environment: ✅ Production ✅ Preview ✅ Development
6. Click "Save"

---

### 2. ADMIN_PASSCODE
**Value**: Your admin dashboard password (e.g., `changeme123`)

**Add to Vercel:**
1. Same page as above
2. Click "Add New"
3. Name: `ADMIN_PASSCODE`
4. Value: `changeme123` (or your chosen password)
5. Environment: ✅ Production ✅ Preview ✅ Development
6. Click "Save"

---

## 🔍 How to Find Your DATABASE_URL

### Option 1: Check Existing Variables
Your main app probably already has `DATABASE_URL` set. 

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Look for `DATABASE_URL` 
3. Copy the value
4. Use the same value for the API functions

### Option 2: Get from Vercel Postgres
If you're using Vercel's built-in Postgres:

1. Vercel Dashboard → Storage tab
2. Select your Postgres database
3. Click "Settings"
4. Copy the connection string under "Connection String"

### Option 3: Get from Replit
If your database is in Replit:

1. In Replit, open the Secrets tool (🔒 icon)
2. Find `DATABASE_URL`
3. Copy the value
4. Add it to Vercel

---

## ✅ After Adding Variables

Once you've added both variables:

**Redeploy your application:**

```bash
git commit --allow-empty -m "Trigger redeploy with DATABASE_URL"
git push origin main
```

Or in Vercel dashboard:
- Deployments tab → Latest deployment → "..." menu → "Redeploy"

---

## 🧪 Test After Deployment

1. Wait for deployment to complete (~2 minutes)
2. Go to: https://modelproof.ai/api/dashboard
3. Enter your passcode (value of `ADMIN_PASSCODE`)
4. ✅ You should see the admin dashboard!

---

## 🚨 Common Mistakes

❌ **Wrong**: Setting variables only for "Production"
✅ **Correct**: Set for all three: Production, Preview, Development

❌ **Wrong**: Using `API_DATABASE_URL` or different name
✅ **Correct**: Must be exactly `DATABASE_URL`

❌ **Wrong**: Not redeploying after adding variables
✅ **Correct**: Always redeploy after changing environment variables

---

## 📊 Summary Checklist

- [ ] Find your Postgres connection string (DATABASE_URL)
- [ ] Add `DATABASE_URL` to Vercel environment variables
- [ ] Add `ADMIN_PASSCODE` to Vercel environment variables
- [ ] Make sure both are set for Production, Preview, AND Development
- [ ] Redeploy the application
- [ ] Test the dashboard at /api/dashboard

---

## 💡 Need Help Finding DATABASE_URL?

Run this command in your Replit workspace to see what DATABASE_URL should be:

```bash
echo $DATABASE_URL
```

Copy the output and add it to Vercel!
