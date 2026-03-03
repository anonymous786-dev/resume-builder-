export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  summary: string;
  jobTitle: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  template: 'modern' | 'classic' | 'minimal';
}

export const initialData: ResumeData = {
  personalInfo: {
    fullName: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Innovative Software Engineer with 5+ years of experience in building scalable web applications. Passionate about clean code, user experience, and solving complex problems with elegant solutions.',
    jobTitle: 'Senior Full Stack Developer',
    website: 'alexrivera.dev'
  },
  experiences: [
    {
      id: '1',
      company: 'TechFlow Systems',
      position: 'Senior Developer',
      startDate: 'Jan 2021',
      endDate: '',
      current: true,
      description: '• Led the development of a high-traffic e-commerce platform using React and Node.js.\n• Optimized database queries, resulting in a 40% reduction in page load times.\n• Mentored junior developers and implemented CI/CD pipelines.'
    },
    {
      id: '2',
      company: 'Creative Solutions Inc.',
      position: 'Frontend Engineer',
      startDate: 'Jun 2018',
      endDate: 'Dec 2020',
      current: false,
      description: '• Developed responsive user interfaces for various client projects.\n• Collaborated with designers to ensure pixel-perfect implementation of UI/UX designs.\n• Reduced bundle size by 25% through code splitting and lazy loading.'
    }
  ],
  educations: [
    {
      id: '1',
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2014',
      endDate: '2018',
      current: false
    }
  ],
  skills: [
    { id: '1', name: 'React', level: 'Expert' },
    { id: '2', name: 'TypeScript', level: 'Expert' },
    { id: '3', name: 'Node.js', level: 'Advanced' },
    { id: '4', name: 'Tailwind CSS', level: 'Expert' },
    { id: '5', name: 'PostgreSQL', level: 'Intermediate' },
    { id: '6', name: 'AWS', level: 'Intermediate' }
  ],
  projects: [
    {
      id: '1',
      name: 'Lumina Dashboard',
      description: 'A real-time analytics dashboard for monitoring cloud infrastructure performance.'
    }
  ],
  template: 'modern',
};
