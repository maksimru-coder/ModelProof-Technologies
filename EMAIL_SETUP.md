# Email Configuration for ModelProof.ai

## Current Setup

### SendGrid Integration
- **Service**: SendGrid (Free tier: 100 emails/day)
- **From Address**: noreply@modelproof.ai
- **Contact Notifications**: contact@modelproof.ai
- **Career Notifications**: careers@modelproof.ai
- **Reply-To**: Automatically set to the form submitter's email

### How It Works
1. Someone submits contact form → Email sent to contact@modelproof.ai
2. You receive notification on your iPhone
3. You can reply directly - reply appears to come from contact@modelproof.ai
4. The person receives your reply from contact@modelproof.ai

## Setting Up Additional Email Addresses (maksim@modelproof.ai)

To create custom email addresses like maksim@modelproof.ai, you need a professional email hosting service:

### Option 1: Google Workspace (Recommended)
- **Cost**: $6/month per user
- **Benefits**: Full Gmail interface, mobile apps, professional appearance
- **Setup**: 
  1. Go to workspace.google.com
  2. Add your domain (modelproof.ai)
  3. Verify domain ownership
  4. Create maksim@modelproof.ai
  5. Use Gmail app on iPhone

### Option 2: Microsoft 365
- **Cost**: $6/month per user
- **Benefits**: Outlook integration, Office apps included
- **Setup**: Similar to Google Workspace

### Option 3: Domain Email Forwarding (Cheapest)
- **Cost**: $1-3/month
- **Providers**: Namecheap, GoDaddy, Cloudflare
- **How it works**: 
  - maksim@modelproof.ai forwards to your personal email
  - You can send emails from maksim@modelproof.ai through your email client
  - Set up "Send As" in Gmail/iPhone Mail

### Option 4: ProtonMail Business
- **Cost**: $8/month per user
- **Benefits**: Enhanced security and privacy
- **Good for**: High-security business communications

## Recommended Next Steps

1. **Immediate**: Test the current SendGrid setup with your API key
2. **Short-term**: Set up Google Workspace for maksim@modelproof.ai
3. **Long-term**: Consider adding team@modelproof.ai, support@modelproof.ai as you grow

## Environment Variables Needed
- `SENDGRID_API_KEY`: Your SendGrid API key
- `EMAIL_FROM`: noreply@modelproof.ai (or your verified SendGrid sender)
- `CONTACT_EMAIL`: contact@modelproof.ai
- `CAREERS_EMAIL`: careers@modelproof.ai