# Academic Profile Website

A professional academic profile website built with React, Node.js, and PostgreSQL, showcasing academic publications and research information.

## Features

- **Professional Design**: Clean, modern interface with San Francisco typography
- **Two-Column Layout**: Narrow sidebar for personal info, wide content area for publications
- **Publication Management**: Display academic publications with DOI links and venue information
- **Database Integration**: PostgreSQL database for persistent data storage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Built with React Query for efficient data fetching

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Build Tools**: Vite for frontend, esbuild for backend
- **Hosting**: Designed for deployment on platforms like Vercel, Netlify, or Railway

## Local Development

### Prerequisites

- Node.js 20+
- PostgreSQL database
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd academic-profile-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with:
```
DATABASE_URL=your_postgresql_connection_string
```

4. Push database schema:
```bash
npm run db:push
```

5. Seed the database:
```bash
npx tsx scripts/seed-database.ts
```

6. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Production Deployment

### Database Setup

1. Create a PostgreSQL database (recommended: [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or [Railway](https://railway.app/))
2. Set the `DATABASE_URL` environment variable
3. Run database migrations: `npm run db:push`
4. Seed with your data: `npx tsx scripts/seed-database.ts`

### Platform-Specific Deployment

#### Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

#### Railway
1. Connect repository to Railway
2. Add PostgreSQL service
3. Set environment variables
4. Deploy

#### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist/public`
4. Configure environment variables

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and configuration
│   │   └── hooks/         # Custom React hooks
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database operations
│   └── db.ts             # Database connection
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema and types
├── scripts/             # Utility scripts
│   └── seed-database.ts # Database seeding
└── package.json         # Dependencies and scripts
```

## Customization

### Adding Your Information

1. Update the profile data in `scripts/seed-database.ts`
2. Replace the profile photo in `attached_assets/`
3. Update publication information with your DOIs and URLs
4. Run the seed script to update the database

### Styling

- Colors and typography are defined in `client/src/index.css`
- Component styles use Tailwind CSS classes
- San Francisco font system is configured for professional appearance

## API Endpoints

- `GET /api/profile` - Retrieve profile information
- `PUT /api/profile` - Update profile
- `GET /api/publications` - Get all publications
- `POST /api/publications` - Create new publication
- `PUT /api/publications/:id` - Update publication
- `DELETE /api/publications/:id` - Delete publication

## License

This project is available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!