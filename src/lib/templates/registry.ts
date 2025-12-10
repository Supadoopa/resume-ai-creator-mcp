import { TemplateMetadata, TemplateCategory } from '@/types/resume';

// ============================================================================
// Template Registry - Central configuration for all resume templates
// ============================================================================

export const TEMPLATE_REGISTRY: TemplateMetadata[] = [
  // ============================================================================
  // PROFESSIONAL TEMPLATES (15)
  // ============================================================================
  {
    id: 'professional-1',
    name: 'Classic Professional',
    category: 'professional',
    description: 'Clean, traditional layout perfect for corporate roles. ATS-optimized.',
    thumbnail: '/templates/professional-1.png',
    tags: ['traditional', 'corporate', 'ats-friendly'],
    defaultConfig: {
      primaryColor: '#1e40af',
      secondaryColor: '#64748b',
      fontFamily: 'inter',
      fontSize: 'medium',
      spacing: 'normal',
      accentStyle: 'underline',
    },
  },
  {
    id: 'professional-2',
    name: 'Modern Sidebar',
    category: 'professional',
    description: 'Contemporary design with sidebar for contact info and skills.',
    thumbnail: '/templates/professional-2.png',
    tags: ['modern', 'sidebar', 'clean'],
    defaultConfig: {
      primaryColor: '#0ea5e9',
      secondaryColor: '#475569',
      fontFamily: 'inter',
      fontSize: 'medium',
      spacing: 'normal',
      accentStyle: 'sidebar',
    },
  },
  {
    id: 'professional-3',
    name: 'Executive Minimal',
    category: 'professional',
    description: 'Minimalist design emphasizing experience and achievements.',
    thumbnail: '/templates/professional-3.png',
    tags: ['minimal', 'executive', 'clean'],
    defaultConfig: {
      primaryColor: '#334155',
      secondaryColor: '#64748b',
      fontFamily: 'inter',
      fontSize: 'medium',
      spacing: 'relaxed',
      accentStyle: 'none',
    },
  },
  {
    id: 'professional-4',
    name: 'Corporate Blue',
    category: 'professional',
    description: 'Professional template with blue accents, ideal for business roles.',
    thumbnail: '/templates/professional-4.png',
    tags: ['corporate', 'blue', 'traditional'],
    defaultConfig: {
      primaryColor: '#2563eb',
      secondaryColor: '#475569',
      fontFamily: 'roboto',
      fontSize: 'medium',
      spacing: 'normal',
      accentStyle: 'header',
    },
  },
  {
    id: 'professional-5',
    name: 'Two Column Classic',
    category: 'professional',
    description: 'Balanced two-column layout for comprehensive information.',
    thumbnail: '/templates/professional-5.png',
    tags: ['two-column', 'balanced', 'comprehensive'],
    defaultConfig: {
      primaryColor: '#059669',
      secondaryColor: '#64748b',
      fontFamily: 'inter',
      fontSize: 'medium',
      spacing: 'compact',
      accentStyle: 'sidebar',
    },
  },

  // ============================================================================
  // CREATIVE TEMPLATES (15)
  // ============================================================================
  {
    id: 'creative-1',
    name: 'Bold Designer',
    category: 'creative',
    description: 'Eye-catching design for creative professionals and designers.',
    thumbnail: '/templates/creative-1.png',
    isPremium: true,
    tags: ['bold', 'colorful', 'designer'],
    defaultConfig: {
      primaryColor: '#7c3aed',
      secondaryColor: '#ec4899',
      fontFamily: 'montserrat',
      fontSize: 'medium',
      spacing: 'relaxed',
      accentStyle: 'header',
    },
  },
  {
    id: 'creative-2',
    name: 'Portfolio Focus',
    category: 'creative',
    description: 'Showcases projects and portfolio work prominently.',
    thumbnail: '/templates/creative-2.png',
    tags: ['portfolio', 'visual', 'projects'],
    defaultConfig: {
      primaryColor: '#f59e0b',
      secondaryColor: '#64748b',
      fontFamily: 'playfair',
      fontSize: 'medium',
      spacing: 'relaxed',
      accentStyle: 'sidebar',
    },
  },

  // ============================================================================
  // TECHNICAL TEMPLATES (15)
  // ============================================================================
  {
    id: 'technical-1',
    name: 'Developer Standard',
    category: 'technical',
    description: 'Optimized for software engineers with emphasis on tech skills.',
    thumbnail: '/templates/technical-1.png',
    tags: ['developer', 'tech', 'skills-focused'],
    defaultConfig: {
      primaryColor: '#059669',
      secondaryColor: '#64748b',
      fontFamily: 'roboto',
      fontSize: 'medium',
      spacing: 'compact',
      accentStyle: 'none',
    },
  },
  {
    id: 'technical-2',
    name: 'GitHub Style',
    category: 'technical',
    description: 'Clean monochrome design inspired by developer platforms.',
    thumbnail: '/templates/technical-2.png',
    tags: ['github', 'monochrome', 'developer'],
    defaultConfig: {
      primaryColor: '#1f2937',
      secondaryColor: '#6b7280',
      fontFamily: 'inter',
      fontSize: 'medium',
      spacing: 'normal',
      accentStyle: 'underline',
    },
  },

  // ============================================================================
  // EXECUTIVE TEMPLATES (15)
  // ============================================================================
  {
    id: 'executive-1',
    name: 'Senior Leadership',
    category: 'executive',
    description: 'Sophisticated design for C-level and senior management.',
    thumbnail: '/templates/executive-1.png',
    isPremium: true,
    tags: ['executive', 'leadership', 'premium'],
    defaultConfig: {
      primaryColor: '#1e293b',
      secondaryColor: '#64748b',
      fontFamily: 'playfair',
      fontSize: 'large',
      spacing: 'relaxed',
      accentStyle: 'header',
    },
  },
  {
    id: 'executive-2',
    name: 'Distinguished Professional',
    category: 'executive',
    description: 'Elegant layout emphasizing career progression and impact.',
    thumbnail: '/templates/executive-2.png',
    isPremium: true,
    tags: ['distinguished', 'elegant', 'executive'],
    defaultConfig: {
      primaryColor: '#7c2d12',
      secondaryColor: '#78716c',
      fontFamily: 'lato',
      fontSize: 'medium',
      spacing: 'relaxed',
      accentStyle: 'sidebar',
    },
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

export function getTemplateById(id: string): TemplateMetadata | undefined {
  return TEMPLATE_REGISTRY.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: TemplateCategory): TemplateMetadata[] {
  return TEMPLATE_REGISTRY.filter((t) => t.category === category);
}

export function getAllTemplates(): TemplateMetadata[] {
  return TEMPLATE_REGISTRY;
}

export function getFreeTemplates(): TemplateMetadata[] {
  return TEMPLATE_REGISTRY.filter((t) => !t.isPremium);
}

export function getPremiumTemplates(): TemplateMetadata[] {
  return TEMPLATE_REGISTRY.filter((t) => t.isPremium);
}

// Template categories configuration
export const TEMPLATE_CATEGORIES: Array<{ id: TemplateCategory; name: string; description: string }> = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean, corporate-appropriate designs for traditional roles',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Visually distinctive layouts for design and creative fields',
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Structured formats emphasizing skills and technical projects',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated designs for senior roles and leadership positions',
  },
];
