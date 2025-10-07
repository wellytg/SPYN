import type { ProfessionalProfile, FounderProfile, Project, GovernanceLog, SurveyQuestion, User, Contract, ContractTemplate, Application, ActivityLog, Message, CompanyProfile, RoadmapPhase } from './types';

export const DUMMY_FOUNDERS: FounderProfile[] = [
    {
      "id": "f001",
      "name": "Sarah Chen",
      "company": "TechFlow AI",
      "stage": "Pre-Seed",
      "industry": "AI/ML",
      "location": "Tulsa, OK",
      "description": "Building AI-powered workflow automation for small businesses. Our platform integrates with existing tools to streamline repetitive tasks, saving businesses an average of 15 hours per week. We are seeking a technical co-founder with deep ML expertise to lead our product development.",
      "equity_offered": "15-20%",
      "vesting": "4 years, 1 year cliff",
      "funding_raised": "$0",
      "team_size": 2,
      "revenue": "Pre-revenue",
      "looking_for": ["CTO", "Lead Engineer", "ML Specialist"],
      "verified": true,
      "avatar": "https://i.pravatar.cc/150?u=f001",
      "rating": 4.8
    },
    {
      "id": "f002",
      "name": "Marcus Johnson",
      "company": "EcoLogistics",
      "stage": "Seed",
      "industry": "GreenTech",
      "location": "Tulsa, OK",
      "description": "A sustainable delivery optimization platform that helps e-commerce businesses reduce their carbon footprint. Our algorithm optimizes delivery routes for efficiency and environmental impact. We have early traction and are looking for marketing and business development talent to scale our growth.",
      "equity_offered": "8-12%",
      "vesting": "4 years, 1 year cliff",
      "funding_raised": "$150K",
      "team_size": 4,
      "revenue": "$8K MRR",
      "looking_for": ["VP Marketing", "Business Development", "UX Designer"],
      "verified": true,
      "avatar": "https://i.pravatar.cc/150?u=f002",
      "rating": 4.6
    },
    {
      "id": "f003",
      "name": "Dr. Priya Patel",
      "company": "MedConnect",
      "stage": "Pre-Seed",
      "industry": "HealthTech",
      "location": "Tulsa, OK",
      "description": "A HIPAA-compliant telemedicine platform designed to connect patients in rural communities with specialist doctors. We aim to bridge the healthcare gap by providing accessible and affordable virtual consultations. We need technical and regulatory expertise to navigate the complex healthcare landscape.",
      "equity_offered": "10-15%",
      "vesting": "4 years, 6 month cliff",
      "funding_raised": "$25K",
      "team_size": 3,
      "revenue": "Pre-revenue",
      "looking_for": ["Full-Stack Developer", "Regulatory Consultant", "Product Manager"],
      "verified": true,
      "avatar": "https://i.pravatar.cc/150?u=f003",
      "rating": 4.9
    }
];

export const CURRENT_PROFESSIONAL: ProfessionalProfile = {
    "id": "p001",
    "name": "Alex Rodriguez",
    "title": "Senior Full-Stack Developer",
    "experience": "8 years",
    "location": "Remote (Tulsa-based)",
    "skills": ["React", "Node.js", "Python", "AWS", "PostgreSQL", "System Architecture"],
    "industries": ["FinTech", "HealthTech", "SaaS"],
    "rate": "Equity + $50/hr part-time",
    "availability": "20 hrs/week",
    "description": "Experienced full-stack developer with a background in fintech. I have successfully built and launched three SaaS products from scratch. I am looking for a meaningful equity partnership where I can make a significant technical impact.",
    "verified": true,
    "avatar": "https://i.pravatar.cc/150?u=p001",
    "rating": 4.7,
    "completed_projects": 12,
    "profileCompletion": 94,
};


export const DUMMY_PROFESSIONALS: ProfessionalProfile[] = [
  CURRENT_PROFESSIONAL,
  {
    "id": "p002",
    "name": "Jennifer Kim",
    "title": "Marketing Director",
    "experience": "10 years",
    "location": "Tulsa, OK",
    "skills": ["Digital Marketing", "Brand Strategy", "Growth Hacking", "Analytics", "Content Strategy"],
    "industries": ["B2B SaaS", "Consumer Tech", "E-commerce"],
    "rate": "Equity only",
    "availability": "30 hrs/week",
    "description": "A growth marketing expert who has scaled two startups from 0 to over $1M ARR. I specialize in creating data-driven marketing strategies for early-stage companies. Seeking an equity-only partnership with high-growth potential.",
    "verified": true,
    "avatar": "https://i.pravatar.cc/150?u=p002",
    "rating": 4.9,
    "completed_projects": 8,
    "profileCompletion": 88,
  },
  {
    "id": "p003",
    "name": "David Thompson",
    "title": "Fractional CTO",
    "experience": "15 years",
    "location": "Oklahoma City, OK",
    "skills": ["System Architecture", "Team Leadership", "DevOps", "Security", "Scalability"],
    "industries": ["Enterprise Software", "AI/ML", "Cybersecurity"],
    "rate": "2-5% equity + advisory fee",
    "availability": "15 hrs/week",
    "description": "Former CTO with two successful exits. I specialize in helping early-stage startups build scalable and secure technology foundations. I provide strategic guidance and technical leadership on a fractional basis.",
    "verified": true,
    "avatar": "https://i.pravatar.cc/150?u=p003",
    "rating": 5.0,
    "completed_projects": 15,
    "profileCompletion": 98,
  }
];

export const DUMMY_PROJECTS: Project[] = [
  {
    id: 1,
    name: 'FinTech Disruptor App',
    founder: 'Alex Johnson',
    status: 'Contract Secured',
    equity: 2.5,
    vestingYears: 4,
    vestingStartDate: new Date('2023-01-15'),
    description: 'A next-generation mobile banking application aimed at simplifying personal finance for millennials through AI-driven insights and gamified savings goals.',
    kpis: [
        { name: 'User Signups (Target)', value: '10,000 / 25,000' },
        { name: 'App Store Rating', value: '4.8 Stars' },
    ],
  },
  {
    id: 2,
    name: 'HealthTech Wearable OS',
    founder: 'Samantha Lee',
    status: 'Milestone Pending',
    equity: 3.0,
    vestingYears: 4,
    vestingStartDate: new Date('2023-09-01'),
    description: 'Developing a proprietary operating system for a new line of health-monitoring wearables, focusing on real-time data analysis and preventative health alerts.',
    kpis: [
        { name: 'Prototype Accuracy', value: '98.5%' },
        { name: 'Target Battery Life', value: '72 Hours' },
    ],
  },
];

export const DUMMY_APPLICATIONS: Application[] = [
    { id: 1, company: 'TechFlow AI', role: 'Lead Engineer', stage: 'Technical Interview', equity: '15-20%', appliedDate: '2024-07-20' },
    { id: 2, company: 'EcoLogistics', role: 'Technical Advisor', stage: 'Contract Review', equity: '2-3%', appliedDate: '2024-07-18' },
    { id: 3, company: 'MedConnect', role: 'Full-Stack Developer', stage: 'Initial Screening', equity: '8-12%', appliedDate: '2024-07-15' },
];

export const DUMMY_ACTIVITY: ActivityLog[] = [
    { id: 1, actor: 'Sarah Chen', action: 'viewed', target: 'your profile', timestamp: '2 hours ago', avatar: 'https://i.pravatar.cc/150?u=f001' },
    { id: 2, actor: 'You', action: 'sent', target: 'application to TechFlow AI', timestamp: '1 day ago', avatar: 'https://i.pravatar.cc/150?u=p001' },
    { id: 3, actor: 'Marcus Johnson', action: 'viewed', target: 'your profile', timestamp: '3 days ago', avatar: 'https://i.pravatar.cc/150?u=f002' },
];

export const DUMMY_INCOMING_MESSAGES: Message[] = [
    { id: 1, partnerName: 'Sarah Chen', snippet: "Hi Alex, thanks for applying. Your profile looks great...", timestamp: '1 day ago', status: 'Unread', avatar: 'https://i.pravatar.cc/150?u=f001' },
    { id: 2, partnerName: 'Marcus Johnson', snippet: "Following up on our conversation last week...", timestamp: '4 days ago', status: 'Read', avatar: 'https://i.pravatar.cc/150?u=f002' },
];

export const DUMMY_SENT_MESSAGES: Message[] = [
    { id: 1, partnerName: 'Dr. Priya Patel', snippet: "Hello Dr. Patel, I'm very interested in the Full-Stack role...", timestamp: '6 days ago', status: 'Read', avatar: 'https://i.pravatar.cc/150?u=f003' },
];

export const DUMMY_GOVERNANCE_LOGS: GovernanceLog[] = [
  { id: 1, timestamp: '2024-07-21 14:30:15', event: 'New Verified Partner Onboarded: Mark Chen', type: 'success' },
  { id: 2, timestamp: '2024-07-21 13:05:00', event: 'IP Assignment Confirmed for Project #1', type: 'info' },
  { id: 3, timestamp: '2024-07-20 18:00:22', event: 'Vesting Cliff Met: Jane Doe (Project #1)', type: 'success' },
  { id: 4, timestamp: '2024-07-20 11:45:10', event: 'EFS Contract Executed: FinTech Disruptor App', type: 'info' },
  { id: 5, timestamp: '2024-07-19 09:00:00', event: 'New Verified Partner Onboarded: Jane Doe', type: 'success' },
];

export const DUMMY_USERS: User[] = [
  {
    id: 101,
    name: 'Alex Johnson',
    email: 'alex.j@fintechdisrupt.com',
    role: 'Founder',
    status: 'Active',
    registeredDate: '2023-01-10',
  },
  {
    id: 102,
    name: 'Samantha Lee',
    email: 's.lee@healthwear.io',
    role: 'Founder',
    status: 'Active',
    registeredDate: '2023-08-20',
  },
  {
    id: 1, // Matches ProfessionalProfile for consistency
    name: 'Jane Doe',
    email: 'jane.d@email.com',
    role: 'Professional',
    status: 'Active',
    registeredDate: '2022-11-05',
  },
  {
    id: 2, // Matches ProfessionalProfile
    name: 'Mark Chen',
    email: 'mark.chen@design.co',
    role: 'Professional',
    status: 'Inactive',
    registeredDate: '2023-02-15',
  },
  {
    id: 3, // Matches ProfessionalProfile
    name: 'Samuel Jones',
    email: 'sam.jones@cloudarch.net',
    role: 'Professional',
    status: 'Active',
    registeredDate: '2023-05-30',
  },
  {
    id: 103,
    name: 'Priya Singh',
    email: 'priya.s@aimarketing.ai',
    role: 'Founder',
    status: 'Active',
    registeredDate: '2024-06-12',
  },
];

export const DUMMY_CONTRACTS: Contract[] = [
  {
    id: 1,
    projectName: 'FinTech Disruptor App',
    founderName: 'Alex Johnson',
    professionalName: 'Jane Doe',
    equityPercentage: 2.5,
    status: 'Executed',
    executionDate: '2024-07-20',
  },
  {
    id: 2,
    projectName: 'HealthTech Wearable OS',
    founderName: 'Samantha Lee',
    professionalName: 'Mark Chen',
    equityPercentage: 3.0,
    status: 'Executed',
    executionDate: '2024-06-15',
  },
  {
    id: 3,
    projectName: 'AI Marketing Bot',
    founderName: 'Priya Singh',
    professionalName: 'Samuel Jones',
    equityPercentage: 1.75,
    status: 'Pending Review',
    executionDate: '2024-07-22',
  },
  {
    id: 4,
    projectName: 'Eco-Friendly Logistics Platform',
    founderName: 'Alex Johnson',
    professionalName: 'Samuel Jones',
    equityPercentage: 2.0,
    status: 'Executed',
    executionDate: '2024-05-10',
  },
  {
    id: 5,
    projectName: 'Project Phoenix',
    founderName: 'Samantha Lee',
    professionalName: 'Jane Doe',
    equityPercentage: 4.0,
    status: 'Completed',
    executionDate: '2023-01-01',
  }
];

export const DUMMY_COMPANY_PROFILE: CompanyProfile = {
    id: 'c001',
    name: 'TechFlow AI',
    requiredHires: [
        { role: 'CTO / Lead Engineer', skills: ['ML Specialist', 'System Architecture', 'Python'] },
        { role: 'VP Marketing', skills: ['Growth Hacking', 'Brand Strategy'] },
        { role: 'UX Designer', skills: ['Figma', 'User Research'] },
    ],
    equityDistribution: {
        founders: 70,
        esop: 20,
        investors: 10,
    },
    budgetMode: false,
    contractsOnboarded: 5,
};

export const DUMMY_ROADMAP: RoadmapPhase[] = [
    {
        id: 'phase1',
        name: 'Discovery & Validation',
        duration: 'Q3 2024',
        requiredSkills: ['User Research', 'Market Analysis'],
        hiringProgress: { needed: 1, matched: 1 },
        status: 'completed',
    },
    {
        id: 'phase2',
        name: 'MVP Development',
        duration: 'Q4 2024',
        requiredSkills: ['React', 'Node.js', 'ML Specialist', 'System Architecture'],
        hiringProgress: { needed: 2, matched: 1 },
        status: 'inprogress',
    },
    {
        id: 'phase3',
        name: 'Beta Launch',
        duration: 'Q1 2025',
        requiredSkills: ['Growth Hacking', 'QA Testing'],
        hiringProgress: { needed: 2, matched: 0 },
        status: 'todo',
    },
     {
        id: 'phase4',
        name: 'Growth & Scaling',
        duration: 'Q2 2025',
        requiredSkills: ['DevOps', 'Brand Strategy', 'Data Analytics'],
        hiringProgress: { needed: 3, matched: 0 },
        status: 'todo',
    }
];


export const NEW_LOG_TEMPLATES: Array<{ event: string; type: GovernanceLog['type'] }> = [
  { event: 'Milestone Approved: HealthTech Wearable OS', type: 'success' },
  { event: 'Dispute Flagged: Project #3 - Review needed', type: 'warning' },
  { event: 'New EFS Contract Executed: AI Marketing Bot', type: 'info' },
  { event: 'Payment Processed for Transaction #4561', type: 'info' },
  { event: 'New Verified Partner Onboarded: Priya Singh', type: 'success' },
  { event: 'Security Audit Passed for v2.1.0', type: 'info' },
  { event: 'Equity Vesting Confirmed: Mark Chen (Project #2)', type: 'success' },
];

export const LEGAL_CLAUSE = `The Professional hereby agrees to irrevocably assign, transfer, and convey to the Company all right, title, and interest in and to any and all Intellectual Property conceived, reduced to practice, or developed by the Professional during the term of this Agreement and related to the Company’s business.`;

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
    {
        id: 'f1',
        type: 'founder',
        question: "What is your BIGGEST fear when giving away equity for services?",
        options: [
            "Giving away too much equity",
            "The partner not delivering",
            "Complex and expensive legal contracts",
            "IP not being properly assigned to the company"
        ]
    },
    {
        id: 'p1',
        type: 'professional',
        question: "What is your BIGGEST fear when accepting equity for your services?",
        options: [
            "The equity becoming worthless",
            "The founder changing the deal later",
            "Not having a clear, secure legal agreement",
            "My contributions and IP not being recognized"
        ]
    }
];

export const CONTRACT_TEMPLATES: ContractTemplate[] = [
    {
        id: 'std-efs',
        name: 'Standard EFS Agreement',
        description: 'A foundational Equity-for-Services contract covering essential terms, vesting schedules, and IP assignment. Ideal for early-stage partnerships.',
        price: null,
        category: 'Standard',
        legalText: `This Equity-for-Services Agreement ("Agreement") is made between the Company and the Professional. The Professional will perform services in exchange for an equity grant of [X]% subject to a [Y]-year vesting schedule with a 1-year cliff. All intellectual property created by the Professional under this Agreement shall be the sole property of the Company.`
    },
    {
        id: 'std-nda',
        name: 'Standard Mutual NDA',
        description: 'A non-disclosure agreement to protect confidential information shared between both parties during initial discussions and project collaboration.',
        price: null,
        category: 'Standard',
        legalText: `The parties agree to hold in confidence all proprietary information disclosed during the course of their discussions. This obligation extends for a period of three (3) years from the date of disclosure. Unauthorized use or disclosure of confidential information is strictly prohibited.`
    },
    {
        id: 'prem-efs',
        name: 'Premium EFS Agreement',
        description: 'An advanced EFS agreement with detailed milestone-based vesting, performance clauses, and specific IP protections for high-stakes projects.',
        price: 250,
        category: 'Premium',
        legalText: `In addition to standard terms, this Premium Agreement includes performance-based vesting triggers tied to specific Key Performance Indicators (KPIs) as defined in Exhibit A. Failure to meet KPIs may result in an adjustment of the equity grant. This agreement also includes a right of first refusal for the Company on future services provided by the Professional.`
    },
    {
        id: 'prem-gov',
        name: 'Premium Governance Contract',
        description: 'Includes automated milestone tracking, escrow for equity, and access to a streamlined dispute resolution process to ensure accountability.',
        price: 500,
        category: 'Premium',
        legalText: `This Governance Contract establishes a framework for automated equity release upon verified completion of milestones. All equity shall be held in escrow by SPYN and released algorithmically. Any disputes arising from milestone verification shall be submitted to SPYN's binding arbitration process.`
    }
];