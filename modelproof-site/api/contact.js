// Simple Node.js serverless function for contact form using Resend
import { Resend } from 'resend';

// Simple email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Simple validation
const validateContactData = (data) => {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    throw new Error('Name is required');
  }
  if (!data.email || typeof data.email !== 'string' || !isValidEmail(data.email)) {
    throw new Error('Valid email is required');
  }
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    throw new Error('Message is required');
  }
  
  return {
    name: data.name.trim(),
    email: data.email.trim(),
    company: data.company ? data.company.trim() : '',
    message: data.message.trim()
  };
};

const sendEmail = async (submission) => {
  if (!process.env.RESEND_API_KEY) {
    console.log("Resend API key not configured");
    return false;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'ModelProof Contact <contact@modelproof.ai>',
      to: ['contact@modelproof.ai'],
      replyTo: submission.email,
      subject: `New Contact Form Submission from ${submission.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Company:</strong> ${submission.company || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${submission.message}</p>
        <hr>
        <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return false;
    }

    console.log("Email sent successfully:", data);
    return true;
  } catch (error) {
    console.error("Email error:", error);
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
      status: "Contact API is running with Resend",
      hasApiKey: !!process.env.RESEND_API_KEY,
      timestamp: new Date().toISOString()
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = validateContactData(req.body);
    const submission = { ...data, id: Date.now() };
    await sendEmail(submission);
    
    return res.json({ 
      success: true, 
      message: "Contact form submitted successfully",
      id: submission.id 
    });
  } catch (error) {
    return res.status(500).json({ 
      error: error.message || 'Server error',
      timestamp: new Date().toISOString()
    });
  }
}