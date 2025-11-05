# 🔄 Database Migration Guide - Demo Plan Support

## What Changed

We've added support for **Demo plans** with the following new database fields:

- `plan_type`: String field ("free", "paid", or "demo")
- `demo_expires_at`: Optional timestamp for demo expiration (5 days from creation)

---

## 🚀 How to Apply Migration

### Step 1: Push Schema to Database

In your Replit workspace, run:

```bash
cd api
npx prisma db push
```

This will:
- Add the `plan_type` column (default: "free")
- Add the `demo_expires_at` column (nullable)
- Migrate existing records to use the new fields

### Step 2: Verify Migration

Check that the migration succeeded:

```bash
npx prisma studio
```

This opens a GUI where you can see your database tables and verify the new columns exist.

### Step 3: Deploy to Vercel

Once the schema is pushed to your development database, deploy to Vercel:

```bash
git add .
git commit -m "Add demo plan support with 5-day expiration"
git push origin main
```

### Step 4: Apply Migration to Production

After deploying, you need to push the schema to your production database:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Copy the **PRODUCTION** `DATABASE_URL` value
3. In Replit, temporarily set it:
   ```bash
   export DATABASE_URL="your_production_database_url"
   cd api
   npx prisma db push
   ```
4. Remove the export after migration completes

---

## ✅ Verification Checklist

After migration, verify these work:

- [ ] Dashboard loads at https://modelproof.ai/api/dashboard
- [ ] Passcode prompt appears
- [ ] Can create "Demo" organizations
- [ ] Can create "Free" organizations
- [ ] Can create "Paid" organizations
- [ ] Demo organizations show expiration date
- [ ] Demo organizations show "X days left" in plan badge
- [ ] Upgrade to Paid button works
- [ ] Revoke button works
- [ ] Expired demos are blocked from API access

---

## 🎯 New Plan Types Explained

### Free Plan
- ✅ 20 requests/day
- ✅ No expiration
- ✅ Resets daily at midnight UTC
- ⚠️ Rate limited after 20 requests

### Demo Plan (NEW)
- ✅ 20 requests/day
- ⏰ **5-day expiration** (auto-calculated from creation)
- ✅ Resets daily at midnight UTC
- ⚠️ **Automatically blocks access after 5 days**
- ⚠️ Must be manually revoked or upgraded

### Paid Plan
- ✅ Unlimited requests
- ✅ No expiration
- ✅ No rate limiting
- 💰 Premium tier

---

## 🔧 Troubleshooting

### Error: "Column 'plan_type' does not exist"
**Solution**: Run `npx prisma db push` to apply schema changes

### Error: "Prisma schema is not in sync"
**Solution**: 
```bash
cd api
npx prisma generate
npx prisma db push
```

### Existing Organizations Missing plan_type
**Solution**: The migration automatically sets `plan_type = "free"` for existing records and `is_paid = true` gets `plan_type = "paid"`

---

## 📋 What Happens to Existing Data

When you run `prisma db push`:

1. **New column `plan_type`**: 
   - Default value: `"free"`
   - Existing organizations get `"free"` unless `is_paid = true`

2. **New column `demo_expires_at`**:
   - Default value: `NULL`
   - No expiration for existing organizations

3. **Existing `is_paid` column**:
   - Preserved for backward compatibility
   - Synced with `plan_type` ("paid" = true, "free/demo" = false)

---

## 🎉 Ready to Use!

After migration, you can:

1. Create demo accounts that expire in 5 days
2. Track expiration dates in the dashboard
3. See "days left" countdown for demos
4. Auto-block expired demos from API access
5. Manually revoke any account type
