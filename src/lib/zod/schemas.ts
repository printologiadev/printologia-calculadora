import { z } from 'zod';

// Esquemas para Blog Posts
export const blogPostSchema = z.object({
  id: z.string().uuid().optional(),
  titulo: z.string().min(1, 'El título es requerido').max(200, 'El título es demasiado largo'),
  slug: z.string()
    .min(1, 'El slug es requerido')
    .max(100, 'El slug es demasiado largo')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  contenido: z.string().min(1, 'El contenido es requerido'),
  extracto: z.string().max(500, 'El extracto es demasiado largo').optional(),
  imagen_url: z.string().url('URL de imagen inválida').optional().or(z.literal('')),
  meta_description: z.string().max(160, 'La meta descripción es demasiado larga').optional(),
  es_publicado: z.boolean().default(false),
  autor_id: z.string().uuid().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export type BlogPost = z.infer<typeof blogPostSchema>;

// Esquemas para formularios de contacto
export const contactFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100, 'El nombre es demasiado largo'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres').max(1000, 'El mensaje es demasiado largo'),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// Esquemas para formularios de cotización
export const quoteFormSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido').max(100, 'Nombre demasiado largo'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Teléfono inválido').max(20, 'Teléfono demasiado largo'),
  service: z.string().min(1, 'Servicio requerido'),
  details: z.string().min(10, 'Detalles requeridos').max(2000, 'Detalles demasiado largos'),
});

export type QuoteForm = z.infer<typeof quoteFormSchema>;

// Esquemas para configuración web
export const webConfigSchema = z.object({
  key: z.string().min(1, 'La clave es requerida'),
  value: z.string(),
  descripcion: z.string().optional(),
  tipo: z.enum(['text', 'image', 'json']).default('text'),
  updated_at: z.string().datetime().optional(),
});

export type WebConfig = z.infer<typeof webConfigSchema>;

// Esquemas para validación de UI state
export const uiStateSchema = z.object({
  isLoading: z.boolean().default(false),
  error: z.string().nullable().default(null),
  success: z.string().nullable().default(null),
});

export type UiState = z.infer<typeof uiStateSchema>;

// Esquemas para filtros y búsqueda
export const blogFiltersSchema = z.object({
  search: z.string().default(''),
  published: z.boolean().nullable().default(null),
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
});

export type BlogFilters = z.infer<typeof blogFiltersSchema>;