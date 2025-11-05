import { randomBytes } from 'crypto';
import prisma from './lib/db.js';
import { checkAdminPasscode } from './lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Passcode');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    checkAdminPasscode(req);

    if (req.method === 'GET') {
      const organizations = await prisma.organization.findMany({
        orderBy: { created_at: 'desc' }
      });
      return res.json({ success: true, organizations });
    }

    if (req.method === 'POST') {
      const { name, email, action } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }

      if (action === 'revoke') {
        const deleted = await prisma.organization.delete({
          where: { email }
        });
        return res.json({ success: true, message: 'API key revoked', organization: deleted });
      }

      const existingOrg = await prisma.organization.findUnique({
        where: { email }
      });

      if (existingOrg) {
        return res.status(409).json({ error: 'Organization with this email already exists' });
      }

      const apiKey = 'bdr_' + randomBytes(32).toString('hex');
      const organization = await prisma.organization.create({
        data: {
          name,
          email,
          api_key: apiKey,
          is_paid: false,
          requests_made: 0
        }
      });

      return res.status(201).json({ success: true, organization });
    }

    if (req.method === 'PATCH') {
      const { email, is_paid } = req.body;

      if (!email || typeof is_paid !== 'boolean') {
        return res.status(400).json({ error: 'Email and is_paid (boolean) are required' });
      }

      const updated = await prisma.organization.update({
        where: { email },
        data: { is_paid }
      });

      return res.json({ success: true, organization: updated });
    }

    if (req.method === 'DELETE') {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const deleted = await prisma.organization.delete({
        where: { email }
      });

      return res.json({ success: true, message: 'Organization deleted', organization: deleted });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    if (error.status === 403) {
      return res.status(403).json({ error: error.message });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Organization not found' });
    }
    console.error('Admin endpoint error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
