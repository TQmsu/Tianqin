import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Globe, Linkedin, ExternalLink, FileText } from "lucide-react";
import type { Profile, Publication } from "@shared/schema";

function PersonalInfoSidebar({ profile }: { profile: Profile }) {
  return (
    <div className="lg:col-span-4 xl:col-span-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:sticky lg:top-8">
        {/* Professional Photo */}
        <div className="text-center mb-8">
          <img 
            src={profile.photoUrl?.startsWith('@assets/') 
              ? new URL(`../../../attached_assets/${profile.photoUrl.replace('@assets/', '')}`, import.meta.url).href
              : profile.photoUrl || "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            } 
            alt={`${profile.fullName} - Professional Photo`}
            className="w-36 h-36 rounded-full mx-auto object-cover border-4 border-academic-light shadow-lg"
          />
        </div>

        {/* Name and Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-sf-heading text-academic-navy mb-3 tracking-tight">
            {profile.fullName}
          </h1>
          <p className="text-xl font-sf-medium text-academic-charcoal mb-2">
            {profile.position}
          </p>
          <p className="text-lg font-sf-body text-gray-600">
            {profile.institution}
          </p>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <h3 className="text-xl font-sf-heading text-academic-navy mb-6">Contact</h3>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <Mail className="w-4 h-4 mr-3 text-academic-accent flex-shrink-0" />
              <a 
                href={`mailto:${profile.email}`}
                className="text-academic-accent hover:text-academic-navy transition-colors duration-200"
              >
                {profile.email}
              </a>
            </div>
            {profile.linkedin && (
              <div className="flex items-center text-sm">
                <Linkedin className="w-4 h-4 mr-3 text-academic-accent flex-shrink-0" />
                <a 
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-academic-accent hover:text-academic-navy transition-colors duration-200"
                >
                  LinkedIn Profile
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Research Interests */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-sf-heading text-academic-navy mb-6">Research Interests</h3>
          <p className="text-base font-sf-body leading-relaxed text-gray-700">
            {profile.researchInterests}
          </p>
        </div>
      </div>
    </div>
  );
}

function PublicationsList({ publications }: { publications: Publication[] }) {
  return (
    <div className="lg:col-span-8 xl:col-span-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8">
        <h2 className="text-4xl font-sf-heading text-academic-navy mb-10 border-b border-gray-200 pb-6">
          Publications
        </h2>

        <div className="space-y-8">
          {publications.map((publication, index) => (
            <article 
              key={publication.id} 
              className={`publication-entry group ${index > 0 ? 'border-t border-gray-100 pt-8' : ''}`}
            >
              <div className="flex flex-col space-y-3">
                <h3 className="text-2xl font-sf-heading font-semibold text-academic-navy leading-tight">
                  {publication.publicationUrl ? (
                    <a 
                      href={publication.publicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-academic-accent transition-colors duration-200 border-b border-transparent hover:border-academic-accent"
                    >
                      {publication.title}
                    </a>
                  ) : (
                    <span>{publication.title}</span>
                  )}
                </h3>
                <p className="text-lg font-sf-body text-academic-charcoal">
                  {publication.authors.split(', ').map((author, i, arr) => {
                    const isCurrentAuthor = author.includes('Tianqin Lu');
                    return (
                      <span key={i}>
                        {isCurrentAuthor ? <strong className="font-sf-medium">{author}</strong> : author}
                        {i < arr.length - 1 ? ', ' : ''}
                      </span>
                    );
                  })}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-base font-sf-body text-gray-600">
                  <span className="font-sf-medium">
                    <em>{publication.venue}</em>
                  </span>
                  <span className="font-sf-medium">{publication.year}</span>
                  <div className="flex items-center space-x-4">
                    {publication.doi && (
                      <a 
                        href={`https://doi.org/${publication.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-academic-accent hover:text-academic-navy transition-colors duration-200 flex items-center font-sf-medium"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        DOI
                      </a>
                    )}
                    {publication.pdfUrl && publication.pdfUrl !== '#' ? (
                      <a 
                        href={publication.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-academic-accent hover:text-academic-navy transition-colors duration-200 flex items-center font-sf-medium"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        PDF
                      </a>
                    ) : publication.pdfUrl === '#' ? (
                      <span className="text-gray-400 text-sm italic">PDF available soon</span>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-4 xl:col-span-4">
            <Card className="p-6">
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Skeleton className="w-32 h-32 rounded-full mx-auto" />
                </div>
                <div className="text-center space-y-2">
                  <Skeleton className="h-8 w-3/4 mx-auto" />
                  <Skeleton className="h-6 w-2/3 mx-auto" />
                  <Skeleton className="h-5 w-1/2 mx-auto" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column Skeleton */}
          <div className="lg:col-span-8 xl:col-span-8">
            <Card className="p-6 lg:p-8">
              <CardContent className="space-y-8">
                <Skeleton className="h-10 w-48" />
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const { data: profile, isLoading: profileLoading } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const { data: publications = [], isLoading: publicationsLoading } = useQuery<Publication[]>({
    queryKey: ["/api/publications"],
  });

  if (profileLoading || publicationsLoading) {
    return <LoadingSkeleton />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-academic-light">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
              <p className="text-sm text-gray-600">
                Unable to load the academic profile. Please try again later.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-academic-light">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <PersonalInfoSidebar profile={profile} />
          <PublicationsList publications={publications} />
        </div>
      </div>
    </div>
  );
}
