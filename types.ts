
export interface Link {
  name: string;
  icon: string;
  url: string;
}

export interface Skill {
  name: string;
  icon: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface Document {
  name:string;
  type: 'photo' | 'nid' | 'bank' | 'cv' | 'other';
  url: string; // This will store a base64 data URL for uploaded files
  preview: string;
  fileName?: string; // To preserve the original filename for downloads
}

export interface GalleryImage {
  url: string; // base64 data URL
  caption: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
}

export interface GalleryVideo {
  url: string; // base64 data URL
  caption: string;
  fileName?: string;
}

export interface PortfolioData {
  profilePictureUrl: string;
  fullName: string;
  bio: string;
  skills: Skill[];
  education: Education[];
  timeline: TimelineEvent[];
  socialLinks: Link[];
  businessLinks: Link[];
  documents: Document[];
  imageGallery: GalleryImage[];
  videoGallery: GalleryVideo[];
}