import prisma from '../lib/db.js';
import { checkAdminPasscode } from '../lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Passcode');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    checkAdminPasscode(req);
    
    const organizations = await prisma.organization.findMany({
      orderBy: { created_at: 'desc' }
    });

    return res.json({ 
      success: true,
      organizations 
    });

  } catch (error) {
    if (error.status === 403) {
      return res.status(403).json({ error: error.message });
    }
    console.error('Get organizations error:', error);
    return res.status(500).json({ error: 'Failed to fetch organizations' });
  }
}
