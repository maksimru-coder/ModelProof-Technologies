# Tiered Character Limits Implementation

## Overview
BiasRadar API now supports **tiered character limits** based on organization plan type:
- **Free/Demo Plans**: 10,000 characters per request
- **Paid Plans**: 50,000 characters per request (5x more!)

## Implementation Details

### Character Limit Enforcement

#### API Layer (`api/scan.js` and `api/fix.js`)
The tiered limits are enforced at the Node.js API wrapper layer:

```javascript
// Tiered character limits based on plan
const characterLimit = (planType === 'paid') ? 50000 : 10000;

if (text.length > characterLimit) {
  return res.status(400).json({ 
    error: limitMessage,
    current_length: text.length,
    character_limit: characterLimit,
    plan: planType,
    upgrade_info: planType !== 'paid' ? 'Contact support to upgrade for higher limits' : null
  });
}
```

**Key Features:**
- Automatically detects organization plan type (`free`, `demo`, or `paid`)
- Applies appropriate limit based on plan
- Returns clear error message with upgrade information for free/demo users
- Includes current character count and limit in error response

#### Python Backend (`api/biasradar/scan.py`)
The Python serverless function accepts up to 50,000 characters (tier enforcement happens in Node.js layer):

```python
# Accept up to 50,000 characters (tier enforcement happens in scan.js)
if len(text) > 50000:
    self.send_error(400, "Text too long. Maximum 50,000 characters.")
    return
```

### Plan Type Detection

The system uses the existing `plan_type` field from the Organization model:
- `plan_type === 'paid'` → 50,000 character limit
- `plan_type === 'free'` → 10,000 character limit  
- `plan_type === 'demo'` → 10,000 character limit

This is determined from the database using the API key authentication:

```javascript
const org = await prisma.organization.findUnique({
  where: { api_key: apiKey }
});

const planType = org.plan_type || (org.is_paid ? 'paid' : 'free');
```

## Error Responses

### Free/Demo Plan Exceeding Limit

**Request:**
```bash
curl -X POST https://www.modelproof.ai/api/scan \
  -H "Authorization: Bearer bdr_free_api_key" \
  -H "Content-Type: application/json" \
  -d '{"text": "... 15000 characters ..."}'
```

**Response:** `400 Bad Request`
```json
{
  "error": "Text exceeds maximum length of 10,000 characters. Upgrade to a paid plan for 50,000 character limit.",
  "current_length": 15000,
  "character_limit": 10000,
  "plan": "free",
  "upgrade_info": "Contact support to upgrade for higher limits"
}
```

### Paid Plan Exceeding Limit

**Request:**
```bash
curl -X POST https://www.modelproof.ai/api/scan \
  -H "Authorization: Bearer bdr_paid_api_key" \
  -H "Content-Type: application/json" \
  -d '{"text": "... 60000 characters ..."}'
```

**Response:** `400 Bad Request`
```json
{
  "error": "Text exceeds maximum length of 50,000 characters for paid plans",
  "current_length": 60000,
  "character_limit": 50000,
  "plan": "paid",
  "upgrade_info": null
}
```

## Benefits by Plan Type

### Free/Demo Plans
- **Limit**: 10,000 characters
- **Equivalent to**: ~3-4 pages of text
- **Use cases**: Short documents, emails, job postings
- **Rate limit**: 20 requests per day

### Paid Plans  
- **Limit**: 50,000 characters
- **Equivalent to**: ~15-20 pages of text
- **Use cases**: Long reports, articles, legal documents, academic papers
- **Rate limit**: Unlimited requests
- **Advantage**: 5x more characters per request

## Documentation Updates

All documentation has been updated to reflect tiered limits:

### ✅ Updated Files
1. **`api/scan.js`** - Tiered limit enforcement
2. **`api/fix.js`** - Tiered limit enforcement  
3. **`api/biasradar/scan.py`** - Increased max to 50,000
4. **`api/docs.js`** - Swagger documentation updated
5. **`api/API_ENDPOINTS.md`** - Rate limiting section updated
6. **`CHARACTER_LIMIT_FEATURE.md`** - Updated with tiered info

### 📚 Swagger API Docs
Visit https://modelproof.ai/api/docs to see the updated API documentation with tiered character limits clearly displayed.

## Testing

### Test Free Plan Limit (10,000 chars)
```bash
# Generate 15,000 character string
TEXT=$(python3 -c "print('a' * 15000)")

curl -X POST https://www.modelproof.ai/api/scan \
  -H "Authorization: Bearer YOUR_FREE_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"$TEXT\"}"
```

**Expected Result:** 400 error with upgrade message

### Test Paid Plan Limit (50,000 chars)
```bash
# Generate 45,000 character string
TEXT=$(python3 -c "print('a' * 45000)")

curl -X POST https://www.modelproof.ai/api/scan \
  -H "Authorization: Bearer YOUR_PAID_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"$TEXT\"}"
```

**Expected Result:** 200 success (if within paid limit)

## Upgrade Path

To upgrade an organization to paid plan (and unlock 50,000 character limit):

```bash
curl -X PATCH https://modelproof.ai/api/admin \
  -H "X-Admin-Passcode: YOUR_ADMIN_PASSCODE" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "is_paid": true
  }'
```

After upgrade:
- Character limit increases from 10,000 → 50,000
- Rate limit changes from 20/day → unlimited
- Plan badge changes to "PAID" in admin dashboard

## Summary

| Feature | Free/Demo Plans | Paid Plans |
|---------|----------------|------------|
| **Character Limit** | 10,000 | 50,000 |
| **Page Equivalent** | ~3-4 pages | ~15-20 pages |
| **Rate Limit** | 20 requests/day | Unlimited |
| **Error Response** | Includes upgrade info | No upgrade info |
| **Multiplier** | 1x (baseline) | 5x more |

This tiered system incentivizes upgrades while keeping the free tier useful for basic use cases.
