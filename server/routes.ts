import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import nodemailer from "nodemailer";

// Email configuration
const createEmailTransporter = () => {
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_PORT === "465",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return null;
};

const sendNotificationEmail = async (submission: any, isCareer = false) => {
  const transporter = createEmailTransporter();
  if (!transporter) return;

  const toEmail = isCareer ? 
    (process.env.CAREERS_EMAIL || "careers@modelproof.ai") : 
    (process.env.CONTACT_EMAIL || "contact@modelproof.ai");

  const subject = isCareer ? 
    `New Career Application from ${submission.name}` : 
    `New Contact Form Submission from ${submission.name}`;

  const htmlContent = isCareer ? `
    <h2>New Career Application</h2>
    <p><strong>Name:</strong> ${submission.name}</p>
    <p><strong>Email:</strong> ${submission.email}</p>
    <p><strong>Position:</strong> ${submission.position || 'Not specified'}</p>
    <p><strong>Experience:</strong> ${submission.experience || 'Not specified'}</p>
    <p><strong>Message:</strong></p>
    <p>${submission.message}</p>
    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
  ` : `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${submission.name}</p>
    <p><strong>Email:</strong> ${submission.email}</p>
    <p><strong>Company:</strong> ${submission.company || 'Not specified'}</p>
    <p><strong>Message:</strong></p>
    <p>${submission.message}</p>
    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: toEmail,
      subject: subject,
      html: htmlContent,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

export function registerRoutes(app: Express): Server {
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(data);
      
      // Send email notification
      await sendNotificationEmail(submission, false);
      
      res.json(submission);
    } catch (error) {
      res.status(400).json({ error: "Invalid submission data" });
    }
  });

  // Career form endpoint
  app.post("/api/careers", async (req, res) => {
    try {
      const data = req.body;
      
      // Send email notification for career applications
      await sendNotificationEmail(data, true);
      
      res.json({ success: true, message: "Application submitted successfully" });
    } catch (error) {
      res.status(400).json({ error: "Invalid application data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
