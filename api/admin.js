export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Passcode');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const passcode = req.headers['x-admin-passcode'];
    const expectedPasscode = process.env.ADMIN_PASSCODE;

    if (!expectedPasscode) {
      return res.status(500).json({ 
        error: 'Server configuration error',
        details: 'ADMIN_PASSCODE environment variable not set in Vercel'
      });
    }

    if (!passcode || passcode !== expectedPasscode) {
      return res.status(403).json({ 
        error: 'Forbidden - Invalid or missing X-Admin-Passcode header' 
      });
    }

    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    try {
      if (req.method === 'GET') {
        const organizations = await prisma.organization.findMany({
          orderBy: { created_at: 'desc' }
        });
        await prisma.$disconnect();
        return res.json({ success: true, organizations });
      }

      if (req.method === 'POST') {
        const { name, email, action } = req.body;

        if (!name || !email) {
          await prisma.$disconnect();
          return res.status(400).json({ error: 'Name and email are required' });
        }

        if (action === 'revoke') {
          const deleted = await prisma.organization.delete({
            where: { email }
          });
          await prisma.$disconnect();
          return res.json({ success: true, message: 'API key revoked', organization: deleted });
        }

        const existingOrg = await prisma.organization.findUnique({
          where: { email }
        });

        if (existingOrg) {
          await prisma.$disconnect();
          return res.status(409).json({ error: 'Organization with this email already exists' });
        }

        const { randomBytes } = await import('crypto');
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

        await prisma.$disconnect();
        return res.status(201).json({ success: true, organization });
      }

      if (req.method === 'PATCH') {
        const { email, is_paid } = req.body;

        if (!email || typeof is_paid !== 'boolean') {
          await prisma.$disconnect();
          return res.status(400).json({ error: 'Email and is_paid (boolean) are required' });
        }

        const updated = await prisma.organization.update({
          where: { email },
          data: { is_paid }
        });

        await prisma.$disconnect();
        return res.json({ success: true, organization: updated });
      }

      await prisma.$disconnect();
      return res.status(405).json({ error: 'Method not allowed' });

    } catch (dbError) {
      await prisma.$disconnect();
      throw dbError;
    }

  } catch (error) {
    console.error('Admin endpoint error:', error);
    
    if (error.status === 403) {
      return res.status(403).json({ error: error.message });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Organization not found' });
    }
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Organization with this email already exists' });
    }
    
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
}
