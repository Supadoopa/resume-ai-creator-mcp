import React from 'react';
import {
  BaseTemplateProps,
  getFontFamily,
  getFontSize,
  getSpacing,
  formatDateRange,
} from './BaseTemplate';

// ============================================================================
// Professional Template 2: Modern Sidebar
// Contemporary two-column design with sidebar for contact and skills
// ============================================================================

export default function Professional2Template({ resume, config, isPrint = false }: BaseTemplateProps) {
  const fontFamily = getFontFamily(config?.fontFamily || 'inter');
  const fontSize = getFontSize(config?.fontSize || 'medium');
  const spacing = getSpacing(config?.spacing || 'normal');
  const primaryColor = config?.primaryColor || '#0ea5e9';
  const secondaryColor = config?.secondaryColor || '#475569';

  const containerStyle: React.CSSProperties = {
    fontFamily,
    fontSize: fontSize.base,
    lineHeight: '1.6',
    color: '#1f2937',
    maxWidth: isPrint ? '100%' : '850px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    display: 'flex',
    minHeight: isPrint ? '11in' : 'auto',
  };

  const sidebarStyle: React.CSSProperties = {
    width: '35%',
    backgroundColor: '#f8fafc',
    padding: '2rem 1.5rem',
    borderRight: `4px solid ${primaryColor}`,
  };

  const mainContentStyle: React.CSSProperties = {
    width: '65%',
    padding: '2rem',
  };

  const nameStyle: React.CSSProperties = {
    fontSize: fontSize.heading,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: '0.5rem',
    lineHeight: '1.2',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    color: secondaryColor,
    marginBottom: '1rem',
    fontWeight: '500',
  };

  const sidebarSectionStyle: React.CSSProperties = {
    marginBottom: spacing.section,
  };

  const sidebarTitleStyle: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: primaryColor,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.75rem',
    borderBottom: `2px solid ${primaryColor}`,
    paddingBottom: '0.25rem',
  };

  const contactItemStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
    color: '#374151',
    wordBreak: 'break-word',
  };

  const mainSectionTitleStyle: React.CSSProperties = {
    fontSize: fontSize.subheading,
    fontWeight: 'bold',
    color: primaryColor,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '1rem',
    marginTop: spacing.section,
    paddingBottom: '0.5rem',
    borderBottom: `2px solid ${primaryColor}`,
  };

  const jobTitleStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.25rem',
  };

  const companyStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: secondaryColor,
    marginBottom: '0.25rem',
  };

  const dateStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    color: secondaryColor,
    marginBottom: '0.5rem',
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: '#374151',
    whiteSpace: 'pre-wrap',
  };

  const skillItemStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    marginBottom: '0.4rem',
    color: '#374151',
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        {/* Name and Title */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={nameStyle}>{resume.name}</h1>
          {resume.description && (
            <p style={titleStyle}>{resume.description.split('\n')[0]}</p>
          )}
        </div>

        {/* Contact Information */}
        <div style={sidebarSectionStyle}>
          <h2 style={sidebarTitleStyle}>Contact</h2>
          {resume.email && (
            <div style={contactItemStyle}>
              <strong>Email:</strong>
              <br />
              <a
                href={`mailto:${resume.email}`}
                style={{ color: primaryColor, textDecoration: 'none' }}
              >
                {resume.email}
              </a>
            </div>
          )}
          {resume.phone && (
            <div style={contactItemStyle}>
              <strong>Phone:</strong>
              <br />
              {resume.phone}
            </div>
          )}
          {resume.location && (
            <div style={contactItemStyle}>
              <strong>Location:</strong>
              <br />
              {resume.location}
            </div>
          )}
          {resume.linkedin && (
            <div style={contactItemStyle}>
              <strong>LinkedIn:</strong>
              <br />
              <a
                href={resume.linkedin}
                style={{ color: primaryColor, textDecoration: 'none' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Profile
              </a>
            </div>
          )}
          {resume.github && (
            <div style={contactItemStyle}>
              <strong>GitHub:</strong>
              <br />
              <a
                href={resume.github}
                style={{ color: primaryColor, textDecoration: 'none' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Profile
              </a>
            </div>
          )}
          {resume.website && (
            <div style={contactItemStyle}>
              <strong>Website:</strong>
              <br />
              <a
                href={resume.website}
                style={{ color: primaryColor, textDecoration: 'none' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {resume.website.replace(/https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>

        {/* Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <div style={sidebarSectionStyle}>
            <h2 style={sidebarTitleStyle}>Skills</h2>
            {resume.skills.map((skillCat, index) => (
              <div key={skillCat.id || index} style={{ marginBottom: '1rem' }}>
                <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                  {skillCat.category}
                </div>
                {skillCat.items.map((skill, idx) => (
                  <div key={idx} style={skillItemStyle}>
                    • {skill}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {resume.certifications && resume.certifications.length > 0 && (
          <div style={sidebarSectionStyle}>
            <h2 style={sidebarTitleStyle}>Certifications</h2>
            {resume.certifications.map((cert, index) => (
              <div key={cert.id || index} style={{ marginBottom: '1rem' }}>
                <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#1f2937' }}>
                  {cert.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: secondaryColor }}>
                  {cert.issuer}
                </div>
                {cert.issueDate && (
                  <div style={{ fontSize: '0.8rem', color: secondaryColor }}>
                    {cert.issueDate}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main style={mainContentStyle}>
        {/* Professional Summary */}
        {resume.description && resume.description.includes('\n') && (
          <section>
            <h2 style={mainSectionTitleStyle}>Professional Summary</h2>
            <p style={descriptionStyle}>{resume.description}</p>
          </section>
        )}

        {/* Work Experience */}
        {resume.workHistory && resume.workHistory.length > 0 && (
          <section>
            <h2 style={mainSectionTitleStyle}>Experience</h2>
            {resume.workHistory.map((work, index) => (
              <div key={work.id || index} style={{ marginBottom: spacing.item }}>
                <div style={jobTitleStyle}>{work.role}</div>
                <div style={companyStyle}>
                  {work.companyName}
                  {work.location && ` • ${work.location}`}
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
            <h2 style={mainSectionTitleStyle}>Education</h2>
            {resume.education.map((edu, index) => (
              <div key={edu.id || index} style={{ marginBottom: spacing.item }}>
                <div style={jobTitleStyle}>
                  {edu.degree}
                  {edu.field && ` in ${edu.field}`}
                </div>
                <div style={companyStyle}>
                  {edu.institution}
                  {edu.location && ` • ${edu.location}`}
                </div>
                <div style={dateStyle}>
                  {formatDateRange(edu.startDate, edu.endDate)}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </div>
                {edu.description && <div style={descriptionStyle}>{edu.description}</div>}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {resume.projects && resume.projects.length > 0 && (
          <section>
            <h2 style={mainSectionTitleStyle}>Projects</h2>
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
                  <div style={companyStyle}>
                    {project.technologies.join(' • ')}
                  </div>
                )}
                <div style={descriptionStyle}>{project.projectDescription}</div>
              </div>
            ))}
          </section>
        )}

        {/* Achievements */}
        {resume.achievements && resume.achievements.length > 0 && (
          <section>
            <h2 style={mainSectionTitleStyle}>Achievements</h2>
            {resume.achievements.map((achievement, index) => (
              <div key={achievement.id || index} style={{ marginBottom: spacing.item }}>
                <div style={jobTitleStyle}>{achievement.achievementName}</div>
                {achievement.date && <div style={dateStyle}>{achievement.date}</div>}
                <div style={descriptionStyle}>{achievement.achievementDescription}</div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
