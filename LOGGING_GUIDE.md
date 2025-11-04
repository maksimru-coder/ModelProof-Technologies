# BiasRadar Usage Logging Guide

## What's Been Added

I've added comprehensive logging to track every time users click:
- **"Scan Now"** button - logs to `[BIASRADAR SCAN]`
- **"Fix Text"** button - logs to `[BIASRADAR FIX]`

## What Gets Logged

Each log entry captures:
- **Timestamp** - When the action occurred (UTC)
- **IP Address** - Who made the request (identifies unique users/locations)
- **User-Agent** - Browser and device information
- **Text Length** - Number of characters processed
- **Bias Types** - Which bias dimensions were scanned (for scan requests)

### Example Log Entries

```
[BIASRADAR SCAN] 2025-11-04 05:44:13 UTC | IP: 192.168.1.100 | User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) | Text Length: 234 chars | Bias Types: gender, race, age
[BIASRADAR FIX] 2025-11-04 05:45:20 UTC | IP: 192.168.1.100 | User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) | Text Length: 234 chars
```

## Where to View Logs

### Development Environment (Replit)

**Local testing logs won't be visible** in the Replit workflow because the API endpoints are Vercel serverless functions that only run when deployed.

To see logs during development:
1. Deploy to Vercel (see instructions below)
2. View logs in Vercel dashboard

### Production Environment (Vercel)

**This is where you'll see all logs in production:**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **modelproof** project
3. Click on **Deployments**
4. Click on the latest deployment
5. Click on **Functions** tab
6. Select either:
   - `api/biasradar/scan.py` - for scan logs
   - `api/biasradar/fix.py` - for fix logs
7. View the **Logs** section

**Real-time monitoring:**
- Go to your project → **Logs** tab (left sidebar)
- You'll see all function invocations with timestamps
- Click on any log entry to see full details including IP, user-agent, etc.

## IP Address to Location Lookup

The logs capture IP addresses. To get location information:

**Option 1: Use free IP lookup services**
- [ipinfo.io](https://ipinfo.io/) - Type IP address to get city, region, country
- [ipapi.co](https://ipapi.co/) - Free API for programmatic lookups

**Option 2: Vercel Analytics** (Recommended)
- Vercel automatically captures geographic data
- Go to your project → **Analytics** tab
- View visitor locations on a map
- See real-time usage by country/region

## Testing the Logging

To test that logging is working:

1. **Deploy to Vercel:**
   ```bash
   git add .
   git commit -m "Add usage logging to BiasRadar"
   git push origin main
   ```

2. **Visit your deployed site:**
   - Go to `https://modelproof.vercel.app/biasradar`
   - Click "Load sample biased text"
   - Click "Scan Now"
   - Click "Fix Text"

3. **Check Vercel logs:**
   - Within seconds, visit Vercel Dashboard → Your Project → Logs
   - You'll see entries like:
     ```
     [BIASRADAR SCAN] 2025-11-04 05:44:13 UTC | IP: 203.0.113.42 | User-Agent: Mozilla/5.0... | Text Length: 156 chars | Bias Types: gender, race, age, disability, lgbtq, religion, socioeconomic, culture, intersectional, political, ideological_neutrality, truth_seeking
     [BIASRADAR FIX] 2025-11-04 05:45:20 UTC | IP: 203.0.113.42 | User-Agent: Mozilla/5.0... | Text Length: 156 chars
     ```

## Log Retention

- **Vercel Free Plan**: 1-day log retention
- **Vercel Pro Plan**: 7-day log retention  
- **Vercel Enterprise**: Custom retention

For longer retention, consider:
1. Setting up log forwarding to a service like:
   - **Datadog** (free tier available)
   - **Logtail** (free tier: 1GB/month)
   - **Better Stack** (free tier available)

2. Export logs periodically via Vercel CLI:
   ```bash
   vercel logs [deployment-url] > biasradar-logs.txt
   ```

## Privacy Considerations

The logs capture IP addresses for analytics. Ensure compliance with:
- **GDPR** (EU) - Inform users about IP logging in privacy policy
- **CCPA** (California) - Allow users to request data deletion
- **General best practice** - Don't store personally identifiable information from the text content itself

## Files Modified

- `api/biasradar/scan.py` - Added logging for scan requests
- `api/biasradar/fix.py` - Added logging for fix requests

## Summary

✅ **Logging is now active** for both Scan and Fix operations
✅ **Captures who, when, and basic location** (via IP address)
✅ **View logs in Vercel Dashboard** → Deployments → Functions → Logs
✅ **Use IP lookup services** to convert IP addresses to geographic locations
✅ **Deploy to see logs in action** - logs won't appear in Replit dev environment
