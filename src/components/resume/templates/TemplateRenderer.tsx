import React from 'react';
import { Resume, TemplateConfig } from '@/types/resume';
import Professional1Template from './Professional1';
import Professional2Template from './Professional2';

// ============================================================================
// Template Renderer - Dynamically renders the selected template
// ============================================================================

interface TemplateRendererProps {
  resume: Resume;
  templateId?: string;
  config?: TemplateConfig;
  isPreview?: boolean;
  isPrint?: boolean;
}

// Template mapping - add new templates here as they're created
const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<any>> = {
  'professional-1': Professional1Template,
  'professional-2': Professional2Template,
  'professional-3': Professional1Template, // TODO: Create unique template
  'professional-4': Professional1Template, // TODO: Create unique template
  'professional-5': Professional1Template, // TODO: Create unique template
  'creative-1': Professional1Template, // TODO: Create unique template
  'creative-2': Professional1Template, // TODO: Create unique template
  'technical-1': Professional1Template, // TODO: Create unique template
  'technical-2': Professional1Template, // TODO: Create unique template
  'executive-1': Professional1Template, // TODO: Create unique template
  'executive-2': Professional1Template, // TODO: Create unique template
};

export default function TemplateRenderer({
  resume,
  templateId,
  config,
  isPreview = false,
  isPrint = false,
}: TemplateRendererProps) {
  const selectedTemplateId = templateId || resume.templateId || 'professional-1';
  const TemplateComponent = TEMPLATE_COMPONENTS[selectedTemplateId] || Professional1Template;

  const finalConfig = config || resume.templateConfig;

  return (
    <TemplateComponent
      resume={resume}
      config={finalConfig}
      isPreview={isPreview}
      isPrint={isPrint}
    />
  );
}
