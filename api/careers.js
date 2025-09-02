// Node.js serverless function for careers form with file upload using Resend
import { Resend } from 'resend';

// Simple email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Parse multipart form data (simplified for file upload)
const parseFormData = async (req) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        const buffer = Buffer.concat(chunks);
        const boundary = req.headers['content-type']?.split('boundary=')[1];
        
        if (!boundary) {
          return reject(new Error('No boundary found'));
        }
        
        const parts = buffer.toString().split(`--${boundary}`);
        const fields = {};
        let resume = null;
        
        for (const part of parts) {
          if (part.includes('Content-Disposition: form-data')) {
            const nameMatch = part.match(/name="([^"]+)"/);
            if (!nameMatch) continue;
            
            const fieldName = nameMatch[1];
            const contentStart = part.indexOf('\r\n\r\n') + 4;
            const contentEnd = part.lastIndexOf('\r\n');
            
            if (contentStart < contentEnd) {
              const content = part.slice(contentStart, contentEnd);
              
              if (fieldName === 'resume' && part.includes('filename=')) {
                const filenameMatch = part.match(/filename="([^"]+)"/);
                resume = {
                  filename: filenameMatch ? filenameMatch[1] : 'resume.pdf',
                  content: Buffer.from(content, 'binary'),
                  size: content.length
                };
              } else {
                fields[fieldName] = content;
              }
            }
          }
        }
        
        resolve({ fields, resume });
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
};

// Simple validation
const validateCareerData = (data) => {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    throw new Error('Name is required');
  }
  if (!data.email || typeof data.email !== 'string' || !isValidEmail(data.email)) {
    throw new Error('Valid email is required');
  }
  
  return {
    name: data.name.trim(),
    email: data.email.trim(),
    message: data.message ? data.message.trim() : ''
  };
};

const sendCareerEmail = async (submission, resume) => {
  if (!process.env.RESEND_API_KEY) {
    console.log("Resend API key not configured");
    return false;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Prepare email attachments
    const attachments = [];
    if (resume) {
      attachments.push({
        filename: resume.filename,
        content: resume.content,
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'ModelProof Careers <careers@modelproof.ai>',
      to: ['careers@modelproof.ai'],
      replyTo: submission.email,
      subject: `New Job Application from ${submission.name}`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Name:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Message:</strong></p>
        <p>${submission.message || 'No additional message provided'}</p>
        <p><strong>Resume:</strong> ${resume ? `Attached (${resume.filename})` : 'No resume attached'}</p>
        <hr>
        <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
      `,
      attachments: attachments
    });

    if (error) {
      console.error("Resend error:", error);
      return false;
    }

    console.log("Career email sent successfully:", data);
    return true;
  } catch (error) {
    console.error("Career email error:", error);
    return false;
  }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.json({
      status: "Careers API is running with Resend",
      hasApiKey: !!process.env.RESEND_API_KEY,
      timestamp: new Date().toISOString()
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fields, resume } = await parseFormData(req);
    const data = validateCareerData(fields);
    const submission = { ...data, id: Date.now() };
    
    const emailSent = await sendCareerEmail(submission, resume);
    
    if (!emailSent) {
      return res.status(500).json({ 
        error: 'Failed to send email',
        timestamp: new Date().toISOString()
      });
    }
    
    return res.json({ 
      success: true, 
      message: "Application submitted successfully",
      id: submission.id 
    });
  } catch (error) {
    console.error('Careers API error:', error);
    return res.status(500).json({ 
      error: error.message || 'Server error',
      timestamp: new Date().toISOString()
    });
  }
}