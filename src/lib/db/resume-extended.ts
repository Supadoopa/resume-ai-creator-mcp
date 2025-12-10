import { db, schema } from './index';
import { eq } from 'drizzle-orm';
import { Resume } from '@/types/resume';

// ============================================================================
// Extended Resume Database Operations
// Supports full schema including education, skills, certifications, templates
// ============================================================================

export type ExtendedResumePayload = {
  userId: string;
  title: string;
  name: string;
  email: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  location?: string;
  description?: string;
  templateId?: string;
  templateConfig?: any;
  sectionOrder?: string[];
  workHistory?: Array<{
    companyName: string;
    role: string;
    dateOfWork: string;
    description: string;
    location?: string;
  }>;
  projects?: Array<{
    projectName: string;
    projectUrl?: string;
    projectDescription: string;
    technologies?: string[];
    startDate?: string;
    endDate?: string;
  }>;
  achievements?: Array<{
    achievementName: string;
    achievementUrl?: string;
    achievementDescription: string;
    date?: string;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    field?: string;
    startDate?: string;
    endDate?: string;
    gpa?: string;
    description?: string;
    location?: string;
  }>;
  skills?: Array<{
    category: string;
    items: string[];
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    issueDate?: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
  }>;
};

// ============================================================================
// Create Resume with Full Schema Support
// ============================================================================

export async function createResumeExtended(data: ExtendedResumePayload) {
  const [resume] = await db
    .insert(schema.resumes)
    .values({
      userId: data.userId,
      title: data.title,
      name: data.name,
      email: data.email,
      phone: data.phone,
      github: data.github,
      linkedin: data.linkedin,
      website: data.website,
      location: data.location,
      description: data.description,
      templateId: data.templateId || 'professional-1',
      templateConfig: data.templateConfig,
      sectionOrder: data.sectionOrder,
    })
    .returning({ id: schema.resumes.id });

  const resumeId = resume.id;

  // Insert related data in parallel
  const operations: Promise<any>[] = [];

  // Work History
  if (data.workHistory && data.workHistory.length > 0) {
    data.workHistory.forEach((entry) => {
      operations.push(
        db.insert(schema.workHistory).values({
          resumeId,
          companyName: entry.companyName,
          role: entry.role,
          dateOfWork: entry.dateOfWork,
          description: entry.description,
        })
      );
    });
  }

  // Projects
  if (data.projects && data.projects.length > 0) {
    data.projects.forEach((entry) => {
      operations.push(
        db.insert(schema.projects).values({
          resumeId,
          projectName: entry.projectName,
          projectUrl: entry.projectUrl,
          projectDescription: entry.projectDescription,
        })
      );
    });
  }

  // Achievements
  if (data.achievements && data.achievements.length > 0) {
    data.achievements.forEach((entry) => {
      operations.push(
        db.insert(schema.achievements).values({
          resumeId,
          achievementName: entry.achievementName,
          achievementUrl: entry.achievementUrl,
          achievementDescription: entry.achievementDescription,
        })
      );
    });
  }

  // Education
  if (data.education && data.education.length > 0) {
    data.education.forEach((entry) => {
      operations.push(
        db.insert(schema.education).values({
          resumeId,
          institution: entry.institution,
          degree: entry.degree,
          field: entry.field,
          startDate: entry.startDate,
          endDate: entry.endDate,
          gpa: entry.gpa,
          description: entry.description,
          location: entry.location,
        })
      );
    });
  }

  // Skills
  if (data.skills && data.skills.length > 0) {
    data.skills.forEach((entry) => {
      operations.push(
        db.insert(schema.skills).values({
          resumeId,
          category: entry.category,
          items: entry.items,
        })
      );
    });
  }

  // Certifications
  if (data.certifications && data.certifications.length > 0) {
    data.certifications.forEach((entry) => {
      operations.push(
        db.insert(schema.certifications).values({
          resumeId,
          name: entry.name,
          issuer: entry.issuer,
          issueDate: entry.issueDate,
          expiryDate: entry.expiryDate,
          credentialId: entry.credentialId,
          credentialUrl: entry.credentialUrl,
        })
      );
    });
  }

  await Promise.all(operations);

  return resumeId;
}

// ============================================================================
// Update Resume with Full Schema Support
// ============================================================================

export async function updateResumeExtended(id: string, data: ExtendedResumePayload) {
  await db.transaction(async (tx) => {
    // Update main resume record
    await tx
      .update(schema.resumes)
      .set({
        title: data.title,
        name: data.name,
        email: data.email,
        phone: data.phone,
        github: data.github,
        linkedin: data.linkedin,
        website: data.website,
        location: data.location,
        description: data.description,
        templateId: data.templateId,
        templateConfig: data.templateConfig,
        sectionOrder: data.sectionOrder,
        updatedAt: new Date(),
      })
      .where(eq(schema.resumes.id, id));

    // Delete all related records
    await Promise.all([
      tx.delete(schema.workHistory).where(eq(schema.workHistory.resumeId, id)),
      tx.delete(schema.projects).where(eq(schema.projects.resumeId, id)),
      tx.delete(schema.achievements).where(eq(schema.achievements.resumeId, id)),
      tx.delete(schema.education).where(eq(schema.education.resumeId, id)),
      tx.delete(schema.skills).where(eq(schema.skills.resumeId, id)),
      tx.delete(schema.certifications).where(eq(schema.certifications.resumeId, id)),
    ]);

    // Re-insert all related records
    const operations: Promise<any>[] = [];

    // Work History
    if (data.workHistory && data.workHistory.length > 0) {
      data.workHistory.forEach((entry) => {
        operations.push(
          tx.insert(schema.workHistory).values({
            resumeId: id,
            companyName: entry.companyName,
            role: entry.role,
            dateOfWork: entry.dateOfWork,
            description: entry.description,
          })
        );
      });
    }

    // Projects
    if (data.projects && data.projects.length > 0) {
      data.projects.forEach((entry) => {
        operations.push(
          tx.insert(schema.projects).values({
            resumeId: id,
            projectName: entry.projectName,
            projectUrl: entry.projectUrl,
            projectDescription: entry.projectDescription,
          })
        );
      });
    }

    // Achievements
    if (data.achievements && data.achievements.length > 0) {
      data.achievements.forEach((entry) => {
        operations.push(
          tx.insert(schema.achievements).values({
            resumeId: id,
            achievementName: entry.achievementName,
            achievementUrl: entry.achievementUrl,
            achievementDescription: entry.achievementDescription,
          })
        );
      });
    }

    // Education
    if (data.education && data.education.length > 0) {
      data.education.forEach((entry) => {
        operations.push(
          tx.insert(schema.education).values({
            resumeId: id,
            institution: entry.institution,
            degree: entry.degree,
            field: entry.field,
            startDate: entry.startDate,
            endDate: entry.endDate,
            gpa: entry.gpa,
            description: entry.description,
            location: entry.location,
          })
        );
      });
    }

    // Skills
    if (data.skills && data.skills.length > 0) {
      data.skills.forEach((entry) => {
        operations.push(
          tx.insert(schema.skills).values({
            resumeId: id,
            category: entry.category,
            items: entry.items,
          })
        );
      });
    }

    // Certifications
    if (data.certifications && data.certifications.length > 0) {
      data.certifications.forEach((entry) => {
        operations.push(
          tx.insert(schema.certifications).values({
            resumeId: id,
            name: entry.name,
            issuer: entry.issuer,
            issueDate: entry.issueDate,
            expiryDate: entry.expiryDate,
            credentialId: entry.credentialId,
            credentialUrl: entry.credentialUrl,
          })
        );
      });
    }

    await Promise.all(operations);
  });

  return id;
}

// ============================================================================
// Get Complete Resume
// ============================================================================

export async function getResumeExtended(id: string): Promise<Resume | null> {
  const [resume] = await db.select().from(schema.resumes).where(eq(schema.resumes.id, id));
  if (!resume) return null;

  const [work, projects, achievements, education, skills, certifications] = await Promise.all([
    db.select().from(schema.workHistory).where(eq(schema.workHistory.resumeId, id)),
    db.select().from(schema.projects).where(eq(schema.projects.resumeId, id)),
    db.select().from(schema.achievements).where(eq(schema.achievements.resumeId, id)),
    db.select().from(schema.education).where(eq(schema.education.resumeId, id)),
    db.select().from(schema.skills).where(eq(schema.skills.resumeId, id)),
    db.select().from(schema.certifications).where(eq(schema.certifications.resumeId, id)),
  ]);

  return {
    id: resume.id,
    userId: resume.userId,
    title: resume.title,
    name: resume.name,
    email: resume.email,
    phone: resume.phone || undefined,
    github: resume.github || undefined,
    linkedin: resume.linkedin || undefined,
    website: resume.website || undefined,
    location: resume.location || undefined,
    description: resume.description || undefined,
    templateId: resume.templateId || 'professional-1',
    templateConfig: resume.templateConfig as any,
    sectionOrder: resume.sectionOrder as any,
    workHistory: work.map((w) => ({
      id: w.id,
      companyName: w.companyName,
      role: w.role,
      dateOfWork: w.dateOfWork,
      description: w.description,
    })),
    projects: projects.map((p) => ({
      id: p.id,
      projectName: p.projectName,
      projectUrl: p.projectUrl || undefined,
      projectDescription: p.projectDescription,
    })),
    achievements: achievements.map((a) => ({
      id: a.id,
      achievementName: a.achievementName,
      achievementUrl: a.achievementUrl || undefined,
      achievementDescription: a.achievementDescription,
    })),
    education: education.map((e) => ({
      id: e.id,
      institution: e.institution,
      degree: e.degree,
      field: e.field || undefined,
      startDate: e.startDate || undefined,
      endDate: e.endDate || undefined,
      gpa: e.gpa || undefined,
      description: e.description || undefined,
      location: e.location || undefined,
    })),
    skills: skills.map((s) => ({
      id: s.id,
      category: s.category,
      items: (s.items as string[]) || [],
    })),
    certifications: certifications.map((c) => ({
      id: c.id,
      name: c.name,
      issuer: c.issuer,
      issueDate: c.issueDate || undefined,
      expiryDate: c.expiryDate || undefined,
      credentialId: c.credentialId || undefined,
      credentialUrl: c.credentialUrl || undefined,
    })),
    createdAt: resume.createdAt || undefined,
    updatedAt: resume.updatedAt || undefined,
  };
}

// ============================================================================
// Delete Resume (handles all cascading deletes)
// ============================================================================

export async function deleteResumeExtended(id: string) {
  await db.transaction(async (tx) => {
    await Promise.all([
      tx.delete(schema.workHistory).where(eq(schema.workHistory.resumeId, id)),
      tx.delete(schema.projects).where(eq(schema.projects.resumeId, id)),
      tx.delete(schema.achievements).where(eq(schema.achievements.resumeId, id)),
      tx.delete(schema.education).where(eq(schema.education.resumeId, id)),
      tx.delete(schema.skills).where(eq(schema.skills.resumeId, id)),
      tx.delete(schema.certifications).where(eq(schema.certifications.resumeId, id)),
    ]);
    await tx.delete(schema.resumes).where(eq(schema.resumes.id, id));
  });
}

// ============================================================================
// List Resumes for User
// ============================================================================

export async function listResumesExtended(userId: string, limit = 20) {
  const rows = await db
    .select()
    .from(schema.resumes)
    .where(eq(schema.resumes.userId, userId))
    .orderBy(schema.resumes.createdAt)
    .limit(limit);
  return rows;
}

// ============================================================================
// Duplicate Resume
// ============================================================================

export async function duplicateResume(originalId: string, userId: string, newTitle?: string) {
  const original = await getResumeExtended(originalId);
  if (!original) throw new Error('Resume not found');

  // Create new resume with same data
  const payload: ExtendedResumePayload = {
    userId,
    title: newTitle || `${original.title} (Copy)`,
    name: original.name,
    email: original.email,
    phone: original.phone,
    github: original.github,
    linkedin: original.linkedin,
    website: original.website,
    location: original.location,
    description: original.description,
    templateId: original.templateId,
    templateConfig: original.templateConfig,
    sectionOrder: original.sectionOrder,
    workHistory: original.workHistory?.map(w => ({
      companyName: w.companyName,
      role: w.role,
      dateOfWork: w.dateOfWork,
      description: w.description,
    })),
    projects: original.projects?.map(p => ({
      projectName: p.projectName,
      projectUrl: p.projectUrl,
      projectDescription: p.projectDescription,
    })),
    achievements: original.achievements?.map(a => ({
      achievementName: a.achievementName,
      achievementUrl: a.achievementUrl,
      achievementDescription: a.achievementDescription,
    })),
    education: original.education?.map(e => ({
      institution: e.institution,
      degree: e.degree,
      field: e.field,
      startDate: e.startDate,
      endDate: e.endDate,
      gpa: e.gpa,
      description: e.description,
      location: e.location,
    })),
    skills: original.skills?.map(s => ({
      category: s.category,
      items: s.items,
    })),
    certifications: original.certifications?.map(c => ({
      name: c.name,
      issuer: c.issuer,
      issueDate: c.issueDate,
      expiryDate: c.expiryDate,
      credentialId: c.credentialId,
      credentialUrl: c.credentialUrl,
    })),
  };

  return await createResumeExtended(payload);
}
