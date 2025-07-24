# GitHub Deployment Guide

This guide will help you deploy your academic profile website from GitHub to various hosting platforms.

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)
Vercel provides excellent support for full-stack applications with automatic deployments.

1. **Setup Repository**:
   - Push your code to GitHub
   - Connect your GitHub repository to [Vercel](https://vercel.com)

2. **Database Setup**:
   - Create a PostgreSQL database at [Neon](https://neon.tech) (free tier available)
   - Copy the connection string

3. **Environment Variables in Vercel**:
   ```
   DATABASE_URL=your_neon_postgresql_connection_string
   NODE_ENV=production
   ```

4. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

5. **Deploy**: 
   - Vercel will automatically deploy on every git push to main branch

### Option 2: Railway
Railway provides integrated PostgreSQL hosting and application deployment.

1. **Setup**:
   - Connect your GitHub repository to [Railway](https://railway.app)
   - Add a PostgreSQL service in Railway

2. **Environment Variables**:
   Railway will automatically provide `DATABASE_URL` from the PostgreSQL service.

3. **Deploy**: 
   Automatic deployment on git push.

### Option 3: Netlify
For static hosting with serverless functions.

1. **Setup**:
   - Connect repository to [Netlify](https://netlify.com)
   - Use external database (Neon, Supabase)

2. **Build Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist/public`

## 📋 Pre-Deployment Checklist

### 1. Repository Setup
```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit: Academic profile website"

# Push to GitHub
git remote add origin https://github.com/yourusername/academic-profile.git
git push -u origin main
```

### 2. Database Preparation

#### Option A: Neon Database (Free)
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new database
3. Copy the connection string
4. Set as `DATABASE_URL` environment variable

#### Option B: Supabase (Free)
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Get the PostgreSQL connection string from Settings > Database
4. Set as `DATABASE_URL` environment variable

### 3. Environment Configuration
Create these environment variables in your hosting platform:

```env
DATABASE_URL=postgresql://username:password@hostname:port/database
NODE_ENV=production
```

### 4. Build Process
The application will:
1. Build the React frontend to `dist/public`
2. Bundle the Express server to `dist/index.js`
3. Automatically run database migrations
4. Serve static files from the backend

## 🔧 Customization Before Deployment

### Update Profile Information
Edit `scripts/seed-database.ts` with your information:

```typescript
// Your profile data
const profileData = {
  fullName: "Your Name",
  position: "Your Position", 
  institution: "Your Institution",
  email: "your.email@domain.com",
  linkedin: "https://linkedin.com/in/yourprofile",
  researchInterests: "Your research interests...",
  photoUrl: "@assets/your-photo.jpg"
};

// Your publications
const publications = [
  {
    title: "Your Publication Title",
    authors: "Author Names",
    venue: "Conference/Journal Name",
    year: 2024,
    doi: "10.1000/doi.number", // if available
    publicationUrl: "https://link-to-paper"
  }
];
```

### Update Profile Photo
1. Replace the file in `attached_assets/` with your professional photo
2. Update the `photoUrl` in the seed script to match your filename

## 🚀 Deployment Steps

### For Vercel:
1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Set Environment Variables**: Add `DATABASE_URL` in Vercel dashboard
3. **Deploy**: Automatic deployment starts
4. **Seed Database**: Run this command once after first deployment:
   ```bash
   vercel env pull .env.local
   npm run seed
   ```

### For Railway:
1. **Connect Repository**: Link GitHub repo to Railway
2. **Add PostgreSQL**: Add PostgreSQL service (DATABASE_URL auto-configured)
3. **Deploy**: Automatic deployment
4. **Seed Database**: Use Railway's console to run:
   ```bash
   npm run seed
   ```

## 📝 Post-Deployment

### 1. Verify Database
Check that your profile and publications are loading correctly on the live site.

### 2. Update Content
To add new publications or update your profile:
1. Update the seed script with new information
2. Run the seed command in your hosting platform's console
3. Or use the API endpoints to update data programmatically

### 3. Custom Domain (Optional)
Most hosting platforms allow you to add custom domains:
- Vercel: Add domain in project settings
- Railway: Configure custom domain in service settings
- Netlify: Add domain in site settings

## 🔄 Ongoing Maintenance

### Updates
- Push changes to your GitHub repository
- Hosting platforms will automatically redeploy
- Database schema changes: run `npm run db:push` after deployment

### Backup
- Most managed PostgreSQL services include automatic backups
- Consider exporting your data periodically for additional safety

## 🆘 Troubleshooting

### Common Issues:

**Build Errors:**
- Ensure all dependencies are in `package.json`
- Check that environment variables are set correctly

**Database Connection:**
- Verify `DATABASE_URL` format is correct
- Ensure database allows connections from your hosting platform

**Missing Data:**
- Run the seed script: `npm run seed`
- Check database connection and permissions

### Support Resources:
- Vercel: [docs.vercel.com](https://docs.vercel.com)
- Railway: [docs.railway.app](https://docs.railway.app) 
- Neon: [neon.tech/docs](https://neon.tech/docs)

---

Your academic profile website is now ready for professional deployment! 🎓