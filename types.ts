import { View as PreviousView } from './types';

export enum View {
  Home = 'HOME',
  Opportunities = 'OPPORTUNITIES',
  Founder = 'FOUNDER',
  Professional = 'PROFESSIONAL',
  Admin = 'ADMIN',
  Contracts = 'CONTRACTS',
  Pricing = 'PRICING',
}

export interface FounderProfile {
  id: string;
  name: string;
  company: string;
  stage: string;
  industry: string;
  location: string;
  description: string;
  equity_offered: string;
  vesting: string;
  funding_raised: string;
  team_size: number;
  revenue: string;
  looking_for: string[];
  verified: boolean;
  avatar: string;
  rating: number;
}

export interface ProfessionalProfile {
  id: string;
  name: string;
  title: string;
  rating: number;
  experience: string;
  location: string;
  skills: string[];
  industries: string[];
  rate: string;
  availability: string;
  description: string;
  verified: boolean;
  avatar: string;
  completed_projects: number;
  profileCompletion: number;
  status: 'Actively Looking' | 'Open to Offers' | 'Not Looking';
  desired_equity: string;
}

export interface Project {
  id: number;
  name: string;
  founder: string;
  status: 'Contract Secured' | 'Milestone Pending' | 'Completed';
  equity: number;
  vestingYears: number;
  vestingStartDate: Date;
  description: string;
  kpis: { name: string; value: string }[];
}

export interface GovernanceLog {
  id: number;
  timestamp: string;
  event: string;
  type: 'success' | 'warning' | 'info';
}

export interface SurveyQuestion {
  id: string;
  type: 'founder' | 'professional';
  question: string;
  options: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Founder' | 'Professional';
  status: 'Active' | 'Inactive';
  registeredDate: string;
}

export interface Contract {
  id: number;
  projectName: string;
  founderName: string;
  professionalName: string;
  equityPercentage: number;
  status: 'Executed' | 'Pending Review' | 'Completed';
  executionDate: string;
}

export interface ContractTemplate {
    id: string;
    name: string;
    description: string;
    price: number | null;
    category: 'Standard' | 'Premium';
    legalText: string;
}

export interface ActivityLog {
  id: number;
  actor: string;
  action: 'viewed' | 'sent' | 'received';
  target: string;
  timestamp: string;
  avatar: string;
}

export interface Application {
    id: number;
    company: string;
    role: string;
    stage: 'Initial Screening' | 'Technical Interview' | 'Contract Review' | 'Offer';
    equity: string;
    appliedDate: string;
}

export interface Message {
    id: number;
    partnerName: string;
    snippet: string;
    timestamp: string;
    status: 'Read' | 'Unread';
    avatar: string;
}

export interface CompanyProfile {
    id: string;
    name: string;
    requiredHires: { role: string; skills: string[] }[];
    equityDistribution: {
        founders: number;
        esop: number;
        investors: number;
    };
    budgetMode: boolean;
    contractsOnboarded: number;
}

export interface RoadmapPhase {
    id: string;
    name: "Discovery & Validation" | "MVP Development" | "Beta Launch" | "Growth & Scaling";
    duration: string;
    requiredSkills: string[];
    hiringProgress: {
        needed: number;
        matched: number;
    };
    status: 'completed' | 'inprogress' | 'todo';
}