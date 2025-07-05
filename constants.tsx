import React from 'react';
import type { PortfolioData } from './types';

// --- ICONS ---
// Using inline SVGs for simplicity and performance, no need for an extra library.
export const icons: { [key: string]: React.ReactNode } = {
  website: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>,
  linkedin: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
  facebook: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>,
  instagram: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>,
  email: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>,
  whatsapp: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>,
  upwork: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.3 9.4a3.5 3.5 0 1 0-3.5 3.5v7.6h2.2v-5.5c0-1.8 1.6-2.1 2.2-2.1 1.4 0 2.2 1.1 2.2 2.2v5.4h2.2v-6c0-3.9-2-5.7-4.3-5.7Z"/><path d="M11.8 8.2a4.4 4.4 0 1 0-4.4 4.4v8.9h2.3V12a2.2 2.2 0 1 1 2.1-2.2Z"/></svg>,
  fiverr: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 8.12h-4.33V4h-2.23v13.59h-1.61v-7.39H6.5v-2.23h4.33V4H8.6v2.23H4v2.23h4.6v2.58H4v2.23h4.6v2.23H4v2.23h4.6v2.23h2.23V11.8h2.23v8.2h2.23v-5.97H20v-2.23h-4.67V8.12Z"/></svg>,
  tiktok: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.55 8.2A4.24 4.24 0 0 1 16.5 6.5a4.3 4.3 0 0 1 4.34 4.06c-.1 4.35-3.34 7.6-7.38 7.44A4.33 4.33 0 0 1 9.5 13.7v-1.1a4.23 4.23 0 0 1 3.05-4.4Z"/><path d="M9.5 16.5v-10A3.5 3.5 0 0 0 6 3H3v12h3.5a3.5 3.5 0 0 0 3.5-3.5Z"/></svg>,
  amazon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.23 15.24a5.91 5.91 0 0 1 2.3-4.11 6.32 6.32 0 0 1 4.21-1.63 6.17 6.17 0 0 1 4.14 1.7c1.11 1.08 1.77 2.58 1.77 4.17 0 .28-.05.55-.08.82a.84.84 0 0 1-.82.68h-4.3c.09 1.49 1.41 2.51 3 2.51a3.29 3.29 0 0 0 2.21-1.05 1 1 0 0 1 1.48.31 4.29 4.29 0 0 1-3.66 1.8 5.75 5.75 0 0 1-5.92-5.75Zm4.36-2.23h2.64c-.11-1.12-1.04-1.9-2.2-1.9-1.08 0-1.96.69-2.12 1.9Z"/><path d="M21.77 15.24a5.91 5.91 0 0 1-2.3-4.11 6.32 6.32 0 0 1-4.21-1.63 6.17 6.17 0 0 1-4.14 1.7c-1.11 1.08-1.77 2.58-1.77 4.17 0 .28.05.55.08.82a.84.84 0 0 1 .82.68h4.3c-.09 1.49-1.41 2.51-3 2.51a3.29 3.29 0 0 0-2.21-1.05 1 1 0 0 1-1.48.31 4.29 4.29 0 0 1 3.66 1.8 5.75 5.75 0 0 1 5.92-5.75Zm-4.36-2.23h-2.64c.11-1.12 1.04-1.9 2.2-1.9 1.08 0 1.96.69 2.12 1.9Z"/><path d="m14.33 21.57-.42-1.16a.48.48 0 0 1 .63-.56l1.17.42a1.18 1.18 0 0 0 1.34-.43l4.33-5.26a1.18 1.18 0 0 0-1-1.92h-4.28a1.18 1.18 0 0 0-1.18 1.18v.58a1.18 1.18 0 0 0 1.18 1.18h2.33a.47.47 0 0 1 .37.76l-3.23 3.93a.47.47 0 0 1-.67.17Z"/></svg>,
  code: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
  design: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>,
  marketing: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path><path d="M19.1 19.1C18.4 17.5 17 16 15.5 16h-7c-1.5 0-2.9 1.5-3.6 3.1"></path></svg>,
  lock: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
  unlock: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>,
  daraz: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f57224" stroke="#fff" strokeWidth="0.5"><path d="M18.889 7.822H8.844L12 11.2l3.156-3.378h3.733zM5.111 7.822l3.733 4.156L5.111 16.133V7.822zm4.311 4.711 3.422 3.645 3.422-3.645-3.422-3.644-3.422 3.644zM18.889 12l-3.733 4.156h3.733V12z"/></svg>,
  aliexpress: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.32 8.46H8.68l-1.3 2.11h9.24l-1.3-2.11z"/><path d="M7.38 13.43l1.3 2.11h6.64l1.3-2.11H7.38z"/><path d="M3 7l4.5 7.34-4.5 7.34h18L16.5 14.34 21 7H3z"/></svg>,
  add: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  reset: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v6h6"/><path d="M21 12A9 9 0 0 0 6 5.3L3 8m18 14v-6h-6"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/></svg>,
  pdf: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  image_file: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><circle cx="12" cy="13" r="2"></circle><path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L12 20"></path></svg>,
  document: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  download: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
  video: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>,
};


// --- INITIAL DATA ---
export const INITIAL_DATA: PortfolioData = {
  profilePictureUrl: 'https://picsum.photos/seed/profile/200',
  fullName: "Your Full Name",
  bio: "A passionate and creative professional specializing in web development and digital marketing. I turn ideas into reality through code and strategy. This entire portfolio is editable—just click the lock icon!",
  skills: [
    { name: "React & Next.js", icon: "code", description: "Building fast, scalable, and modern server-side rendered and static web applications using the React ecosystem." },
    { name: "UI/UX Design", icon: "design", description: "Creating intuitive, accessible, and beautiful user interfaces with a strong focus on user-centric design principles." },
    { name: "Digital Marketing", icon: "marketing", description: "Developing and executing online marketing strategies, including SEO, SEM, and content marketing to drive growth." },
    { name: "Tailwind CSS", icon: "code", description: "Rapidly building custom user interfaces with a utility-first CSS framework that promotes consistency and speed." },
    { name: "Figma", icon: "design", description: "Designing and prototyping high-fidelity user interfaces and collaborative design systems from concept to handoff." },
    { name: "SEO", icon: "marketing", description: "Optimizing websites to rank higher in search engine results, driving organic traffic and improving online visibility." },
  ],
  education: [
    { degree: "Master's in Computer Science", institution: "University of Technology", year: "2022" },
    { degree: "Bachelor's in Business Administration", institution: "State College of Business", year: "2020" },
    { degree: "Certified Digital Marketer", institution: "Online Marketing Institute", year: "2019" },
  ],
  timeline: [
    { year: "2023", title: "Senior Developer", description: "Led a team to build scalable web applications for enterprise clients, focusing on performance and user experience." },
    { year: "2024", title: "Launch New SaaS Product", description: "My goal is to develop and launch a new Software-as-a-Service product aimed at small businesses." },
    { year: "2025", title: "Expand Freelance Business", description: "Plan to grow my freelance client base by 50%, focusing on long-term partnerships." },
    { year: "2026", title: "Explore AI Integration", description: "Dive deeper into artificial intelligence and machine learning to build smarter applications." },
  ],
  socialLinks: [
    { name: "Website", icon: "website", url: "#" },
    { name: "LinkedIn", icon: "linkedin", url: "#" },
    { name: "Facebook", icon: "facebook", url: "#" },
    { name: "Instagram", icon: "instagram", url: "#" },
    { name: "Email", icon: "email", url: "mailto:your.email@example.com" },
    { name: "WhatsApp", icon: "whatsapp", url: "https://wa.me/1234567890" },
  ],
  businessLinks: [
    { name: "Upwork", icon: "upwork", url: "#" },
    { name: "Fiverr", icon: "fiverr", url: "#" },
    { name: "LinkedIn Page", icon: "linkedin", url: "#" },
    { name: "Daraz Shop", icon: "daraz", url: "#" },
    { name: "Facebook Page", icon: "facebook", url: "#" },
    { name: "Instagram Business", icon: "instagram", url: "#" },
    { name: "TikTok", icon: "tiktok", url: "#" },
    { name: "Amazon", icon: "amazon", url: "#" },
    { name: "AliExpress", icon: "aliexpress", url: "#" },
  ],
  documents: [
    { name: "Personal Photo", type: 'photo', url: '#', preview: 'https://picsum.photos/seed/photo/200/200', fileName: 'photo.jpg' },
    { name: "NID Card (Front)", type: 'nid', url: '#', preview: 'https://picsum.photos/seed/nid1/300/200', fileName: 'nid_front.jpg' },
    { name: "NID Card (Back)", type: 'nid', url: '#', preview: 'https://picsum.photos/seed/nid2/300/200', fileName: 'nid_back.jpg' },
    { name: "Bank Details", type: 'bank', url: '#', preview: 'https://picsum.photos/seed/bank/300/200', fileName: 'bank_details.pdf' },
    { name: "Curriculum Vitae (CV)", type: 'cv', url: '#', preview: 'https://picsum.photos/seed/cv/200/280', fileName: 'cv.pdf' },
    { name: "Other Document", type: 'other', url: '#', preview: 'https://picsum.photos/seed/other/200/200', fileName: 'document.pdf' },
  ],
  imageGallery: [],
  videoGallery: [],
};

// IMPORTANT: In a real-world application, these would NOT be stored in frontend code.
// This is for demonstration purposes only.
export const ADMIN_PASSWORD = "admin";
export const DOCS_PASSWORD = "docs";