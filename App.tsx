
import React, { useState, useEffect } from 'react';
import type { PortfolioData } from './types';
import { INITIAL_DATA, ADMIN_PASSWORD, DOCS_PASSWORD } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import Section from './components/Section';
import Skills from './components/Skills';
import Education from './components/Education';
import Timeline from './components/Timeline';
import LinksGrid from './components/LinksGrid';
import Documents from './components/Documents';
import ImageGallery from './components/ImageGallery';
import VideoGallery from './components/VideoGallery';
import AdminModal from './components/AdminModal';
import DocsLoginModal from './components/DocsLoginModal';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import Footer from './components/Footer';

// --- SaveBar Component ---
interface SaveBarProps {
  onSave: () => void;
  onDiscard: () => void;
  isSaving: boolean;
  hasChanges: boolean;
}

const SaveBar: React.FC<SaveBarProps> = ({ onSave, onDiscard, isSaving, hasChanges }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary/90 backdrop-blur-sm border-t border-gray-700 z-50 transition-transform duration-300">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <p className="font-semibold text-text-primary text-sm md:text-base">
          You are in editing mode.
        </p>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            onClick={onDiscard}
            disabled={isSaving}
            className="text-text-secondary hover:text-white px-3 py-2 md:px-4 rounded-md transition-colors text-sm"
          >
            Discard & Exit
          </button>
          <button
            onClick={onSave}
            disabled={isSaving || !hasChanges}
            className="bg-accent text-white font-bold px-4 py-2 md:px-6 rounded-lg hover:bg-violet-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};


function App() {
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [draftData, setDraftData] = useState<PortfolioData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showDocsLoginModal, setShowDocsLoginModal] = useState(false);
  const [hasAccessedDocs, setHasAccessedDocs] = useState(false);
  const [showForgotPasswordModalFor, setShowForgotPasswordModalFor] = useState<'admin' | 'docs' | null>(null);
  
  const [passwords, setPasswords] = useState({ admin: ADMIN_PASSWORD, docs: DOCS_PASSWORD });

  // Load data and passwords from localStorage on initial render
  useEffect(() => {
    try {
      const savedData = window.localStorage.getItem('portfolioData');
      if (savedData) {
        setData(JSON.parse(savedData));
      }

      const savedPasswords = window.localStorage.getItem('portfolioPasswords');
      if (savedPasswords) {
        setPasswords(JSON.parse(savedPasswords));
      }
    } catch (error) {
      console.error("Could not load data from localStorage", error);
      setData(INITIAL_DATA);
      setPasswords({ admin: ADMIN_PASSWORD, docs: DOCS_PASSWORD });
    }
  }, []);

  const displayData = isAdmin && draftData ? draftData : data;
  const hasUnsavedChanges = isAdmin && JSON.stringify(data) !== JSON.stringify(draftData);

  const handleAdminLogin = (password: string) => {
    if (password === passwords.admin) {
      setDraftData(JSON.parse(JSON.stringify(data)));
      setIsAdmin(true);
      setShowAdminModal(false);
    } else {
      alert('Incorrect Admin Password.');
    }
  };

  const handleDocsLogin = (password: string) => {
    if (password === passwords.docs) {
      setHasAccessedDocs(true);
      setShowDocsLoginModal(false);
    } else {
      alert('Incorrect Document Password.');
    }
  };
  
  const handleSave = () => {
    if (draftData) {
      setIsSaving(true);
      setTimeout(() => { // Simulate network latency for better UX
        const new_data = JSON.parse(JSON.stringify(draftData)); // deep copy
        setData(new_data);
        try {
          window.localStorage.setItem('portfolioData', JSON.stringify(new_data));
        } catch (error) {
          console.error("Could not save data to localStorage", error);
          alert("There was an error saving your data.");
        }
        setIsSaving(false);
      }, 1000);
    }
  };

  const handleDiscardAndExit = () => {
    const exitEditing = () => {
      setIsAdmin(false);
      setDraftData(null);
      setHasAccessedDocs(false); // CRITICAL: Also lock the documents section
    };

    if (hasUnsavedChanges) {
      if (window.confirm("Are you sure you want to discard your changes and exit editing mode?")) {
        exitEditing();
      }
    } else {
      exitEditing();
    }
  };
  
  const handleResetData = () => {
      if (window.confirm("Are you sure you want to reset all portfolio data to the original template? This action cannot be undone.")) {
          try {
              window.localStorage.removeItem('portfolioData');
              window.localStorage.removeItem('portfolioPasswords'); // Also reset passwords
              setData(INITIAL_DATA);
              setPasswords({ admin: ADMIN_PASSWORD, docs: DOCS_PASSWORD });
              setDraftData(INITIAL_DATA); // Also reset the current draft
              alert("Portfolio has been reset to default.");
          } catch(error) {
              console.error("Could not reset data in localStorage", error);
              alert("There was an error resetting the data.");
          }
      }
  };

  const handleDraftChange = (updater: (draft: PortfolioData) => PortfolioData) => {
    setDraftData(currentDraft => {
        if (!currentDraft) return currentDraft;
        return updater(currentDraft);
    });
  };

  const handleDataChange = <K extends keyof PortfolioData, V,>(
    section: K,
    value: V,
    index?: number
  ) => {
    handleDraftChange(draft => {
      if (index !== undefined && Array.isArray(draft[section])) {
        const newArray = [...(draft[section] as any[])];
        newArray[index] = { ...newArray[index], ...value };
        return { ...draft, [section]: newArray };
      }
      return { ...draft, [section]: value };
    });
  };

  const handleAddItem = <K extends keyof PortfolioData>(section: K) => {
    handleDraftChange(draft => {
        const sectionData = draft[section];
        if (!Array.isArray(sectionData)) return draft;

        let newItem: any;
        switch (section) {
            case 'skills':
                newItem = { name: "New Skill", icon: "code", description: "A detailed description of this new skill." };
                break;
            case 'education':
                newItem = { degree: "New Degree", institution: "New Institution", year: "Year" };
                break;
            case 'timeline':
                newItem = { year: "YYYY", title: "New Event", description: "A description of the new event." };
                break;
            case 'socialLinks':
            case 'businessLinks':
                newItem = { name: "New Link", icon: "website", url: "#" };
                break;
            case 'documents':
                newItem = { name: "New Document", type: 'other', url: '#', preview: `https://picsum.photos/seed/${Date.now()}/200`, fileName: 'document.pdf' };
                break;
            case 'imageGallery':
                newItem = { url: `https://picsum.photos/seed/${Date.now()}/400/300`, caption: 'New Image Caption', fileName: 'image.jpg', fileSize: 0, fileType: 'image/jpeg' };
                break;
            case 'videoGallery':
                 newItem = { url: '', caption: 'New Video Caption', fileName: 'video.mp4' };
                 break;
            default:
                return draft;
        }

        return { ...draft, [section]: [...sectionData, newItem] };
    });
  };

  const handleDeleteItem = <K extends keyof PortfolioData>(section: K, index: number) => {
      handleDraftChange(draft => {
          const sectionData = draft[section];
          if (!Array.isArray(sectionData)) return draft;
          
          const newArray = sectionData.filter((_, i) => i !== index);
          return { ...draft, [section]: newArray };
      });
  };
  
  const handlePasswordReset = (userType: 'admin' | 'docs', newPassword: string) => {
    const newPasswords = { ...passwords, [userType]: newPassword };
    setPasswords(newPasswords);
    try {
        window.localStorage.setItem('portfolioPasswords', JSON.stringify(newPasswords));
        alert("Password successfully changed!");
        setShowForgotPasswordModalFor(null); // Close modal on success
    } catch (error) {
        console.error("Could not save new passwords to localStorage", error);
        alert("There was an error saving your new password.");
    }
  };

  // Sanitize documents before passing to the component if user doesn't have access.
  const sanitizedDocuments = hasAccessedDocs
    ? displayData.documents
    : displayData.documents.map(doc => ({
        ...doc,
        url: '#', 
        fileName: undefined,
    }));

  return (
    <div className="min-h-screen bg-primary text-text-primary font-sans selection:bg-accent/40">
      {showAdminModal && (
        <AdminModal 
          onClose={() => setShowAdminModal(false)} 
          onSubmit={handleAdminLogin}
          onForgotPasswordClick={() => setShowForgotPasswordModalFor('admin')}
        />
      )}
      {showDocsLoginModal && (
        <DocsLoginModal
          onClose={() => setShowDocsLoginModal(false)}
          onSubmit={handleDocsLogin}
          onForgotPasswordClick={() => setShowForgotPasswordModalFor('docs')}
        />
      )}
      {showForgotPasswordModalFor && (
        <ForgotPasswordModal
          onClose={() => setShowForgotPasswordModalFor(null)}
          userType={showForgotPasswordModalFor}
          onPasswordReset={handlePasswordReset}
        />
      )}
      <Header
        isAdmin={isAdmin}
        onAdminClick={() => setShowAdminModal(true)}
        onLogout={handleDiscardAndExit}
        onReset={handleResetData}
      />
      <main className="container mx-auto px-6 py-8 md:px-12 md:py-16 space-y-24 md:space-y-32">
        <Hero
          profilePictureUrl={displayData.profilePictureUrl}
          fullName={displayData.fullName}
          bio={displayData.bio}
          isEditing={isAdmin}
          onProfilePictureChange={(value) => handleDataChange('profilePictureUrl', value)}
          onFullNameChange={(value) => handleDataChange('fullName', value)}
          onBioChange={(value) => handleDataChange('bio', value)}
        />

        <Section title="My Skills" id="skills">
          <Skills 
            skills={displayData.skills}
            isEditing={isAdmin}
            onItemChange={(value, index) => handleDataChange('skills', value, index)}
            onAddItem={() => handleAddItem('skills')}
            onDeleteItem={(index) => handleDeleteItem('skills', index)}
           />
        </section>

        <Section title="Image Gallery" id="gallery">
          <ImageGallery
            images={displayData.imageGallery}
            isEditing={isAdmin}
            onItemChange={(value, index) => handleDataChange('imageGallery', value, index)}
            onAddItem={() => handleAddItem('imageGallery')}
            onDeleteItem={(index) => handleDeleteItem('imageGallery', index)}
          />
        </Section>
        
        <Section title="Video Gallery" id="videos">
          <VideoGallery
            videos={displayData.videoGallery}
            isEditing={isAdmin}
            onItemChange={(value, index) => handleDataChange('videoGallery', value, index)}
            onAddItem={() => handleAddItem('videoGallery')}
            onDeleteItem={(index) => handleDeleteItem('videoGallery', index)}
          />
        </Section>
        
        <Section title="Education & Qualifications" id="education">
          <Education 
            items={displayData.education}
            isEditing={isAdmin}
            onItemChange={(value, index) => handleDataChange('education', value, index)}
            onAddItem={() => handleAddItem('education')}
            onDeleteItem={(index) => handleDeleteItem('education', index)}
          />
        </section>
        
        <Section title="My Plan & Story" id="story">
          <Timeline 
            events={displayData.timeline} 
            isEditing={isAdmin}
            onEventChange={(value, index) => handleDataChange('timeline', value, index)}
            onAddItem={() => handleAddItem('timeline')}
            onDeleteItem={(index) => handleDeleteItem('timeline', index)}
          />
        </section>
        
        <Section title="Social Media" id="social">
          <LinksGrid 
            links={displayData.socialLinks}
            isEditing={isAdmin}
            onLinkChange={(value, index) => handleDataChange('socialLinks', value, index)}
            onAddItem={() => handleAddItem('socialLinks')}
            onDeleteItem={(index) => handleDeleteItem('socialLinks', index)}
            itemType="Link"
          />
        </section>

        <Section title="Business Links" id="business">
           <LinksGrid 
            links={displayData.businessLinks}
            isEditing={isAdmin}
            onLinkChange={(value, index) => handleDataChange('businessLinks', value, index)}
            onAddItem={() => handleAddItem('businessLinks')}
            onDeleteItem={(index) => handleDeleteItem('businessLinks', index)}
            itemType="Link"
           />
        </section>

        <Section title="Personal Documents" id="documents">
          <Documents 
            hasAccess={hasAccessedDocs}
            documents={sanitizedDocuments}
            isEditing={isAdmin}
            onRequestAccess={() => setShowDocsLoginModal(true)}
            onDocChange={(value, index) => handleDataChange('documents', value, index)}
            onAddItem={() => handleAddItem('documents')}
            onDeleteItem={(index) => handleDeleteItem('documents', index)}
          />
        </section>
      </main>
      
      {isAdmin && (
        <SaveBar 
          onSave={handleSave}
          onDiscard={handleDiscardAndExit}
          isSaving={isSaving}
          hasChanges={!!hasUnsavedChanges}
        />
      )}

      <Footer fullName={displayData.fullName} isEditing={isAdmin} />
    </div>
  );
}

export default App;
