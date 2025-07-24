// Simple seed script for production deployment
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seedDatabase() {
  console.log('Seeding database...');
  
  try {
    // Insert profile
    await pool.query(`
      INSERT INTO profiles (full_name, position, institution, email, linkedin, website, research_interests, photo_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT DO NOTHING
    `, [
      'Tianqin Lu',
      'PhD Student', 
      'Eindhoven University of Technology',
      't.lu1@tue.nl',
      'https://www.linkedin.com/in/lutianqin/',
      null,
      'Exploring digital technologies in healthcare, with a focus on health data collection and its applications.',
      '/assets/1732425550304_1753354833655.jpg'
    ]);

    // Insert publications
    const publications = [
      ['A systematic review of strategies in digital technologies for motivating adherence to chronic illness self-care', 'Tianqin Lu, Qingyuan Lin, Bin Yu, Jun Hu', 'npj Health Systems', 2025, '10.1038/s44401-025-00017-4', null, 'https://www.researchgate.net/publication/391196855_A_systematic_review_of_strategies_in_digital_technologies_for_motivating_adherence_to_chronic_illness_self-care'],
      ['WonderMap: Capturing and Connecting the Edges of Cultures', 'Tianqin Lu, Anniek Jansen, Sichen Guo, François Leborgne', 'Proceedings of the Eighteenth International Conference on Tangible, Embedded, and Embodied Interaction (TEI)', 2024, '10.1145/3623509.3635865', null, 'https://www.researchgate.net/publication/378139737_WonderMap_Capturing_and_Connecting_the_Edges_of_Cultures'],
      ['Exploring Artistic Data Visualization Design for Health Monitoring: A Survey Study', 'Tianqin Lu, Jun Hu', 'From User to Human', 2024, null, null, null],
      ['E-Motioning: Exploring the Effects of Emotional Generative Visuals on Creativity and Connectedness during Videoconferencing', 'Tianqin Lu, Jun Hu', '2023 IASDR International Design Research Conference', 2023, '10.21606/iasdr.2023.101', null, 'https://www.researchgate.net/publication/374552685_E-Motioning_Exploring_the_Effects_of_Emotional_Generative_Visuals_on_Creativity_and_Connectedness_during_Videoconferencing'],
      ['WeHeart: A Personalized Recommendation Device for Physical Activity Encouragement and Preventing "Cold Start" in Cardiac Rehabilitation', 'Rosa van Tuijn, Tianqin Lu, Emma Driesse, K Franken, Pratik Gajane, Emilia Ivanova Barakova', 'IFIP Conference on Human-Computer Interaction', 2023, '10.1007/978-3-031-42286-7_11', null, 'https://www.researchgate.net/publication/373378693_WeHeart_A_Personalized_Recommendation_Device_for_Physical_Activity_Encouragement_and_Preventing_Cold_Start_in_Cardiac_Rehabilitation'],
      ['A-Vibe: Exploring the Impact of Animal-form Avatars on Students\' Connectedness and Social Presence through Delivering Honest Signals in Live Online Classes', 'Tianqin Lu, Jun Hu', '12th International Conference on Design and Semantics of Form and Movement', 2023, null, null, null]
    ];

    for (const pub of publications) {
      await pool.query(`
        INSERT INTO publications (title, authors, venue, year, doi, pdf_url, publication_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT DO NOTHING
      `, pub);
    }

    console.log('✓ Database seeded successfully');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await pool.end();
  }
}

seedDatabase();
