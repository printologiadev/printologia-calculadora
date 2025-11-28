# Configuración de Variables de Entorno

## Archivo: `.env.local`

Crea o actualiza el archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# EmailJS Configuration (existing)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Supabase Configuration
# Obtén estos valores de: https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui

# Optional: Supabase Service Role Key (solo para server-side)
# CAUTION: Never expose this key in client-side code!
# SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
```

## Cómo obtener las credenciales de Supabase:

1. Ve a [Supabase Dashboard](https://app.supabase.com)
2. Selecciona tu proyecto
3. Ve a **Settings** (⚙️) → **API**
4. Copia los siguientes valores:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys** → **anon/public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Verificar configuración:

Después de agregar las variables, **reinicia el servidor de desarrollo**:

```bash
# Detén el servidor (Ctrl+C)
# Luego inicia nuevamente
bun dev
```

## Troubleshooting:

### Error: "Error getting user"
- ✅ Verifica que el archivo `.env.local` existe en la raíz del proyecto
- ✅ Verifica que las variables comienzan con `NEXT_PUBLIC_`
- ✅ Verifica que no hay espacios extra en los valores
- ✅ Reinicia el servidor de desarrollo

### Las variables no se cargan
- Next.js solo lee `.env.local` al iniciar
- Debes reiniciar el servidor después de cambiar variables de entorno
- Las variables con `NEXT_PUBLIC_` son las únicas expuestas al cliente

### Ejemplo de `.env.local` correcto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjQzMjAwMCwiZXhwIjoxOTMxOTkyMDAwfQ.example-signature-here
```

## Seguridad:

- ✅ `.env.local` está en `.gitignore` (no se sube a Git)
- ✅ `NEXT_PUBLIC_*` variables son seguras para el cliente
- ❌ **NUNCA** expongas `SUPABASE_SERVICE_ROLE_KEY` en el cliente
