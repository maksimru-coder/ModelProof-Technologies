import axios from 'axios';
import { authenticateApiKey, incrementRequestCount, sanitizeText } from './lib/auth.js';

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
    const organization = await authenticateApiKey(req);
    const action = req.url.includes('/fix') ? 'fix' : 'scan';
    
    const { text, bias_types } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const sanitizedText = sanitizeText(text);
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
    
    const endpoint = action === 'fix' 
      ? `${baseUrl}/api/biasradar/fix`
      : `${baseUrl}/api/biasradar/scan`;

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

    await incrementRequestCount(organization.email);

    return res.json({
      success: true,
      ...pythonResponse.data
    });

  } catch (error) {
    if (error.status === 401) {
      return res.status(401).json({ error: error.message });
    }
    if (error.status === 429) {
      return res.status(429).json({ error: error.message });
    }
    if (axios.isAxiosError(error)) {
      console.error('Python backend error:', error.response?.data || error.message);
      return res.status(500).json({ 
        error: 'Bias detection service error',
        details: error.response?.data?.error || error.message
      });
    }
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
