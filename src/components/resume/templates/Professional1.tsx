import React from 'react';
import {
  BaseTemplateProps,
  getFontFamily,
  getFontSize,
  getSpacing,
  formatDateRange,
} from './BaseTemplate';

// ============================================================================
// Professional Template 1: Classic Professional
// Clean, traditional ATS-optimized layout
// ============================================================================

export default function Professional1Template({ resume, config, isPrint = false }: BaseTemplateProps) {
  const fontFamily = getFontFamily(config?.fontFamily || 'inter');
  const fontSize = getFontSize(config?.fontSize || 'medium');
  const spacing = getSpacing(config?.spacing || 'normal');
  const primaryColor = config?.primaryColor || '#1e40af';
  const secondaryColor = config?.secondaryColor || '#64748b';

  const containerStyle: React.CSSProperties = {
    fontFamily,
    fontSize: fontSize.base,
    lineHeight: '1.6',
    color: '#1f2937',
    maxWidth: isPrint ? '100%' : '850px',
    margin: '0 auto',
    padding: isPrint ? '0.5in' : '2rem',
    backgroundColor: '#ffffff',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    borderBottom: `3px solid ${primaryColor}`,
    paddingBottom: '1.5rem',
    marginBottom: spacing.section,
  };

  const nameStyle: React.CSSProperties = {
    fontSize: fontSize.heading,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: '0.5rem',
  };

  const contactInfoStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem',
    fontSize: '0.95rem',
    color: secondaryColor,
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: fontSize.subheading,
    fontWeight: 'bold',
    color: primaryColor,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: `2px solid ${primaryColor}`,
    paddingBottom: '0.5rem',
    marginBottom: '1rem',
    marginTop: spacing.section,
  };

  const jobTitleStyle: React.CSSProperties = {
    fontSize: fontSize.subheading,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.25rem',
  };

  const companyStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: secondaryColor,
    fontStyle: 'italic',
    marginBottom: '0.25rem',
  };

  const dateStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    color: secondaryColor,
    marginBottom: '0.5rem',
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: '#374151',
    whiteSpace: 'pre-wrap',
  };

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <header style={headerStyle}>
        <h1 style={nameStyle}>{resume.name}</h1>
        <div style={contactInfoStyle}>
          {resume.email && <span>{resume.email}</span>}
          {resume.phone && <span>•</span>}
          {resume.phone && <span>{resume.phone}</span>}
          {resume.location && <span>•</span>}
          {resume.location && <span>{resume.location}</span>}
          {resume.linkedin && <span>•</span>}
          {resume.linkedin && (
            <a
              href={resume.linkedin}
              style={{ color: primaryColor, textDecoration: 'none' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          )}
          {resume.github && <span>•</span>}
          {resume.github && (
            <a
              href={resume.github}
              style={{ color: primaryColor, textDecoration: 'none' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
          {resume.website && <span>•</span>}
          {resume.website && (
            <a
              href={resume.website}
              style={{ color: primaryColor, textDecoration: 'none' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {resume.description && (
        <section>
          <h2 style={sectionTitleStyle}>Professional Summary</h2>
          <p style={descriptionStyle}>{resume.description}</p>
        </section>
      )}

      {/* Work Experience */}
      {resume.workHistory && resume.workHistory.length > 0 && (
        <section>
          <h2 style={sectionTitleStyle}>Professional Experience</h2>
          {resume.workHistory.map((work, index) => (
            <div key={work.id || index} style={{ marginBottom: spacing.item }}>
              <div style={jobTitleStyle}>{work.role}</div>
              <div style={companyStyle}>
                {work.companyName}
                {work.location && ` - ${work.location}`}
              </div>
              <div style={dateStyle}>{work.dateOfWork}</div>
              <div style={descriptionStyle}>{work.description}</div>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <section>
          <h2 style={sectionTitleStyle}>Education</h2>
          {resume.education.map((edu, index) => (
            <div key={edu.id || index} style={{ marginBottom: spacing.item }}>
              <div style={jobTitleStyle}>
                {edu.degree}
                {edu.field && ` in ${edu.field}`}
              </div>
              <div style={companyStyle}>
                {edu.institution}
                {edu.location && ` - ${edu.location}`}
              </div>
              <div style={dateStyle}>
                {formatDateRange(edu.startDate, edu.endDate)}
                {edu.gpa && ` | GPA: ${edu.gpa}`}
              </div>
              {edu.description && <div style={descriptionStyle}>{edu.description}</div>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <section>
          <h2 style={sectionTitleStyle}>Skills</h2>
          {resume.skills.map((skillCat, index) => (
            <div key={skillCat.id || index} style={{ marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>{skillCat.category}: </span>
              <span style={{ color: '#374151' }}>{skillCat.items.join(', ')}</span>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <section>
          <h2 style={sectionTitleStyle}>Projects</h2>
          {resume.projects.map((project, index) => (
            <div key={project.id || index} style={{ marginBottom: spacing.item }}>
              <div style={jobTitleStyle}>
                {project.projectName}
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    style={{
                      marginLeft: '0.5rem',
                      fontSize: '0.9rem',
                      color: primaryColor,
                      textDecoration: 'none',
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    [Link]
                  </a>
                )}
              </div>
              {project.technologies && project.technologies.length > 0 && (
                <div style={{ ...companyStyle, fontStyle: 'normal' }}>
                  Technologies: {project.technologies.join(', ')}
                </div>
              )}
              {(project.startDate || project.endDate) && (
                <div style={dateStyle}>{formatDateRange(project.startDate, project.endDate)}</div>
              )}
              <div style={descriptionStyle}>{project.projectDescription}</div>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <section>
          <h2 style={sectionTitleStyle}>Certifications</h2>
          {resume.certifications.map((cert, index) => (
            <div key={cert.id || index} style={{ marginBottom: spacing.item }}>
              <div style={jobTitleStyle}>
                {cert.name}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    style={{
                      marginLeft: '0.5rem',
                      fontSize: '0.9rem',
                      color: primaryColor,
                      textDecoration: 'none',
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    [Verify]
                  </a>
                )}
              </div>
              <div style={companyStyle}>{cert.issuer}</div>
              {cert.issueDate && (
                <div style={dateStyle}>
                  Issued: {cert.issueDate}
                  {cert.expiryDate && ` | Expires: ${cert.expiryDate}`}
                  {cert.credentialId && ` | ID: ${cert.credentialId}`}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Achievements */}
      {resume.achievements && resume.achievements.length > 0 && (
        <section>
          <h2 style={sectionTitleStyle}>Achievements & Awards</h2>
          {resume.achievements.map((achievement, index) => (
            <div key={achievement.id || index} style={{ marginBottom: spacing.item }}>
              <div style={jobTitleStyle}>
                {achievement.achievementName}
                {achievement.achievementUrl && (
                  <a
                    href={achievement.achievementUrl}
                    style={{
                      marginLeft: '0.5rem',
                      fontSize: '0.9rem',
                      color: primaryColor,
                      textDecoration: 'none',
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    [Link]
                  </a>
                )}
              </div>
              {achievement.date && <div style={dateStyle}>{achievement.date}</div>}
              <div style={descriptionStyle}>{achievement.achievementDescription}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
