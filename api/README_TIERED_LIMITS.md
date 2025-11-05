# 🎯 Tiered Character Limits - Quick Reference

## Summary

BiasRadar API now has **tiered character limits** based on organization plan:

| Plan Type | Character Limit | Rate Limit | Cost Multiplier |
|-----------|----------------|------------|-----------------|
| **Free** | 10,000 chars | 20 req/day | 1x (baseline) |
| **Demo** | 10,000 chars | 20 req/day | 1x (5 days) |
| **Paid** | 50,000 chars | Unlimited | **5x more chars** |

## Quick Facts

✅ **Website UI**: Always 10,000 characters (all users)  
✅ **API (Free/Demo)**: 10,000 characters per request  
✅ **API (Paid)**: 50,000 characters per request  
✅ **Upgrade Benefit**: 5x more characters + unlimited requests

## Example API Responses

### Free User Exceeds Limit (15,000 chars)

```json
{
  "error": "Text exceeds maximum length of 10,000 characters. Upgrade to a paid plan for 50,000 character limit.",
  "current_length": 15000,
  "character_limit": 10000,
  "plan": "free",
  "upgrade_info": "Contact support to upgrade for higher limits"
}
```

### Paid User Within Limit (45,000 chars)

```json
{
  "success": true,
  "score": 15,
  "severity": "low",
  "issues": [...],
  "summary": "Found 3 potential bias issues..."
}
```

## Implementation Files Changed

1. **`api/scan.js`** - Added tiered limit logic (line 102-118)
2. **`api/fix.js`** - Added tiered limit logic (line 102-118)
3. **`api/biasradar/scan.py`** - Increased max to 50,000 (line 44-46)
4. **`api/docs.js`** - Updated Swagger documentation
5. **`api/API_ENDPOINTS.md`** - Updated rate limiting section
6. **`CHARACTER_LIMIT_FEATURE.md`** - Updated with tiered info

## How to Test

```bash
# Test Free Plan (should fail at 15,000 chars)
curl -X POST https://www.modelproof.ai/api/scan \
  -H "Authorization: Bearer YOUR_FREE_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"$(python3 -c 'print(\"a\" * 15000)')\"}"

# Test Paid Plan (should succeed at 45,000 chars)
curl -X POST https://www.modelproof.ai/api/scan \
  -H "Authorization: Bearer YOUR_PAID_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"$(python3 -c 'print(\"a\" * 45000)')\"}"
```

## Upgrade Organization

To upgrade a customer to paid (unlocks 50,000 character limit):

```bash
curl -X PATCH https://modelproof.ai/api/admin \
  -H "X-Admin-Passcode: YOUR_PASSCODE" \
  -H "Content-Type: application/json" \
  -d '{"email": "customer@example.com", "is_paid": true}'
```

## Documentation

- **API Docs**: https://modelproof.ai/api/docs
- **Detailed Guide**: See `TIERED_CHARACTER_LIMITS.md`
- **Website Limits**: See `CHARACTER_LIMIT_FEATURE.md`

---

**Status**: ✅ Live and Production Ready
