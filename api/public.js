export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }

    const apiKey = authHeader.replace('Bearer ', '');
    
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    try {
      const org = await prisma.organization.findUnique({
        where: { api_key: apiKey }
      });

      if (!org) {
        await prisma.$disconnect();
        return res.status(401).json({ error: 'Invalid API key' });
      }

      const now = new Date();
      const daysSinceReset = (now - new Date(org.last_reset)) / (1000 * 60 * 60 * 24);
      
      if (daysSinceReset >= 1) {
        await prisma.organization.update({
          where: { id: org.id },
          data: { requests_made: 0, last_reset: now }
        });
        org.requests_made = 0;
      }

      if (!org.is_paid && org.requests_made >= 20) {
        await prisma.$disconnect();
        return res.status(429).json({ 
          error: 'Rate limit exceeded',
          message: 'Free tier limited to 20 requests per day. Upgrade to paid plan for unlimited access.',
          requests_made: org.requests_made,
          limit: 20
        });
      }

      const { text, bias_types } = req.body;

      if (!text) {
        await prisma.$disconnect();
        return res.status(400).json({ error: 'Text is required' });
      }

      if (typeof text !== 'string') {
        await prisma.$disconnect();
        return res.status(400).json({ error: 'Text must be a string' });
      }

      if (text.length > 20000) {
        await prisma.$disconnect();
        return res.status(400).json({ error: 'Text exceeds maximum length of 20,000 characters' });
      }

      const sanitizedText = text.trim();
      const action = req.url.includes('/fix') ? 'fix' : 'scan';
      
      const baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}`
        : 'https://modelproof.ai';
      
      const endpoint = action === 'fix' 
        ? `${baseUrl}/api/biasradar/fix`
        : `${baseUrl}/api/biasradar/scan`;

      const axios = (await import('axios')).default;
      const pythonResponse = await axios.post(endpoint, {
        text: sanitizedText,
        bias_types: bias_types || [
          'gender', 'race', 'age', 'disability', 'culture',
          'political', 'religious', 'lgbtq', 'socioeconomic',
          'truth_seeking', 'ideological_neutrality', 'intersectional', 'language_tone'
        ]
      }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 55000
      });

      await prisma.organization.update({
        where: { email: org.email },
        data: { requests_made: { increment: 1 } }
      });

      await prisma.$disconnect();

      return res.json({
        success: true,
        ...pythonResponse.data
      });

    } catch (dbError) {
      await prisma.$disconnect();
      throw dbError;
    }

  } catch (error) {
    console.error('API error:', error);
    
    if (error.response?.data) {
      return res.status(500).json({ 
        error: 'Bias detection service error',
        details: error.response.data.error || error.message
      });
    }
    
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
}
