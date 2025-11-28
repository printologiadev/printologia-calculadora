# Guía de Configuración: Base de Datos y Autenticación

## Paso 1: Ejecutar la Migración SQL

### 1.1 Acceder a Supabase
1. Ve a [Supabase Dashboard](https://app.supabase.com)
2. Selecciona tu proyecto de Printología
3. En el menú lateral, ve a **SQL Editor**

### 1.2 Ejecutar el Script
1. Haz clic en **New Query**
2. Copia todo el contenido del archivo `supabase/migrations/001_cms_setup.sql`
3. Pégalo en el editor
4. Haz clic en **Run** (o presiona Ctrl/Cmd + Enter)

### 1.3 Verificar la Ejecución
Deberías ver mensajes de verificación al final:
```
✓ Tabla blog_posts creada
✓ Tabla configuracion_web creada
✓ Bucket blog-images creado
✓ Bucket site-content creado
¡Migración completada!
```

## Paso 2: Crear Usuario Administrador

### 2.1 Opción A: Crear desde Supabase Dashboard
1. Ve a **Authentication** → **Users**
2. Haz clic en **Add user** → **Create new user**
3. Ingresa:
   - **Email**: tu email de administrador
   - **Password**: contraseña segura
   - **Auto Confirm User**: ✓ (activado)
4. Guarda el **User ID** (UUID) que se genera

### 2.2 Opción B: Crear desde SQL
```sql
-- Reemplaza con tu email y contraseña
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@printologia.com.mx', -- TU EMAIL
  crypt('TU_CONTRASEÑA_SEGURA', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  ''
);
```

## Paso 3: Verificar Configuración

### 3.1 Verificar Tablas
```sql
-- Debe retornar 2 filas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('blog_posts', 'configuracion_web');
```

### 3.2 Verificar RLS
```sql
-- Debe retornar 'true' para ambas tablas
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('blog_posts', 'configuracion_web');
```

### 3.3 Verificar Storage Buckets
```sql
-- Debe retornar 2 buckets
SELECT id, name, public 
FROM storage.buckets 
WHERE id IN ('blog-images', 'site-content');
```

## Paso 4: Configurar Variables de Entorno

Actualiza tu archivo `.env.local` con las credenciales de Supabase:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui

# IMPORTANTE: Esta clave NUNCA debe exponerse en el cliente
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
```

### Dónde encontrar las claves:
1. Ve a **Settings** → **API** en Supabase Dashboard
2. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` (solo para server-side)

## Paso 5: Probar la Conexión

Ejecuta este query para verificar que todo funciona:

```sql
-- Insertar un post de prueba (reemplaza el autor_id con tu User ID)
INSERT INTO public.blog_posts (
  titulo, 
  slug, 
  contenido, 
  extracto, 
  meta_description, 
  es_publicado,
  autor_id
) VALUES (
  'Post de Prueba',
  'post-de-prueba',
  '<p>Este es un post de prueba para verificar que todo funciona correctamente.</p>',
  'Post de prueba del sistema CMS',
  'Post de prueba - CMS Printología',
  false,
  'TU_USER_ID_AQUI' -- Reemplazar con el UUID del usuario admin
);

-- Verificar que se creó
SELECT id, titulo, slug, es_publicado, created_at 
FROM public.blog_posts;
```

## Troubleshooting

### Error: "permission denied for table blog_posts"
- Verifica que RLS esté habilitado
- Verifica que las políticas se crearon correctamente
- Asegúrate de estar autenticado al hacer queries desde el cliente

### Error: "bucket already exists"
- Es normal si ejecutas el script múltiples veces
- El script usa `ON CONFLICT DO NOTHING` para evitar errores

### Error: "function gen_random_uuid() does not exist"
- Ejecuta: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`

### No puedo subir imágenes
- Verifica que los buckets existan
- Verifica que las políticas de storage estén activas
- Revisa los límites de tamaño (5MB para blog, 10MB para site-content)

## Próximos Pasos

Una vez completada la configuración de la base de datos:

1. ✅ Base de datos configurada
2. ✅ Usuario admin creado
3. ⏭️ Implementar helpers de autenticación
4. ⏭️ Crear página de login
5. ⏭️ Crear panel de administración
6. ⏭️ Crear páginas del blog público

## Recursos Útiles

- [Documentación de Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Documentación de Storage](https://supabase.com/docs/guides/storage)
- [Guía de Autenticación](https://supabase.com/docs/guides/auth)
