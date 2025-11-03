import { contactSubmissions, type ContactSubmission, type InsertContact } from "@shared/schema";

export interface IStorage {
  createContactSubmission(submission: InsertContact): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private submissions: Map<number, ContactSubmission>;
  private currentId: number;

  constructor() {
    this.submissions = new Map();
    this.currentId = 1;
  }

  async createContactSubmission(submission: InsertContact): Promise<ContactSubmission> {
    const id = this.currentId++;
    const contactSubmission: ContactSubmission = {
      ...submission,
      id,
      createdAt: new Date()
    };
    this.submissions.set(id, contactSubmission);
    return contactSubmission;
  }
}

export const storage = new MemStorage();
