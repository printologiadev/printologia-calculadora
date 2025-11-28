-- ============================================================================
-- MIGRACIÓN COMPLETA: CMS y Blog para Printología
-- ============================================================================
-- Este script configura toda la base de datos necesaria para el CMS
-- Ejecutar en: Supabase SQL Editor
-- ============================================================================

-- ============================================================================
-- PARTE 1: TABLAS
-- ============================================================================

-- Tabla: blog_posts
-- Almacena todos los artículos del blog
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  titulo TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  contenido TEXT NOT NULL,
  extracto TEXT, -- Breve resumen para el listado
  imagen_url TEXT,
  meta_description TEXT,
  es_publicado BOOLEAN DEFAULT false,
  autor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Constraint para validar formato de slug (solo minúsculas, números y guiones)
  CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

-- Comentarios para documentación
COMMENT ON TABLE public.blog_posts IS 'Artículos del blog de Printología';
COMMENT ON COLUMN public.blog_posts.slug IS 'URL amigable única para SEO';
COMMENT ON COLUMN public.blog_posts.extracto IS 'Resumen breve para cards y listados';
COMMENT ON COLUMN public.blog_posts.es_publicado IS 'false = borrador, true = publicado';

-- Índices para optimización de consultas
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_posts_es_publicado_idx ON public.blog_posts(es_publicado);
CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx ON public.blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS blog_posts_autor_id_idx ON public.blog_posts(autor_id);

-- ============================================================================

-- Tabla: configuracion_web
-- Almacena configuración y URLs de contenido estático del sitio
CREATE TABLE IF NOT EXISTS public.configuracion_web (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  descripcion TEXT,
  tipo TEXT DEFAULT 'text', -- 'text', 'image', 'json'
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

COMMENT ON TABLE public.configuracion_web IS 'Configuración y contenido estático del sitio';

-- Insertar configuraciones iniciales
INSERT INTO public.configuracion_web (key, value, descripcion, tipo) VALUES
  ('hero_image', '', 'Imagen principal del hero', 'image'),
  ('logo_url', '/LOGO_DARK.svg', 'URL del logo principal', 'image'),
  ('about_image', '', 'Imagen de la sección sobre nosotros', 'image'),
  ('site_title', 'Printología', 'Título del sitio', 'text'),
  ('site_description', 'Impresión de gran formato en Monterrey', 'Descripción del sitio', 'text')
ON CONFLICT (key) DO NOTHING;

-- ============================================================================
-- PARTE 2: FUNCIONES Y TRIGGERS
-- ============================================================================

-- Función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para blog_posts
DROP TRIGGER IF EXISTS set_updated_at_blog_posts ON public.blog_posts;
CREATE TRIGGER set_updated_at_blog_posts
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- Trigger para configuracion_web
DROP TRIGGER IF EXISTS set_updated_at_configuracion_web ON public.configuracion_web;
CREATE TRIGGER set_updated_at_configuracion_web
  BEFORE UPDATE ON public.configuracion_web
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- ============================================================================

-- Función para generar slug automáticamente desde el título
CREATE OR REPLACE FUNCTION public.generate_slug(titulo TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Convertir a minúsculas, reemplazar espacios y caracteres especiales
  base_slug := lower(titulo);
  base_slug := regexp_replace(base_slug, '[áàäâ]', 'a', 'g');
  base_slug := regexp_replace(base_slug, '[éèëê]', 'e', 'g');
  base_slug := regexp_replace(base_slug, '[íìïî]', 'i', 'g');
  base_slug := regexp_replace(base_slug, '[óòöô]', 'o', 'g');
  base_slug := regexp_replace(base_slug, '[úùüû]', 'u', 'g');
  base_slug := regexp_replace(base_slug, '[ñ]', 'n', 'g');
  base_slug := regexp_replace(base_slug, '[^a-z0-9]+', '-', 'g');
  base_slug := regexp_replace(base_slug, '^-+|-+$', '', 'g');
  
  final_slug := base_slug;
  
  -- Verificar unicidad y agregar número si es necesario
  WHILE EXISTS (SELECT 1 FROM public.blog_posts WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- PARTE 3: ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Habilitar RLS en las tablas
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracion_web ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Políticas para blog_posts
-- ============================================================================

-- LECTURA: Público puede ver solo posts publicados
DROP POLICY IF EXISTS "Posts publicados son visibles públicamente" ON public.blog_posts;
CREATE POLICY "Posts publicados son visibles públicamente"
  ON public.blog_posts
  FOR SELECT
  USING (es_publicado = true);

-- LECTURA: Usuarios autenticados ven todos los posts (incluidos borradores)
DROP POLICY IF EXISTS "Usuarios autenticados ven todos los posts" ON public.blog_posts;
CREATE POLICY "Usuarios autenticados ven todos los posts"
  ON public.blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- INSERCIÓN: Solo usuarios autenticados pueden crear posts
DROP POLICY IF EXISTS "Usuarios autenticados pueden crear posts" ON public.blog_posts;
CREATE POLICY "Usuarios autenticados pueden crear posts"
  ON public.blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ACTUALIZACIÓN: Solo usuarios autenticados pueden actualizar posts
DROP POLICY IF EXISTS "Usuarios autenticados pueden actualizar posts" ON public.blog_posts;
CREATE POLICY "Usuarios autenticados pueden actualizar posts"
  ON public.blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ELIMINACIÓN: Solo usuarios autenticados pueden eliminar posts
DROP POLICY IF EXISTS "Usuarios autenticados pueden eliminar posts" ON public.blog_posts;
CREATE POLICY "Usuarios autenticados pueden eliminar posts"
  ON public.blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- Políticas para configuracion_web
-- ============================================================================

-- LECTURA: Configuración es visible públicamente
DROP POLICY IF EXISTS "Configuración es visible públicamente" ON public.configuracion_web;
CREATE POLICY "Configuración es visible públicamente"
  ON public.configuracion_web
  FOR SELECT
  USING (true);

-- ESCRITURA: Solo usuarios autenticados pueden modificar configuración
DROP POLICY IF EXISTS "Solo autenticados modifican configuración" ON public.configuracion_web;
CREATE POLICY "Solo autenticados modifican configuración"
  ON public.configuracion_web
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- PARTE 4: STORAGE BUCKETS
-- ============================================================================

-- Crear bucket para imágenes del blog
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Crear bucket para contenido estático del sitio
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-content',
  'site-content',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- PARTE 5: STORAGE POLICIES
-- ============================================================================

-- Políticas para blog-images
-- LECTURA: Público puede ver imágenes
DROP POLICY IF EXISTS "Imágenes de blog son públicas" ON storage.objects;
CREATE POLICY "Imágenes de blog son públicas"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'blog-images');

-- INSERCIÓN: Solo autenticados pueden subir
DROP POLICY IF EXISTS "Usuarios autenticados pueden subir imágenes de blog" ON storage.objects;
CREATE POLICY "Usuarios autenticados pueden subir imágenes de blog"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images');

-- ACTUALIZACIÓN: Solo autenticados pueden actualizar
DROP POLICY IF EXISTS "Usuarios autenticados pueden actualizar imágenes de blog" ON storage.objects;
CREATE POLICY "Usuarios autenticados pueden actualizar imágenes de blog"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog-images')
  WITH CHECK (bucket_id = 'blog-images');

-- ELIMINACIÓN: Solo autenticados pueden eliminar
DROP POLICY IF EXISTS "Usuarios autenticados pueden eliminar imágenes de blog" ON storage.objects;
CREATE POLICY "Usuarios autenticados pueden eliminar imágenes de blog"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images');

-- ============================================================================

-- Políticas para site-content
-- LECTURA: Público puede ver contenido
DROP POLICY IF EXISTS "Contenido del sitio es público" ON storage.objects;
CREATE POLICY "Contenido del sitio es público"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'site-content');

-- ESCRITURA: Solo autenticados pueden gestionar
DROP POLICY IF EXISTS "Usuarios autenticados pueden gestionar contenido del sitio" ON storage.objects;
CREATE POLICY "Usuarios autenticados pueden gestionar contenido del sitio"
  ON storage.objects
  FOR ALL
  TO authenticated
  USING (bucket_id = 'site-content')
  WITH CHECK (bucket_id = 'site-content');

-- ============================================================================
-- PARTE 6: DATOS DE PRUEBA (OPCIONAL - COMENTAR SI NO SE NECESITA)
-- ============================================================================

-- Post de ejemplo (requiere un usuario autenticado)
-- Descomentar y ajustar autor_id después de crear un usuario admin
/*
INSERT INTO public.blog_posts (titulo, slug, contenido, extracto, meta_description, es_publicado, autor_id)
VALUES (
  'Bienvenidos al Blog de Printología',
  'bienvenidos-blog-printologia',
  '<h2>¡Hola!</h2><p>Este es nuestro primer post en el blog de Printología. Aquí compartiremos tips, proyectos y novedades sobre impresión de gran formato.</p>',
  'Descubre nuestro nuevo blog con tips y proyectos de impresión.',
  'Blog de Printología - Tips y proyectos de impresión de gran formato en Monterrey',
  true,
  'TU_USER_ID_AQUI' -- Reemplazar con el ID del usuario admin
);
*/

-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================

-- Verificar que las tablas se crearon correctamente
DO $$
BEGIN
  RAISE NOTICE 'Verificando tablas...';
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'blog_posts') THEN
    RAISE NOTICE '✓ Tabla blog_posts creada';
  ELSE
    RAISE WARNING '✗ Tabla blog_posts NO creada';
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'configuracion_web') THEN
    RAISE NOTICE '✓ Tabla configuracion_web creada';
  ELSE
    RAISE WARNING '✗ Tabla configuracion_web NO creada';
  END IF;
  
  RAISE NOTICE 'Verificando buckets...';
  
  IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'blog-images') THEN
    RAISE NOTICE '✓ Bucket blog-images creado';
  ELSE
    RAISE WARNING '✗ Bucket blog-images NO creado';
  END IF;
  
  IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'site-content') THEN
    RAISE NOTICE '✓ Bucket site-content creado';
  ELSE
    RAISE WARNING '✗ Bucket site-content NO creado';
  END IF;
  
  RAISE NOTICE '¡Migración completada!';
END $$;

-- ============================================================================
-- FIN DE LA MIGRACIÓN
-- ============================================================================
