import { z } from 'zod';

// ============================================================================
// Base Types
// ============================================================================

export const WorkHistorySchema = z.object({
  id: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required'),
  role: z.string().min(1, 'Role is required'),
  dateOfWork: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required'),
  location: z.string().optional(),
});

export const ProjectSchema = z.object({
  id: z.string().optional(),
  projectName: z.string().min(1, 'Project name is required'),
  projectUrl: z.string().url().optional().or(z.literal('')),
  projectDescription: z.string().min(1, 'Description is required'),
  technologies: z.array(z.string()).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const AchievementSchema = z.object({
  id: z.string().optional(),
  achievementName: z.string().min(1, 'Achievement name is required'),
  achievementUrl: z.string().url().optional().or(z.literal('')),
  achievementDescription: z.string().min(1, 'Description is required'),
  date: z.string().optional(),
});

export const EducationSchema = z.object({
  id: z.string().optional(),
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  gpa: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
});

export const SkillCategorySchema = z.object({
  id: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  items: z.array(z.string()).min(1, 'At least one skill is required'),
});

export const CertificationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional().or(z.literal('')),
});

// ============================================================================
// Template Configuration
// ============================================================================

export const TemplateConfigSchema = z.object({
  primaryColor: z.string().default('#0ea5e9'),
  secondaryColor: z.string().default('#64748b'),
  fontFamily: z.enum(['inter', 'roboto', 'open-sans', 'lato', 'montserrat', 'playfair']).default('inter'),
  fontSize: z.enum(['small', 'medium', 'large']).default('medium'),
  spacing: z.enum(['compact', 'normal', 'relaxed']).default('normal'),
  accentStyle: z.enum(['none', 'underline', 'sidebar', 'header']).default('none'),
});

export const SectionOrderSchema = z.array(z.enum([
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'achievements',
]));

// ============================================================================
// Complete Resume Schema
// ============================================================================

export const ResumeSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  title: z.string().min(1, 'Resume title is required'),

  // Personal Information
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  github: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  location: z.string().optional(),
  description: z.string().optional(),

  // Template & Configuration
  templateId: z.string().default('professional-1'),
  templateConfig: TemplateConfigSchema.optional(),
  sectionOrder: SectionOrderSchema.optional(),

  // Resume Sections
  workHistory: z.array(WorkHistorySchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  achievements: z.array(AchievementSchema).default([]),
  education: z.array(EducationSchema).default([]),
  skills: z.array(SkillCategorySchema).default([]),
  certifications: z.array(CertificationSchema).default([]),

  // Metadata
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// ============================================================================
// TypeScript Types (inferred from schemas)
// ============================================================================

export type WorkHistory = z.infer<typeof WorkHistorySchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Achievement = z.infer<typeof AchievementSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type TemplateConfig = z.infer<typeof TemplateConfigSchema>;
export type SectionOrder = z.infer<typeof SectionOrderSchema>;
export type Resume = z.infer<typeof ResumeSchema>;

// ============================================================================
// Template Metadata
// ============================================================================

export type TemplateCategory = 'professional' | 'creative' | 'technical' | 'executive';

export interface TemplateMetadata {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  thumbnail: string;
  isPremium?: boolean;
  tags: string[];
  defaultConfig: TemplateConfig;
}

// ============================================================================
// ATS and Scoring Types
// ============================================================================

export interface ATSCheckResult {
  score: number; // 0-100
  issues: ATSIssue[];
  recommendations: string[];
  strengths: string[];
}

export interface ATSIssue {
  severity: 'critical' | 'warning' | 'info';
  category: 'formatting' | 'content' | 'keywords' | 'structure';
  message: string;
  suggestion: string;
}

export interface ResumeScore {
  overall: number; // 0-100
  completeness: number;
  contentQuality: number;
  formatting: number;
  atsCompatibility: number;
  feedback: {
    category: string;
    score: number;
    suggestions: string[];
  }[];
}

// ============================================================================
// Export Types
// ============================================================================

export type ExportFormat = 'pdf' | 'docx' | 'txt' | 'json';

export interface ExportOptions {
  format: ExportFormat;
  atsOptimized?: boolean;
  includeColors?: boolean;
  pageSize?: 'letter' | 'a4';
}
