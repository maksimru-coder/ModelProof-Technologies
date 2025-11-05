import prisma from '../lib/db.js';
import { checkAdminPasscode } from '../lib/auth.js';

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
    checkAdminPasscode(req);
    
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const organization = await prisma.organization.delete({
      where: { email }
    });

    return res.json({
      success: true,
      message: `API key for ${organization.name} (${email}) has been revoked`
    });

  } catch (error) {
    if (error.status === 403) {
      return res.status(403).json({ error: error.message });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Organization not found' });
    }
    console.error('Revoke error:', error);
    return res.status(500).json({ error: 'Failed to revoke API key' });
  }
}
