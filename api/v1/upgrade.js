import prisma from '../lib/db.js';
import { checkAdminPasscode } from '../lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Passcode');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    checkAdminPasscode(req);
    
    const { email, is_paid } = req.body;
    
    if (!email || typeof is_paid !== 'boolean') {
      return res.status(400).json({ error: 'Email and is_paid (boolean) are required' });
    }

    const organization = await prisma.organization.update({
      where: { email },
      data: { is_paid }
    });

    return res.json({
      success: true,
      organization: {
        id: organization.id,
        name: organization.name,
        email: organization.email,
        is_paid: organization.is_paid
      }
    });

  } catch (error) {
    if (error.status === 403) {
      return res.status(403).json({ error: error.message });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Organization not found' });
    }
    console.error('Upgrade error:', error);
    return res.status(500).json({ error: 'Failed to update organization' });
  }
}
