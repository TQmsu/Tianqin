# Academic Profile Website

## Overview

This is a full-stack web application built for showcasing academic profiles and publications. The application features a React frontend with a Node.js/Express backend, using PostgreSQL as the database with Drizzle ORM for database operations. The UI is built using shadcn/ui components with Tailwind CSS for styling, creating a professional academic-focused design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom academic color scheme
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API endpoints
- **Middleware**: JSON parsing, URL encoding, request logging
- **Error Handling**: Centralized error handling middleware

### Database Layer
- **Database**: PostgreSQL (configured for production)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Connection**: Neon Database serverless for PostgreSQL hosting
- **Development Storage**: In-memory storage class for development/testing

## Key Components

### Data Models
1. **Users**: Basic user authentication structure
2. **Profiles**: Academic profile information (name, position, institution, contact, research interests)
3. **Publications**: Academic publications with metadata (title, authors, venue, year, DOI, URLs)

### API Endpoints
- `GET /api/profile` - Retrieve academic profile
- `PUT /api/profile` - Update profile information
- `GET /api/publications` - List all publications
- `POST /api/publications` - Create new publication
- `PUT /api/publications/:id` - Update existing publication
- `DELETE /api/publications/:id` - Remove publication

### Frontend Pages
- **Profile Page**: Main landing page displaying academic profile and publications
- **404 Page**: Not found error page

### UI Components
Comprehensive set of reusable components including:
- Cards, Buttons, Forms, Dialogs
- Data display components (Tables, Lists)
- Navigation components
- Feedback components (Toasts, Alerts)

## Data Flow

1. **Profile Display**: Frontend queries profile and publications data via React Query
2. **Data Fetching**: API calls use fetch with error handling and credential management
3. **State Management**: React Query handles caching, background updates, and loading states
4. **Storage Layer**: Development uses in-memory storage, production uses PostgreSQL via Drizzle ORM
5. **Validation**: Zod schemas validate data on both client and server sides

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Query
- **UI Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Forms**: React Hook Form with Hookform resolvers
- **Utilities**: date-fns, clsx for utility functions

### Backend Dependencies
- **Express Framework**: Core server framework
- **Database**: Drizzle ORM, Neon Database serverless
- **Development**: tsx for TypeScript execution, esbuild for production builds
- **Session Management**: connect-pg-simple for PostgreSQL session storage

### Development Tools
- **Build Tools**: Vite, esbuild
- **Type Checking**: TypeScript compiler
- **Database Tools**: Drizzle Kit for migrations and schema management
- **Replit Integration**: Specific plugins for Replit development environment

## Deployment Strategy

### Development Environment
- **Server**: Development server runs with tsx for hot reloading
- **Client**: Vite dev server with HMR and React Fast Refresh
- **Database**: In-memory storage for quick development iteration
- **Environment**: Optimized for Replit with specific plugins and configurations

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: PostgreSQL connection via environment variable `DATABASE_URL`
- **Serving**: Express serves static files in production mode

### Database Deployment
- **Schema Management**: Drizzle migrations in `./migrations` directory
- **Database Push**: `npm run db:push` applies schema changes
- **Connection**: Configured for Neon Database serverless PostgreSQL

The application follows a clean separation of concerns with shared TypeScript types between frontend and backend, ensuring type safety across the full stack. The academic theme is reflected in the styling choices, with professional fonts (Crimson Text, Source Serif Pro) and a sophisticated color palette suitable for academic presentations.