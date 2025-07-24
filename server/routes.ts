import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProfileSchema, insertPublicationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get profile
  app.get("/api/profile", async (req, res) => {
    try {
      const profile = await storage.getProfile();
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  // Update profile
  app.put("/api/profile", async (req, res) => {
    try {
      const validation = insertProfileSchema.partial().safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid profile data", errors: validation.error.errors });
      }

      const updatedProfile = await storage.updateProfile(validation.data);
      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(updatedProfile);
    } catch (error) {
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Get publications
  app.get("/api/publications", async (req, res) => {
    try {
      const publications = await storage.getPublications();
      res.json(publications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch publications" });
    }
  });

  // Create publication
  app.post("/api/publications", async (req, res) => {
    try {
      const validation = insertPublicationSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid publication data", errors: validation.error.errors });
      }

      const publication = await storage.createPublication(validation.data);
      res.status(201).json(publication);
    } catch (error) {
      res.status(500).json({ message: "Failed to create publication" });
    }
  });

  // Update publication
  app.put("/api/publications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid publication ID" });
      }

      const validation = insertPublicationSchema.partial().safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid publication data", errors: validation.error.errors });
      }

      const updatedPublication = await storage.updatePublication(id, validation.data);
      if (!updatedPublication) {
        return res.status(404).json({ message: "Publication not found" });
      }
      
      res.json(updatedPublication);
    } catch (error) {
      res.status(500).json({ message: "Failed to update publication" });
    }
  });

  // Delete publication
  app.delete("/api/publications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid publication ID" });
      }

      const deleted = await storage.deletePublication(id);
      if (!deleted) {
        return res.status(404).json({ message: "Publication not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete publication" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
