import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import axios from 'axios';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

function sanitizeText(text) {
  if (typeof text !== 'string') throw new Error('Text must be a string');
  if (text.length > 20000) throw new Error('Text exceeds maximum length of 20,000 characters');
  return text.trim();
}

async function authenticateApiKey(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const apiKey = authHeader.replace('Bearer ', '');
  
  try {
    const org = await prisma.organization.findUnique({
      where: { api_key: apiKey }
    });

    if (!org) {
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
      return res.status(429).json({ 
        error: 'Rate limit exceeded',
        message: 'Free tier limited to 20 requests per day. Upgrade to paid plan for unlimited access.',
        requests_made: org.requests_made,
        limit: 20
      });
    }

    req.organization = org;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function incrementRequestCount(orgId) {
  await prisma.organization.update({
    where: { id: orgId },
    data: { requests_made: { increment: 1 } }
  });
}

function adminOnly(req, res, next) {
  const passcode = req.headers['x-admin-passcode'];
  
  if (!passcode || passcode !== process.env.ADMIN_PASSCODE) {
    return res.status(403).json({ error: 'Forbidden - Invalid or missing X-Admin-Passcode header' });
  }
  
  next();
}

app.post('/api/v1/scan', authenticateApiKey, async (req, res) => {
  try {
    const { text, bias_types } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const sanitizedText = sanitizeText(text);
    const biasTypes = Array.isArray(bias_types) ? bias_types : [
      'gender', 'race', 'age', 'disability', 'culture', 'political', 
      'religious', 'lgbtq', 'socioeconomic', 'truth_seeking', 
      'ideological_neutrality', 'intersectional', 'language_tone'
    ];

    const apiUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}/api/biasradar/scan`
      : 'http://localhost:5328/api/biasradar/scan';

    const response = await axios.post(apiUrl, {
      text: sanitizedText,
      bias_types: biasTypes
    }, {
      timeout: 30000
    });

    await incrementRequestCount(req.organization.id);

    res.json({
      success: true,
      data: response.data,
      requests_remaining: req.organization.is_paid 
        ? 'unlimited' 
        : Math.max(0, 20 - (req.organization.requests_made + 1))
    });

  } catch (error) {
    console.error('Scan error:', error.message);
    res.status(500).json({ 
      error: 'Failed to scan text',
      message: error.response?.data?.message || error.message 
    });
  }
});

app.post('/api/v1/fix', authenticateApiKey, async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const sanitizedText = sanitizeText(text);

    const apiUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}/api/biasradar/fix`
      : 'http://localhost:5328/api/biasradar/fix';

    const response = await axios.post(apiUrl, {
      text: sanitizedText,
      bias_types: [
        'gender', 'race', 'age', 'disability', 'culture', 'political', 
        'religious', 'lgbtq', 'socioeconomic', 'truth_seeking', 
        'ideological_neutrality', 'intersectional', 'language_tone'
      ]
    }, {
      timeout: 60000
    });

    await incrementRequestCount(req.organization.id);

    res.json({
      success: true,
      data: response.data,
      requests_remaining: req.organization.is_paid 
        ? 'unlimited' 
        : Math.max(0, 20 - (req.organization.requests_made + 1))
    });

  } catch (error) {
    console.error('Fix error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fix text',
      message: error.response?.data?.message || error.message 
    });
  }
});

app.post('/api/v1/register', adminOnly, async (req, res) => {
  try {
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

    res.json({
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
    console.error('Register error:', error);
    res.status(500).json({ error: 'Failed to register organization' });
  }
});

app.post('/api/v1/revoke', adminOnly, async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const organization = await prisma.organization.delete({
      where: { email }
    });

    res.json({
      success: true,
      message: `API key for ${organization.name} (${email}) has been revoked`
    });

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Organization not found' });
    }
    console.error('Revoke error:', error);
    res.status(500).json({ error: 'Failed to revoke API key' });
  }
});

app.patch('/api/v1/upgrade', adminOnly, async (req, res) => {
  try {
    const { email, is_paid } = req.body;
    
    if (!email || typeof is_paid !== 'boolean') {
      return res.status(400).json({ error: 'Email and is_paid (boolean) are required' });
    }

    const organization = await prisma.organization.update({
      where: { email },
      data: { is_paid }
    });

    res.json({
      success: true,
      organization: {
        id: organization.id,
        name: organization.name,
        email: organization.email,
        is_paid: organization.is_paid
      }
    });

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Organization not found' });
    }
    console.error('Upgrade error:', error);
    res.status(500).json({ error: 'Failed to update organization' });
  }
});

app.get('/api/dashboard', adminOnly, async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany({
      orderBy: { created_at: 'desc' }
    });

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BiasRadar API Admin Dashboard</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      padding: 2rem;
    }
    .container { max-width: 1400px; margin: 0 auto; }
    h1 {
      font-size: 2rem;
      margin-bottom: 2rem;
      color: #00D4FF;
    }
    table {
      width: 100%;
      background: #1e293b;
      border-radius: 8px;
      overflow: hidden;
      border-collapse: collapse;
    }
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #334155;
    }
    th {
      background: #1e40af;
      color: white;
      font-weight: 600;
    }
    tr:hover { background: #2d3748; }
    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .badge-free { background: #94a3b8; color: #0f172a; }
    .badge-paid { background: #10b981; color: white; }
    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      margin-right: 0.5rem;
    }
    .btn-upgrade { background: #10b981; color: white; }
    .btn-downgrade { background: #f59e0b; color: white; }
    .btn-revoke { background: #ef4444; color: white; }
    .btn:hover { opacity: 0.8; }
    .api-key {
      font-family: monospace;
      font-size: 0.875rem;
      background: #334155;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .stat-card {
      background: #1e293b;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #00D4FF;
    }
    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: #00D4FF;
    }
    .stat-label {
      color: #94a3b8;
      margin-top: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎯 BiasRadar API Admin Dashboard</h1>
    
    <div class="stats">
      <div class="stat-card">
        <div class="stat-value">${organizations.length}</div>
        <div class="stat-label">Total Organizations</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${organizations.filter(o => o.is_paid).length}</div>
        <div class="stat-label">Paid Customers</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${organizations.reduce((sum, o) => sum + o.requests_made, 0)}</div>
        <div class="stat-label">Total Requests Today</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>API Key</th>
          <th>Plan</th>
          <th>Requests</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${organizations.map(org => `
          <tr>
            <td><strong>${org.name}</strong></td>
            <td>${org.email}</td>
            <td><span class="api-key">${org.api_key.substring(0, 20)}...</span></td>
            <td><span class="badge ${org.is_paid ? 'badge-paid' : 'badge-free'}">${org.is_paid ? 'PAID' : 'FREE'}</span></td>
            <td>${org.requests_made}${org.is_paid ? '' : ' / 20'}</td>
            <td>${new Date(org.created_at).toLocaleDateString()}</td>
            <td>
              <button class="btn ${org.is_paid ? 'btn-downgrade' : 'btn-upgrade'}" onclick="togglePaid('${org.email}', ${!org.is_paid})">
                ${org.is_paid ? 'Downgrade' : 'Upgrade'}
              </button>
              <button class="btn btn-revoke" onclick="revokeKey('${org.email}', '${org.name}')">Revoke</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <script>
    const passcode = new URLSearchParams(window.location.search).get('passcode');

    async function togglePaid(email, isPaid) {
      if (!confirm(\`Are you sure you want to \${isPaid ? 'upgrade' : 'downgrade'} this organization?\`)) return;
      
      try {
        const res = await fetch('/v1/upgrade', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Passcode': passcode
          },
          body: JSON.stringify({ email, is_paid: isPaid })
        });

        if (res.ok) {
          alert('Organization updated successfully!');
          location.reload();
        } else {
          const error = await res.json();
          alert('Error: ' + error.error);
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }

    async function revokeKey(email, name) {
      if (!confirm(\`Are you sure you want to REVOKE the API key for \${name}? This action cannot be undone.\`)) return;
      
      try {
        const res = await fetch('/v1/revoke', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Passcode': passcode
          },
          body: JSON.stringify({ email })
        });

        if (res.ok) {
          alert('API key revoked successfully!');
          location.reload();
        } else {
          const error = await res.json();
          alert('Error: ' + error.error);
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  </script>
</body>
</html>
    `;

    res.send(html);

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).send('Internal server error');
  }
});

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'BiasRadar API',
    version: '1.0.0',
    description: 'Professional bias detection and text fixing API by ModelProof Technologies. Detect bias across 13 dimensions and automatically fix biased content using AI.',
    contact: {
      name: 'ModelProof Technologies',
      url: 'https://modelproof.ai',
      email: 'support@modelproof.ai'
    }
  },
  servers: [
    {
      url: 'https://modelproof.ai/api',
      description: 'Production server'
    },
    {
      url: 'http://localhost:3001',
      description: 'Development server'
    }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'API_KEY',
        description: 'Enter your BiasRadar API key (format: bdr_xxxxx...)'
      }
    },
    schemas: {
      ScanRequest: {
        type: 'object',
        required: ['text'],
        properties: {
          text: {
            type: 'string',
            description: 'Text to analyze for bias (max 20,000 characters)',
            example: 'The chairman should ensure all employees are treated fairly.'
          },
          bias_types: {
            type: 'array',
            description: 'Optional array of specific bias types to check. If not provided, all types are checked.',
            items: {
              type: 'string',
              enum: ['gender', 'race', 'age', 'disability', 'culture', 'political', 'religious', 'lgbtq', 'socioeconomic', 'truth_seeking', 'ideological_neutrality', 'intersectional', 'language_tone']
            },
            example: ['gender', 'race', 'age']
          }
        }
      },
      FixRequest: {
        type: 'object',
        required: ['text'],
        properties: {
          text: {
            type: 'string',
            description: 'Biased text to fix using AI (max 20,000 characters)',
            example: 'The chairman should ensure all employees are treated fairly.'
          }
        }
      },
      ScanResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean'
          },
          data: {
            type: 'object',
            properties: {
              biases_detected: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    type: { type: 'string' },
                    severity: { type: 'string' },
                    text: { type: 'string' },
                    position: { type: 'object' },
                    suggestion: { type: 'string' }
                  }
                }
              },
              summary: {
                type: 'object',
                properties: {
                  total_issues: { type: 'integer' },
                  by_type: { type: 'object' },
                  overall_score: { type: 'number' }
                }
              }
            }
          },
          requests_remaining: {
            type: 'string',
            description: 'Number of requests remaining today (or "unlimited" for paid plans)'
          }
        }
      },
      FixResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean'
          },
          data: {
            type: 'object',
            properties: {
              original_text: { type: 'string' },
              fixed_text: { type: 'string' },
              changes_made: {
                type: 'array',
                items: { type: 'string' }
              }
            }
          },
          requests_remaining: {
            type: 'string'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Error message'
          },
          message: {
            type: 'string',
            description: 'Additional error details'
          }
        }
      }
    }
  },
  security: [
    {
      BearerAuth: []
    }
  ],
  paths: {
    '/v1/scan': {
      post: {
        summary: 'Scan text for bias',
        description: 'Analyze text for bias across 13 dimensions including gender, race, age, disability, culture, political, religious, LGBTQ+, socioeconomic, truth-seeking, ideological neutrality, intersectional, and language & tone.',
        tags: ['Bias Detection'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ScanRequest'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Successful scan',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ScanResponse'
                }
              }
            }
          },
          '400': {
            description: 'Bad request - invalid input',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          },
          '429': {
            description: 'Rate limit exceeded (free tier: 20 requests/day)',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          }
        }
      }
    },
    '/v1/fix': {
      post: {
        summary: 'Fix biased text using AI',
        description: 'Automatically remove bias from text using OpenAI GPT-4. Returns the original text and AI-generated bias-free version.',
        tags: ['Bias Fixing'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/FixRequest'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Successful fix',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/FixResponse'
                }
              }
            }
          },
          '400': {
            description: 'Bad request - invalid input',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - invalid API key',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          },
          '429': {
            description: 'Rate limit exceeded',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                }
              }
            }
          }
        }
      }
    }
  }
};

const swaggerOptions = {
  customCss: `
    .swagger-ui { background: #0f172a; }
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info { margin: 20px 0; }
    .swagger-ui .info .title { color: #00D4FF; }
    .swagger-ui .scheme-container { background: #1e293b; }
    .swagger-ui .opblock { background: #1e293b; border-color: #334155; }
    .swagger-ui .opblock-summary { background: #1e40af; }
    .swagger-ui .opblock .opblock-section-header { background: #1e40af; }
    .swagger-ui .btn.authorize { background: #10b981; border-color: #10b981; }
    .swagger-ui .response-col_status { color: #10b981; }
  `,
  customSiteTitle: 'BiasRadar API Documentation'
};

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.get('/api', (req, res) => {
  res.json({
    name: 'BiasRadar API',
    version: '1.0.0',
    description: 'Professional bias detection API by ModelProof Technologies',
    documentation: '/api/docs',
    endpoints: {
      scan: 'POST /api/v1/scan',
      fix: 'POST /api/v1/fix'
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ BiasRadar API running on port ${PORT}`);
  console.log(`📚 Documentation: http://localhost:${PORT}/docs`);
  console.log(`🔧 Admin Dashboard: http://localhost:${PORT}/dashboard?passcode=${process.env.ADMIN_PASSCODE}`);
});
