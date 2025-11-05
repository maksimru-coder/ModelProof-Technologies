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
        const { name, email, action, plan_type } = req.body;

        if (action === 'revoke') {
          if (!email) {
            await prisma.$disconnect();
            return res.status(400).json({ error: 'Email is required for revoke action' });
          }
          const deleted = await prisma.organization.delete({
            where: { email }
          });
          await prisma.$disconnect();
          return res.json({ success: true, message: 'API key revoked', organization: deleted });
        }

        if (!name || !email) {
          await prisma.$disconnect();
          return res.status(400).json({ error: 'Name and email are required' });
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
        
        const planTypeValue = plan_type || 'free';
        const isPaid = planTypeValue === 'paid';
        
        const now = new Date();
        const demoExpiresAt = planTypeValue === 'demo' 
          ? new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000)
          : null;
        
        const organization = await prisma.organization.create({
          data: {
            name,
            email,
            api_key: apiKey,
            is_paid: isPaid,
            plan_type: planTypeValue,
            requests_made: 0,
            demo_expires_at: demoExpiresAt
          }
        });

        await prisma.$disconnect();
        return res.status(201).json({ success: true, organization });
      }

      if (req.method === 'PATCH') {
        const { email, is_paid, plan_type } = req.body;

        if (!email) {
          await prisma.$disconnect();
          return res.status(400).json({ error: 'Email is required' });
        }

        const updateData = {};
        
        if (plan_type !== undefined) {
          updateData.plan_type = plan_type;
          updateData.is_paid = plan_type === 'paid';
          
          if (plan_type === 'paid') {
            updateData.demo_expires_at = null;
          }
        } else if (typeof is_paid === 'boolean') {
          updateData.is_paid = is_paid;
          updateData.plan_type = is_paid ? 'paid' : 'free';
          
          if (is_paid) {
            updateData.demo_expires_at = null;
          }
        }

        if (Object.keys(updateData).length === 0) {
          await prisma.$disconnect();
          return res.status(400).json({ error: 'Either is_paid or plan_type must be provided' });
        }

        const updated = await prisma.organization.update({
          where: { email },
          data: updateData
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
