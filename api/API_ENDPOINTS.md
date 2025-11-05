# BiasRadar API - Consolidated Endpoints

## ✅ Optimized for Vercel Hobby Plan (Under 12 Functions)

We've consolidated all endpoints to use only **6 serverless functions**:

### Serverless Functions Count:
- **JavaScript**: 4 functions (admin.js, public.js, dashboard.js, docs.js)
- **Python**: 2 functions (scan.py, fix.py from biasradar/)
- **Total**: 6 functions ✅ (well under 12 limit)

---

## Public API Endpoints

### 1. Scan for Bias
**Endpoint**: `POST /api/public`

**Description**: Analyze text for bias across 13 dimensions

**Authentication**: Bearer token (API key)

**Example**:
```bash
curl -X POST https://modelproof.ai/api/public \
  -H "Authorization: Bearer bdr_xxxxxxxxxxxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "The chairman should ensure his staff are well-trained."
  }'
```

### 2. Fix Biased Text
**Endpoint**: `POST /api/public/fix`

**Description**: Automatically fix biased text using AI

**Authentication**: Bearer token (API key)

**Example**:
```bash
curl -X POST https://modelproof.ai/api/public/fix \
  -H "Authorization: Bearer bdr_xxxxxxxxxxxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "The chairman should ensure his staff are well-trained."
  }'
```

### 3. API Documentation
**Endpoint**: `GET /api/docs`

**Description**: Interactive Swagger UI documentation

**Access**: Public (no auth required)

**URL**: https://modelproof.ai/api/docs

---

## Admin Endpoints

All admin endpoints use the **same URL** (`/api/admin`) with different HTTP methods:

### 1. List Organizations
**Endpoint**: `GET /api/admin`

**Headers**: `X-Admin-Passcode: changeme123`

**Example**:
```bash
curl -X GET https://modelproof.ai/api/admin \
  -H "X-Admin-Passcode: changeme123"
```

### 2. Register New Organization
**Endpoint**: `POST /api/admin`

**Headers**: `X-Admin-Passcode: changeme123`

**Body**:
```json
{
  "name": "Acme Corporation",
  "email": "contact@acme.com"
}
```

**Example**:
```bash
curl -X POST https://modelproof.ai/api/admin \
  -H "X-Admin-Passcode: changeme123" \
  -H "Content-Type: application/json" \
  -d '{"name": "Acme Corp", "email": "contact@acme.com"}'
```

### 3. Revoke API Key
**Endpoint**: `POST /api/admin`

**Headers**: `X-Admin-Passcode: changeme123`

**Body**:
```json
{
  "email": "contact@acme.com",
  "name": "Acme Corporation",
  "action": "revoke"
}
```

### 4. Upgrade to Paid Plan
**Endpoint**: `PATCH /api/admin`

**Headers**: `X-Admin-Passcode: changeme123`

**Body**:
```json
{
  "email": "contact@acme.com",
  "is_paid": true
}
```

### 5. Admin Dashboard
**Endpoint**: `GET /api/dashboard`

**Authentication**: Browser prompt for passcode

**URL**: https://modelproof.ai/api/dashboard

---

## Rate Limiting

- **Free Tier**: 20 requests per day
- **Paid Tier**: Unlimited requests
- Resets daily at midnight UTC

---

## Quick Reference

| What You Want | Endpoint | Method | Auth |
|---------------|----------|--------|------|
| Scan text for bias | `/api/public` | POST | Bearer token |
| Fix biased text | `/api/public/fix` | POST | Bearer token |
| View docs | `/api/docs` | GET | None |
| List customers | `/api/admin` | GET | X-Admin-Passcode |
| Register customer | `/api/admin` | POST | X-Admin-Passcode |
| Revoke API key | `/api/admin` | POST + action | X-Admin-Passcode |
| Upgrade to paid | `/api/admin` | PATCH | X-Admin-Passcode |
| Admin dashboard | `/api/dashboard` | GET | Browser prompt |

---

## Deployment Status

✅ **Ready for Vercel Hobby Plan**
- Total functions: 6 (under 12 limit)
- Database: PostgreSQL (production-ready)
- Security: Header-based authentication
- Documentation: Auto-generated Swagger UI
