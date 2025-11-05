import { nanoid } from 'nanoid';
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
    
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const existingOrg = await prisma.organization.findUnique({
      where: { email }
    });

    if (existingOrg) {
      return res.status(409).json({ error: 'Organization with this email already exists' });
    }

    const apiKey = 'bdr_' + nanoid(32);

    const organization = await prisma.organization.create({
      data: {
        name,
        email,
        api_key: apiKey,
        is_paid: false,
        requests_made: 0,
        last_reset: new Date()
      }
    });

    return res.json({
      success: true,
      organization: {
        id: organization.id,
        name: organization.name,
        email: organization.email,
        api_key: organization.api_key,
        is_paid: organization.is_paid,
        created_at: organization.created_at
      }
    });

  } catch (error) {
    if (error.status === 403) {
      return res.status(403).json({ error: error.message });
    }
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Failed to register organization' });
  }
}
