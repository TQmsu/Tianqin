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
    // Create your profile
    const profile: Profile = {
      id: 1,
      fullName: "Tianqin Lu",
      position: "PhD Student",
      institution: "Eindhoven University of Technology",
      email: "t.lu1@tue.nl",
      linkedin: "https://www.linkedin.com/in/lutianqin/",
      website: null,
      researchInterests: "Exploring digital technologies in healthcare, with a focus on health data collection and its applications.",
      photoUrl: "@assets/1732425550304_1753354833655.jpg"
    };
    this.profiles.set(1, profile);

    // Your actual publications from ResearchGate and Google Scholar
    const publications: Publication[] = [
      {
        id: 1,
        title: "A systematic review of strategies in digital technologies for motivating adherence to chronic illness self-care",
        authors: "Tianqin Lu, Qingyuan Lin, Bin Yu, Jun Hu",
        venue: "npj Health Systems",
        year: 2025,
        doi: "10.1038/s44401-025-00017-4",
        pdfUrl: null,
        publicationUrl: "https://www.researchgate.net/publication/391196855_A_systematic_review_of_strategies_in_digital_technologies_for_motivating_adherence_to_chronic_illness_self-care"
      },
      {
        id: 2,
        title: "WonderMap: Capturing and Connecting the Edges of Cultures",
        authors: "Tianqin Lu, Anniek Jansen, Sichen Guo, François Leborgne",
        venue: "Proceedings of the Eighteenth International Conference on Tangible, Embedded, and Embodied Interaction (TEI)",
        year: 2024,
        doi: "10.1145/3623509.3635865",
        pdfUrl: null,
        publicationUrl: "https://www.researchgate.net/publication/378139737_WonderMap_Capturing_and_Connecting_the_Edges_of_Cultures"
      },
      {
        id: 3,
        title: "Exploring Artistic Data Visualization Design for Health Monitoring: A Survey Study",
        authors: "Tianqin Lu, Jun Hu",
        venue: "From User to Human",
        year: 2024,
        doi: null,
        pdfUrl: null,
        publicationUrl: null
      },
      {
        id: 4,
        title: "E-Motioning: Exploring the Effects of Emotional Generative Visuals on Creativity and Connectedness during Videoconferencing",
        authors: "Tianqin Lu",
        venue: "2023 IASDR International Design Research Conference",
        year: 2023,
        doi: null,
        pdfUrl: null,
        publicationUrl: "https://www.researchgate.net/publication/374552685_E-Motioning_Exploring_the_Effects_of_Emotional_Generative_Visuals_on_Creativity_and_Connectedness_during_Videoconferencing"
      },
      {
        id: 5,
        title: "WeHeart: A Personalized Recommendation Device for Physical Activity Encouragement and Preventing \"Cold Start\" in Cardiac Rehabilitation",
        authors: "Rosa van Tuijn, Tianqin Lu, Emma Driesse, K Franken, Pratik Gajane, Emilia Ivanova Barakova",
        venue: "IFIP Conference on Human-Computer Interaction",
        year: 2023,
        doi: "10.1007/978-3-031-42286-7_11",
        pdfUrl: null,
        publicationUrl: "https://www.researchgate.net/publication/373378693_WeHeart_A_Personalized_Recommendation_Device_for_Physical_Activity_Encouragement_and_Preventing_Cold_Start_in_Cardiac_Rehabilitation"
      },
      {
        id: 6,
        title: "A-Vibe: Exploring the Impact of Animal-form Avatars on Students' Connectedness and Social Presence through Delivering Honest Signals in Live Online Classes",
        authors: "Tianqin Lu, Jun Hu",
        venue: "12th International Conference on Design and Semantics of Form and Movement",
        year: 2023,
        doi: null,
        pdfUrl: null,
        publicationUrl: null
      }
    ];

    publications.forEach(pub => this.publications.set(pub.id, pub));
    this.currentPublicationId = 7;
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
