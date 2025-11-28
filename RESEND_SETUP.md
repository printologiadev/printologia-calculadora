# Configuración de Resend para Emails

## 📧 ¿Qué es Resend?

Resend es un servicio moderno de envío de emails que ofrece:
- ✅ API simple y poderosa
- ✅ Templates HTML personalizados
- ✅ Analytics detallados
- ✅ Reputación de dominio automática
- ✅ Precios transparentes

## 🚀 Configuración en Vercel

### Paso 1: Crear cuenta en Resend
1. Ve a [resend.com](https://resend.com)
2. Regístrate con tu email
3. Verifica tu cuenta

### Paso 2: Obtener API Key
1. Ve a **API Keys** en tu dashboard
2. Crea una nueva API Key
3. Copia la API Key (empieza con `re_`)

### Paso 3: Configurar en Vercel
1. Ve a tu proyecto en Vercel
2. Ve a **Settings** → **Environment Variables**
3. Agrega la variable:
   ```
   Name: RESEND_API_KEY
   Value: re_tu_api_key_aqui
   Environment: Production, Preview, Development
   ```

### Paso 4: Verificar dominio (Opcional pero recomendado)
1. Ve a **Domains** en Resend
2. Agrega tu dominio (ej: `printologia.com.mx`)
3. Sigue las instrucciones DNS para verificar
4. Una vez verificado, podrás enviar desde `contacto@tu-dominio.com`

## 📧 Configuración del Formulario

### Email del remitente
Por defecto está configurado como: `contacto@printologia.com.mx`

**Cambia esto en `src/app/api/contact/route.ts`:**
```typescript
from: 'Printología <contacto@tu-dominio.com>',
```

### Email del destinatario
Por defecto envía a: `contacto@printologia.com.mx`

**Cambia esto en `src/app/api/contact/route.ts`:**
```typescript
to: ['tu-email@tu-dominio.com'],
```

## 🧪 Probar el envío

### Opción 1: Desde el sitio web
1. Ve a la sección de contacto
2. Llena el formulario
3. Envía el mensaje
4. Revisa tu email

### Opción 2: Usar cURL
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuario de Prueba",
    "email": "test@example.com",
    "phone": "1234567890",
    "message": "Este es un mensaje de prueba"
  }'
```

## 📊 Ver Analytics

1. Ve a tu dashboard de Resend
2. Ve a **Emails** para ver envíos
3. Ve a **Analytics** para estadísticas

## 🛠️ Solución de Problemas

### Error: "API key not found"
- ✅ Verifica que `RESEND_API_KEY` esté en Vercel
- ✅ Asegúrate de que empiece con `re_`
- ✅ Reinicia el deployment

### Error: "Domain not verified"
- ✅ Para desarrollo usa emails de prueba
- ✅ Para producción verifica tu dominio
- ✅ O usa `onboarding@resend.dev` como remitente

### Emails no llegan
- ✅ Revisa carpeta de spam
- ✅ Verifica la reputación del dominio
- ✅ Usa emails de prueba de Resend

## 📈 Mejores Prácticas

### Rate Limiting
Resend tiene límites generosos:
- **Free**: 3,000 emails/mes
- **Paid**: Hasta 100,000 emails/mes

### Email Design
- ✅ Usa HTML responsive
- ✅ Incluye versión texto plano
- ✅ Optimiza para móviles
- ✅ Incluye unsubscribe (si aplica)

### Seguridad
- ✅ Nunca expongas la API key en el frontend
- ✅ Valida datos en el servidor
- ✅ Usa HTTPS en producción

## 🔄 Migración desde EmailJS

Si venías usando EmailJS:

1. ✅ **API Route**: Ya creada en `/api/contact`
2. ✅ **Componente**: Actualizado para usar fetch
3. ✅ **Validación**: Mantiene validación con Zod
4. ✅ **UI**: Mejorada con mejores animaciones

## 📞 Soporte

- **Documentación**: [resend.com/docs](https://resend.com/docs)
- **Discord**: [resend.com/discord](https://resend.com/discord)
- **Email**: support@resend.com

---

**Configurado para**: Printología
**Fecha**: Noviembre 2025
**Versión**: 1.0