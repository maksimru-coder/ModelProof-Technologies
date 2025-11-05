# 🔍 Dashboard Passcode Prompt - Troubleshooting Guide

## The Problem
You're accessing the dashboard but not seeing the passcode prompt.

## Possible Causes

### 1. ❌ Wrong URL (Most Likely)
**Are you accessing the correct URL?**

✅ **CORRECT** (Vercel deployed):  
`https://modelproof.ai/api/dashboard`

❌ **WRONG** (Local development):  
`http://localhost:5000/api/dashboard` → Shows 404  
`https://your-replit-url.replit.dev/api/dashboard` → Doesn't work

**The `/api/dashboard` endpoint ONLY works on Vercel**, not locally!

---

### 2. 🚫 Browser Popup Blocker
Your browser might be blocking the `prompt()` popup.

**How to Check:**
1. Open browser DevTools (F12 or Right-click → Inspect)
2. Go to **Console** tab
3. Look for these messages:
   ```
   🔐 Dashboard script loaded!
   Document ready state: ...
   About to call loadOrganizations()...
   ```

**If you see those messages** → Browser is blocking the prompt  
**If you DON'T see them** → JavaScript isn't running (wrong URL)

---

### 3. 🔄 Not Deployed Yet
Have you deployed the latest changes to Vercel?

**To deploy:**
```bash
git add .
git commit -m "Fix passcode prompt"
git push origin main
```

Wait ~2 minutes for Vercel to deploy, then try again.

---

## ✅ Step-by-Step Solution

### Step 1: Deploy Latest Changes
```bash
git add .
git commit -m "Add immediate passcode prompt to dashboard"
git push origin main
```

### Step 2: Wait for Deployment
- Check Vercel dashboard
- Wait for "Ready" status
- Should take 1-2 minutes

### Step 3: Access the DEPLOYED URL
Go to: **https://modelproof.ai/api/dashboard**

NOT localhost, NOT Replit preview URL.

### Step 4: Open Browser Console
1. Press **F12** (or Cmd+Option+I on Mac)
2. Go to **Console** tab
3. Refresh the page

### Step 5: Check Console Output
You should see:
```
🔐 Dashboard script loaded!
Document ready state: complete
About to call loadOrganizations()...
```

### Step 6: Look for Popup
- **Popup appears**: Great! Enter your passcode
- **No popup**: Check browser address bar for popup blocker icon
- **Still nothing**: Check console for errors

---

## 🛠️ If Browser is Blocking Popup

### Option A: Allow Popups for This Site
1. Look for popup blocker icon in address bar (usually a 🚫 or similar)
2. Click it and select "Always allow popups from this site"
3. Refresh the page

### Option B: Use Browser Console
1. Open DevTools Console (F12)
2. Manually run:
   ```javascript
   prompt('Enter admin passcode:')
   ```
3. If blocked, you'll see an error message explaining why

---

## 🧪 Quick Test

### Test 1: Is JavaScript Running?
Open: https://modelproof.ai/api/dashboard

View page source (Right-click → View Page Source)

Search for: `loadOrganizations`

**Should find:** The function definition in a `<script>` tag

**If not found:** Deployment didn't work

### Test 2: Is Script Executing?
Open console (F12 → Console tab)

**Should see:**
```
🔐 Dashboard script loaded!
Document ready state: complete
About to call loadOrganizations()...
```

**If you see this** → Script is running!

---

## 🎯 Summary Checklist

- [ ] Deployed latest code to Vercel (git push)
- [ ] Waited for deployment to complete
- [ ] Accessing **https://modelproof.ai/api/dashboard** (not localhost)
- [ ] Opened browser console (F12)
- [ ] See console log messages
- [ ] Check for popup blocker icon in address bar
- [ ] Allow popups for the site
- [ ] Refresh page

---

## 📞 Still Not Working?

If you've done all the above and still no prompt, please check:

1. **Console errors**: Any red error messages?
2. **Network tab**: Does `/api/admin` request fail?
3. **Browser**: Try incognito/private mode
4. **Different browser**: Test in Chrome, Firefox, or Edge

Share the console output and I can help debug further!
