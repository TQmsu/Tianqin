import { users, profiles, publications, type User, type InsertUser, type Profile, type InsertProfile, type Publication, type InsertPublication } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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



// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getProfile(): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).limit(1);
    return profile || undefined;
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const [profile] = await db
      .insert(profiles)
      .values(insertProfile)
      .returning();
    return profile;
  }

  async updateProfile(profileUpdate: Partial<InsertProfile>): Promise<Profile | undefined> {
    const existingProfile = await this.getProfile();
    if (!existingProfile) return undefined;
    
    const [updatedProfile] = await db
      .update(profiles)
      .set(profileUpdate)
      .where(eq(profiles.id, existingProfile.id))
      .returning();
    return updatedProfile;
  }

  async getPublications(): Promise<Publication[]> {
    const pubs = await db.select().from(publications);
    // Sort by year descending (newest first)
    return pubs.sort((a, b) => b.year - a.year);
  }

  async createPublication(insertPublication: InsertPublication): Promise<Publication> {
    const [publication] = await db
      .insert(publications)
      .values(insertPublication)
      .returning();
    return publication;
  }

  async updatePublication(id: number, publicationUpdate: Partial<InsertPublication>): Promise<Publication | undefined> {
    const [updatedPublication] = await db
      .update(publications)
      .set(publicationUpdate)
      .where(eq(publications.id, id))
      .returning();
    return updatedPublication || undefined;
  }

  async deletePublication(id: number): Promise<boolean> {
    const result = await db.delete(publications).where(eq(publications.id, id));
    return result.rowCount > 0;
  }
}

export const storage = new DatabaseStorage();
