// Standalone contact API for serverless deployment
import type { Express } from "express";

// Simple email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Simple validation
const validateContactData = (data: any) => {
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

const sendEmail = async (submission: any) => {
  console.log("Attempting to send email notification with Resend...");
  
  if (!process.env.RESEND_API_KEY) {
    console.log("Resend API key not configured, skipping email notification");
    return false;
  }

  try {
    // Dynamic import for Resend
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'ModelProof Contact <maksim@modelproof.ai>',
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

    console.log("Email notification sent successfully with Resend:", data);
    return true;
  } catch (error) {
    console.error("Failed to send email notification:", error);
    return false;
  }
};

export function registerContactAPI(app: Express) {
  // Diagnostic endpoint to check environment
  app.get("/api/contact/status", (req, res) => {
    res.json({
      status: "Contact API is running with Resend",
      hasApiKey: !!process.env.RESEND_API_KEY,
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/contact", async (req, res) => {
    try {
      console.log("Contact form submission received:", req.body);
      console.log("Environment check - RESEND_API_KEY available:", !!process.env.RESEND_API_KEY);
      
      const data = validateContactData(req.body);
      console.log("Validation passed:", data);
      
      const submission = {
        ...data,
        id: Date.now(),
        createdAt: new Date()
      };
      
      const emailSent = await sendEmail(submission);
      console.log("Email notification result:", emailSent);
      
      res.json({ 
        success: true, 
        message: "Contact form submitted successfully",
        id: submission.id 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        error: "Server error occurred", 
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      });
    }
  });
}