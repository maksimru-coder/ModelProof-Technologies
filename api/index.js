// Simple test endpoint to verify Vercel function deployment
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.json({
    status: "API is working",
    method: req.method,
    path: req.url,
    timestamp: new Date().toISOString(),
    hasResendKey: !!process.env.RESEND_API_KEY
  });
}