import { ReactNode } from 'react';
import { Resume, TemplateConfig } from '@/types/resume';

// ============================================================================
// Base Template Props
// ============================================================================

export interface BaseTemplateProps {
  resume: Resume;
  config?: TemplateConfig;
  isPreview?: boolean;
  isPrint?: boolean;
}

// ============================================================================
// Common Template Utilities
// ============================================================================

export const getFontFamily = (family: string) => {
  const fonts = {
    inter: 'Inter, sans-serif',
    roboto: 'Roboto, sans-serif',
    'open-sans': 'Open Sans, sans-serif',
    lato: 'Lato, sans-serif',
    montserrat: 'Montserrat, sans-serif',
    playfair: 'Playfair Display, serif',
  };
  return fonts[family as keyof typeof fonts] || fonts.inter;
};

export const getFontSize = (size: string) => {
  const sizes = {
    small: { base: '0.875rem', heading: '1.25rem', subheading: '1rem' },
    medium: { base: '1rem', heading: '1.5rem', subheading: '1.125rem' },
    large: { base: '1.125rem', heading: '1.75rem', subheading: '1.25rem' },
  };
  return sizes[size as keyof typeof sizes] || sizes.medium;
};

export const getSpacing = (spacing: string) => {
  const spacings = {
    compact: { section: '1rem', item: '0.5rem' },
    normal: { section: '1.5rem', item: '0.75rem' },
    relaxed: { section: '2rem', item: '1rem' },
  };
  return spacings[spacing as keyof typeof spacings] || spacings.normal;
};

// ============================================================================
// Common Template Components
// ============================================================================

export const TemplateSection = ({
  title,
  children,
  spacing = '1.5rem',
}: {
  title: string;
  children: ReactNode;
  spacing?: string;
}) => (
  <div style={{ marginBottom: spacing }}>
    <h2
      style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}
    >
      {title}
    </h2>
    {children}
  </div>
);

export const formatDate = (date?: string) => {
  if (!date) return 'Present';
  return date;
};

export const formatDateRange = (startDate?: string, endDate?: string) => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
};
