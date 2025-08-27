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
  console.log("Attempting to send email notification...");
  
  if (!process.env.SENDGRID_API_KEY) {
    console.log("SendGrid API key not configured, skipping email notification");
    return false;
  }

  try {
    // Dynamic import to avoid module issues
    const { default: sgMail } = await import('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: process.env.CONTACT_EMAIL || "contact@modelproof.ai",
      from: process.env.EMAIL_FROM || "maksim@modelproof.ai",
      replyTo: submission.email,
      subject: `New Contact Form Submission from ${submission.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Company:</strong> ${submission.company || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${submission.message}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    console.log("Sending email with config:", { 
      to: msg.to, 
      from: msg.from, 
      subject: msg.subject 
    });
    
    await sgMail.send(msg);
    console.log("Email notification sent successfully");
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
      status: "Contact API is running",
      hasApiKey: !!process.env.SENDGRID_API_KEY,
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/contact", async (req, res) => {
    try {
      console.log("Contact form submission received:", req.body);
      console.log("Environment check - SENDGRID_API_KEY available:", !!process.env.SENDGRID_API_KEY);
      
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