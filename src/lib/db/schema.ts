import { pgTable, text, timestamp, uuid, jsonb, integer } from 'drizzle-orm/pg-core';

export const resumes = pgTable('resumes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  github: text('github'),
  linkedin: text('linkedin'),
  website: text('website'),
  location: text('location'),
  description: text('description'),
  templateId: text('template_id').default('professional-1'),
  templateConfig: jsonb('template_config'), // stores colors, fonts, etc.
  sectionOrder: jsonb('section_order'), // stores custom section ordering
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const workHistory = pgTable('work_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  resumeId: uuid('resume_id').references(() => resumes.id, { onDelete: 'cascade' }),
  content: text('content'),
  companyName: text('company_name').notNull(),
  role: text('role').notNull(),
  dateOfWork: text('date_of_work').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  resumeId: uuid('resume_id').references(() => resumes.id, { onDelete: 'cascade' }),
  content: text('content'),
  projectName: text('project_name').notNull(),
  projectUrl: text('project_url'),
  projectDescription: text('project_description').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const achievements = pgTable('achievements', {
  id: uuid('id').primaryKey().defaultRandom(),
  resumeId: uuid('resume_id').references(() => resumes.id, { onDelete: 'cascade' }),
  content: text('content'),
  achievementName: text('achievement_name').notNull(),
  achievementUrl: text('achievement_url'),
  achievementDescription: text('achievement_description').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const education = pgTable('education', {
  id: uuid('id').primaryKey().defaultRandom(),
  resumeId: uuid('resume_id').references(() => resumes.id, { onDelete: 'cascade' }),
  institution: text('institution').notNull(),
  degree: text('degree').notNull(),
  field: text('field'),
  startDate: text('start_date'),
  endDate: text('end_date'),
  gpa: text('gpa'),
  description: text('description'),
  location: text('location'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const skills = pgTable('skills', {
  id: uuid('id').primaryKey().defaultRandom(),
  resumeId: uuid('resume_id').references(() => resumes.id, { onDelete: 'cascade' }),
  category: text('category').notNull(), // e.g., "Programming Languages", "Frameworks", etc.
  items: jsonb('items').notNull(), // array of skill names
  createdAt: timestamp('created_at').defaultNow(),
});

export const certifications = pgTable('certifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  resumeId: uuid('resume_id').references(() => resumes.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  issuer: text('issuer').notNull(),
  issueDate: text('issue_date'),
  expiryDate: text('expiry_date'),
  credentialId: text('credential_id'),
  credentialUrl: text('credential_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const apiKeys = pgTable('api_keys', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull().unique(),
  name: text('name').notNull(),
  key: text('key').notNull().unique(),
  lastUsed: timestamp('last_used'),
  createdAt: timestamp('created_at').defaultNow(),
});
