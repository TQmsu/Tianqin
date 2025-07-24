import { db } from "../server/db";
import { profiles, publications } from "../shared/schema";

async function seedDatabase() {
  try {
    console.log("Seeding database with your profile and publications...");

    // Insert your profile
    const [profile] = await db
      .insert(profiles)
      .values({
        fullName: "Tianqin Lu",
        position: "PhD Student",
        institution: "Eindhoven University of Technology",
        email: "t.lu1@tue.nl",
        linkedin: "https://www.linkedin.com/in/lutianqin/",
        website: null,
        researchInterests: "Exploring digital technologies in healthcare, with a focus on health data collection and its applications.",
        photoUrl: "@assets/1732425550304_1753354833655.jpg"
      })
      .returning();

    console.log("✓ Profile created:", profile.fullName);

    // Insert your publications
    const publicationData = [
      {
        title: "A systematic review of strategies in digital technologies for motivating adherence to chronic illness self-care",
        authors: "Tianqin Lu, Qingyuan Lin, Bin Yu, Jun Hu",
        venue: "npj Health Systems",
        year: 2025,
        doi: "10.1038/s44401-025-00017-4",
        pdfUrl: null,
        publicationUrl: "https://www.researchgate.net/publication/391196855_A_systematic_review_of_strategies_in_digital_technologies_for_motivating_adherence_to_chronic_illness_self-care"
      },
      {
        title: "WonderMap: Capturing and Connecting the Edges of Cultures",
        authors: "Tianqin Lu, Anniek Jansen, Sichen Guo, François Leborgne",
        venue: "Proceedings of the Eighteenth International Conference on Tangible, Embedded, and Embodied Interaction (TEI)",
        year: 2024,
        doi: "10.1145/3623509.3635865",
        pdfUrl: null,
        publicationUrl: "https://www.researchgate.net/publication/378139737_WonderMap_Capturing_and_Connecting_the_Edges_of_Cultures"
      },
      {
        title: "Exploring Artistic Data Visualization Design for Health Monitoring: A Survey Study",
        authors: "Tianqin Lu, Jun Hu",
        venue: "From User to Human",
        year: 2024,
        doi: null,
        pdfUrl: null,
        publicationUrl: null
      },
      {
        title: "E-Motioning: Exploring the Effects of Emotional Generative Visuals on Creativity and Connectedness during Videoconferencing",
        authors: "Tianqin Lu, Jun Hu",
        venue: "2023 IASDR International Design Research Conference",
        year: 2023,
        doi: "10.21606/iasdr.2023.101",
        pdfUrl: null,
        publicationUrl: "https://www.researchgate.net/publication/374552685_E-Motioning_Exploring_the_Effects_of_Emotional_Generative_Visuals_on_Creativity_and_Connectedness_during_Videoconferencing"
      },
      {
        title: "WeHeart: A Personalized Recommendation Device for Physical Activity Encouragement and Preventing \"Cold Start\" in Cardiac Rehabilitation",
        authors: "Rosa van Tuijn, Tianqin Lu, Emma Driesse, K Franken, Pratik Gajane, Emilia Ivanova Barakova",
        venue: "IFIP Conference on Human-Computer Interaction",
        year: 2023,
        doi: "10.1007/978-3-031-42286-7_11",
        pdfUrl: null,
        publicationUrl: "https://www.researchgate.net/publication/373378693_WeHeart_A_Personalized_Recommendation_Device_for_Physical_Activity_Encouragement_and_Preventing_Cold_Start_in_Cardiac_Rehabilitation"
      },
      {
        title: "A-Vibe: Exploring the Impact of Animal-form Avatars on Students' Connectedness and Social Presence through Delivering Honest Signals in Live Online Classes",
        authors: "Tianqin Lu, Jun Hu",
        venue: "12th International Conference on Design and Semantics of Form and Movement",
        year: 2023,
        doi: null,
        pdfUrl: null,
        publicationUrl: null
      }
    ];

    const insertedPublications = await db
      .insert(publications)
      .values(publicationData)
      .returning();

    console.log(`✓ ${insertedPublications.length} publications added`);
    console.log("Database seeding completed successfully!");

  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();