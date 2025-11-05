# BiasRadar API

Professional bias detection and text fixing API by ModelProof Technologies.

## Features

- 🔍 **Bias Detection**: Scan text across 13 dimensions
- 🤖 **AI-Powered Fixing**: Automatically remove bias using OpenAI GPT-4
- 🔐 **API Key Authentication**: Secure Bearer token authentication
- 📊 **Rate Limiting**: 20 requests/day free, unlimited for paid plans
- 📚 **Swagger Documentation**: Interactive API docs at `/api/docs`
- 🎯 **Admin Dashboard**: Manage organizations at `/api/dashboard`

## Setup

1. Install dependencies:
```bash
cd api
npm install
```

2. Set up environment variables:
The API uses the existing Postgres database (`DATABASE_URL` from the main app). In production, Vercel automatically provides this. For local development, ensure your `.env` file has:
```env
DATABASE_URL="postgresql://user:password@host/database"
ADMIN_PASSCODE="changeme123"
JWT_SECRET="superlongrandomstring1234567890abcdefghijklmnopqrstuvwxyz"
```

3. Initialize database (creates Organization table):
```bash
npx prisma generate
npx prisma db push  # Only needed once to create the table
```

4. Start development server:
```bash
npm run dev
```

## API Endpoints

### Public Endpoints (Require API Key)

#### POST `/api/scan`
Scan text for bias across 13 dimensions.

**Headers:**
```
Authorization: Bearer bdr_xxxxx...
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "The chairman should ensure all employees are treated fairly.",
  "bias_types": ["gender", "race", "age"]  // Optional
}
```

**Example:**
```bash
curl -X POST https://www.modelproof.ai/api/scan \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "Your text here"}'
```

#### POST `/api/fix`
Fix biased text using AI.

**Headers:**
```
Authorization: Bearer bdr_xxxxx...
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "The chairman should ensure all employees are treated fairly."
}
```

**Example:**
```bash
curl -X POST https://www.modelproof.ai/api/fix \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "Your text here"}'
```

### Admin Endpoints (Require Admin Passcode)

#### POST `/api/v1/register`
Register a new organization and generate API key.

**Headers:**
```
X-Admin-Passcode: changeme123
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Acme Corporation",
  "email": "contact@acme.com"
}
```

**Response:**
```json
{
  "success": true,
  "organization": {
    "id": "uuid",
    "name": "Acme Corporation",
    "email": "contact@acme.com",
    "api_key": "bdr_xxxxx...",
    "is_paid": false,
    "created_at": "2025-11-05T..."
  }
}
```

#### POST `/api/v1/revoke`
Revoke an organization's API key.

**Headers:**
```
X-Admin-Passcode: changeme123
```

**Request Body:**
```json
{
  "email": "contact@acme.com"
}
```

#### PATCH `/api/v1/upgrade`
Upgrade/downgrade organization plan.

**Headers:**
```
X-Admin-Passcode: changeme123
```

**Request Body:**
```json
{
  "email": "contact@acme.com",
  "is_paid": true
}
```

## Testing

### 1. Register a Test Organization

```bash
curl -X POST http://localhost:3001/api/v1/register \
  -H "X-Admin-Passcode: changeme123" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Org","email":"test@example.com"}'
```

Copy the `api_key` from the response.

### 2. Test Scan Endpoint

```bash
curl -X POST http://localhost:3001/api/v1/scan \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text":"The chairman should ensure his staff are well-trained."}'
```

### 3. Test Fix Endpoint

```bash
curl -X POST http://localhost:3001/api/v1/fix \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text":"The chairman should ensure his staff are well-trained."}'
```

### 4. Access Swagger Documentation

Open in browser:
```
http://localhost:3001/api/docs
```

### 5. Access Admin Dashboard

Open in browser (will prompt for passcode):
```
http://localhost:3001/api/dashboard
```

Enter passcode when prompted: `changeme123`

**Note**: For security, the passcode must be provided via the `X-Admin-Passcode` header for API calls, or entered in the browser prompt for dashboard access.

## Deployment to Vercel

The API is designed to work as Vercel serverless functions with Postgres (Neon):

1. **Database**: Uses the existing Postgres database via `DATABASE_URL` environment variable
2. **Prisma**: Automatically generates client on deployment
3. **First Deploy**: Run `npx prisma db push` to create the Organization table
4. All endpoints will be accessible at:
   - `https://modelproof.ai/api/v1/scan`
   - `https://modelproof.ai/api/v1/fix`
   - `https://modelproof.ai/api/docs`
   - `https://modelproof.ai/api/dashboard` (prompts for passcode)

## Rate Limiting

- **Free Tier**: 20 requests per day
- **Paid Tier**: Unlimited requests
- Limits reset daily based on `last_reset` timestamp

## Security

- ✅ API key authentication using Bearer tokens
- ✅ Admin endpoints protected with passcode
- ✅ Input sanitization (max 20,000 characters)
- ✅ CORS enabled for all origins
- ✅ SQL injection protection via Prisma ORM

## Database Schema

**Provider**: PostgreSQL (Neon via Vercel)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Organization {
  id            String   @id @default(uuid())
  name          String
  email         String   @unique
  is_paid       Boolean  @default(false)
  api_key       String   @unique
  requests_made Int      @default(0)
  last_reset    DateTime @default(now())
  created_at    DateTime @default(now())
}
```

**Security Features**:
- ✅ Persistent storage (Postgres, not SQLite)
- ✅ Header-based admin authentication (no passcode in URL)
- ✅ Works correctly on Vercel serverless
- ✅ Automatic daily rate limit reset

## Support

For API support, contact: support@modelproof.ai
