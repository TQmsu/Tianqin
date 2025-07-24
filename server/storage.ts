import { users, profiles, publications, type User, type InsertUser, type Profile, type InsertProfile, type Publication, type InsertPublication } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProfile(): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(profile: Partial<InsertProfile>): Promise<Profile | undefined>;
  getPublications(): Promise<Publication[]>;
  createPublication(publication: InsertPublication): Promise<Publication>;
  updatePublication(id: number, publication: Partial<InsertPublication>): Promise<Publication | undefined>;
  deletePublication(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private profiles: Map<number, Profile>;
  private publications: Map<number, Publication>;
  private currentUserId: number;
  private currentProfileId: number;
  private currentPublicationId: number;

  constructor() {
    this.users = new Map();
    this.profiles = new Map();
    this.publications = new Map();
    this.currentUserId = 1;
    this.currentProfileId = 1;
    this.currentPublicationId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create a sample profile
    const sampleProfile: Profile = {
      id: 1,
      fullName: "Dr. Sarah Mitchell",
      position: "PhD Student in Computer Science",
      institution: "Stanford University",
      email: "sarah.mitchell@stanford.edu",
      linkedin: "https://www.linkedin.com/in/sarahmitchell",
      website: "https://sarahmitchell.github.io",
      researchInterests: "I specialize in machine learning applications for healthcare, with a focus on developing interpretable AI models for medical diagnosis and personalized treatment recommendations.",
      photoUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    };
    this.profiles.set(1, sampleProfile);

    // Create sample publications
    const samplePublications: Publication[] = [
      {
        id: 1,
        title: "Interpretable Deep Learning Models for Early Alzheimer's Detection Using Multi-Modal Brain Imaging",
        authors: "Sarah Mitchell, David Chen, Emily Rodriguez, Michael Thompson",
        venue: "Nature Machine Intelligence",
        year: 2024,
        doi: "10.1038/s42256-024-00001-x",
        pdfUrl: "#",
        publicationUrl: "#"
      },
      {
        id: 2,
        title: "Federated Learning Framework for Privacy-Preserving Healthcare Analytics",
        authors: "Sarah Mitchell, Jennifer Liu, Robert Garcia",
        venue: "Proceedings of the 41st International Conference on Machine Learning (ICML)",
        year: 2023,
        doi: "10.48550/arXiv.2023.00001",
        pdfUrl: "#",
        publicationUrl: "#"
      },
      {
        id: 3,
        title: "Attention Mechanisms in Medical Image Segmentation: A Comprehensive Survey",
        authors: "Kevin Park, Sarah Mitchell, Anna Kowalski, James Wilson",
        venue: "Medical Image Analysis",
        year: 2023,
        doi: "10.1016/j.media.2023.00001",
        pdfUrl: "#",
        publicationUrl: "#"
      },
      {
        id: 4,
        title: "Transfer Learning for Small Dataset Medical Image Classification",
        authors: "Sarah Mitchell, Thomas Anderson, Lisa Park",
        venue: "IEEE Transactions on Medical Imaging",
        year: 2022,
        doi: "10.1109/TMI.2022.00001",
        pdfUrl: "#",
        publicationUrl: "#"
      },
      {
        id: 5,
        title: "Explainable AI in Healthcare: Current Challenges and Future Directions",
        authors: "Maria Rodriguez, Sarah Mitchell, Christopher Lee, Daniel Kim",
        venue: "Artificial Intelligence in Medicine",
        year: 2022,
        doi: "10.1016/j.artmed.2022.00001",
        pdfUrl: null,
        publicationUrl: "#"
      }
    ];

    samplePublications.forEach(pub => this.publications.set(pub.id, pub));
    this.currentPublicationId = 6;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProfile(): Promise<Profile | undefined> {
    // For simplicity, return the first profile
    return Array.from(this.profiles.values())[0];
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const id = this.currentProfileId++;
    const profile: Profile = { ...insertProfile, id };
    this.profiles.set(id, profile);
    return profile;
  }

  async updateProfile(profileUpdate: Partial<InsertProfile>): Promise<Profile | undefined> {
    const existingProfile = Array.from(this.profiles.values())[0];
    if (!existingProfile) return undefined;
    
    const updatedProfile: Profile = { ...existingProfile, ...profileUpdate };
    this.profiles.set(existingProfile.id, updatedProfile);
    return updatedProfile;
  }

  async getPublications(): Promise<Publication[]> {
    const pubs = Array.from(this.publications.values());
    // Sort by year descending (newest first)
    return pubs.sort((a, b) => b.year - a.year);
  }

  async createPublication(insertPublication: InsertPublication): Promise<Publication> {
    const id = this.currentPublicationId++;
    const publication: Publication = { ...insertPublication, id };
    this.publications.set(id, publication);
    return publication;
  }

  async updatePublication(id: number, publicationUpdate: Partial<InsertPublication>): Promise<Publication | undefined> {
    const existingPublication = this.publications.get(id);
    if (!existingPublication) return undefined;
    
    const updatedPublication: Publication = { ...existingPublication, ...publicationUpdate };
    this.publications.set(id, updatedPublication);
    return updatedPublication;
  }

  async deletePublication(id: number): Promise<boolean> {
    return this.publications.delete(id);
  }
}

export const storage = new MemStorage();
