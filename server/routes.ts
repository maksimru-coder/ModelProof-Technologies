import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import sgMail from "@sendgrid/mail";
import multer from "multer";
import { registerContactAPI } from "./contact-api";

// Extend Express Request type to include file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req: any, file: any, cb: any) => {
    // Allow only common resume file types
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
    }
  }
});

const sendNotificationEmail = async (submission: any, isCareer = false) => {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log("SendGrid API key not configured, skipping email notification");
      return false;
    }

    const toEmail = isCareer ? 
    (process.env.CAREERS_EMAIL || "careers@modelproof.ai") : 
    (process.env.CONTACT_EMAIL || "contact@modelproof.ai");

  // Use a verified sender email for SendGrid
  const fromEmail = process.env.EMAIL_FROM || "maksim@modelproof.ai";

  const subject = isCareer ? 
    `New Career Application from ${submission.name}` : 
    `New Contact Form Submission from ${submission.name}`;

  const htmlContent = isCareer ? `
    <h2>New Career Application</h2>
    <p><strong>Name:</strong> ${submission.name}</p>
    <p><strong>Email:</strong> ${submission.email}</p>
    <p><strong>Resume:</strong> ${submission.resumeFileName || 'Not provided'}</p>
    <p><strong>File Size:</strong> ${submission.resumeSize ? Math.round(submission.resumeSize / 1024) + ' KB' : 'N/A'}</p>
    <p><strong>File Type:</strong> ${submission.resumeType || 'N/A'}</p>
    <p><strong>Message:</strong></p>
    <p>${submission.message || 'No additional message provided'}</p>
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

  const msg = {
    to: toEmail,
    from: fromEmail,
    replyTo: submission.email, // This allows you to reply directly to the person who submitted the form
    subject: subject,
    html: htmlContent,
  };

  try {
    console.log("Sending email with config:", { to: toEmail, from: fromEmail, subject });
    const result = await sgMail.send(msg);
    console.log(`Email notification sent successfully from ${fromEmail} to ${toEmail}`, result);
    return true;
  } catch (error) {
    console.error("Failed to send email notification:", error);
    console.error("SendGrid error details:", JSON.stringify(error, null, 2));
    console.error("Please verify maksim@modelproof.ai as a sender in SendGrid dashboard");
    return false;
  }
  } catch (outerError) {
    console.error("Critical error in sendNotificationEmail:", outerError);
    return false;
  }
};

export function registerRoutes(app: Express): Server {
  // Use simplified contact API for better serverless compatibility
  registerContactAPI(app);

  // Career form endpoint with file upload
  app.post("/api/careers", upload.single('resume'), async (req: MulterRequest, res) => {
    try {
      const { name, email, message } = req.body;
      const resumeFile = req.file;

      if (!resumeFile) {
        return res.status(400).json({ error: "Resume file is required" });
      }

      const careerData = {
        name,
        email,
        message: message || '',
        resumeFileName: resumeFile.originalname,
        resumeSize: resumeFile.size,
        resumeType: resumeFile.mimetype
      };
      
      // Send email notification for career applications (gracefully handles missing API key)
      await sendNotificationEmail(careerData, true);
      
      res.json({ success: true, message: "Application submitted successfully" });
    } catch (error) {
      console.error("Career application error:", error);
      res.status(400).json({ error: "Invalid application data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
