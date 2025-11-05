import axios from 'axios';
import { authenticateApiKey, incrementRequestCount, sanitizeText } from '../lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Passcode');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const org = await authenticateApiKey(req.headers.authorization);
    
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const sanitizedText = sanitizeText(text);

    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:5328';

    const response = await axios.post(`${baseUrl}/api/biasradar/fix`, {
      text: sanitizedText,
      bias_types: [
        'gender', 'race', 'age', 'disability', 'culture', 'political', 
        'religious', 'lgbtq', 'socioeconomic', 'truth_seeking', 
        'ideological_neutrality', 'intersectional', 'language_tone'
      ]
    }, {
      timeout: 60000
    });

    await incrementRequestCount(org.id);

    return res.json({
      success: true,
      data: response.data,
      requests_remaining: org.is_paid 
        ? 'unlimited' 
        : Math.max(0, 20 - (org.requests_made + 1))
    });

  } catch (error) {
    console.error('Fix error:', error.message);
    
    if (error.status === 401) {
      return res.status(401).json({ error: error.message });
    }
    if (error.status === 429) {
      return res.status(429).json({ error: error.message, ...error.details });
    }
    
    return res.status(500).json({ 
      error: 'Failed to fix text',
      message: error.response?.data?.message || error.message 
    });
  }
}
