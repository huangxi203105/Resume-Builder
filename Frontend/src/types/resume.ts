export interface ResumeFormData {
  title: string;
  profileInfo: {
    fullName: string;
    designation: string;
    summary: string;
    profilePreviewUrl?: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website: string;
  };
  workExperience: Array<{
    companyName: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institute: string;
    startDate: string;
    endDate: string;
  }>;
  skills: Array<{
    name: string;
    progress: number;
  }>;
  projects: Array<{
    title: string;
    description: string;
    github: string;
    liveDemo: string;
  }>;
  achievements: Array<{
    name: string;
    description: string;
  }>;
  certifications: Array<{
    title: string;
    issuer: string;
    year: string;
  }>;
  languages: Array<{
    name: string;
    progress: number;
  }>;
  interests: string[];
}

export interface FormStep {
  id: number;
  title: string;
  component: React.ComponentType;
  isCompleted: boolean;
}