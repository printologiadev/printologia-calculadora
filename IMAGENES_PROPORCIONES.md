# Guía de Imágenes - Proporciones y Medidas

## 📋 Información General

Este documento explica las proporciones recomendadas para las imágenes utilizadas en las secciones de **Servicios** y **Portafolio** del sitio web de Printología, optimizadas para desktop y móvil.

## 📁 Ubicación de Archivos

Todas las imágenes deben colocarse en la carpeta `public/` del proyecto:

```
📁 public/
├── 📁 servicios/
│   ├── servicio-1.jpg
│   ├── servicio-2.jpg
│   ├── servicio-3.jpg
│   └── servicio-4.jpg
├── 📁 portafolio/
│   ├── proyecto-1.jpg
│   ├── proyecto-2.jpg
│   ├── proyecto-3.jpg
│   └── proyecto-4.jpg
└── 📁 hero/
    ├── hero-desktop.jpg
    └── hero-mobile.jpg
```

## 🎨 Sección Servicios

### Proporciones Recomendadas

#### Desktop (≥1024px)
- **Relación de aspecto**: 16:9 (1.78:1)
- **Medidas recomendadas**:
  - Ancho: 400px - 600px
  - Alto: 225px - 338px
- **Resolución mínima**: 800x450px
- **Formato**: JPG o WebP

#### Tablet (768px - 1023px)
- **Relación de aspecto**: 16:9 (1.78:1)
- **Medidas recomendadas**:
  - Ancho: 300px - 450px
  - Alto: 169px - 253px
- **Resolución mínima**: 600x338px

#### Móvil (≤767px)
- **Relación de aspecto**: 4:3 (1.33:1)
- **Medidas recomendadas**:
  - Ancho: 280px - 350px
  - Alto: 210px - 263px
- **Resolución mínima**: 560x420px

### Nombres de Archivos

```
servicio-[número].jpg
```

**Ejemplos:**
- `servicio-1.jpg` - Lonas Publicitarias
- `servicio-2.jpg` - Vinilos Adhesivos
- `servicio-3.jpg` - DTF Textil
- `servicio-4.jpg` - Sublimación

### Implementación en Código

```tsx
// En src/components/Servicios.tsx
<Image
  src="/servicios/servicio-1.jpg"
  alt="Lonas Publicitarias"
  width={600}
  height={338}
  className="w-full h-auto object-cover rounded-lg"
/>
```

## 🎯 Sección Portafolio

### Proporciones Recomendadas

#### Desktop (≥1024px)
- **Relación de aspecto**: 4:3 (1.33:1)
- **Medidas recomendadas**:
  - Ancho: 400px - 500px
  - Alto: 300px - 375px
- **Resolución mínima**: 800x600px
- **Formato**: JPG o WebP

#### Tablet (768px - 1023px)
- **Relación de aspecto**: 4:3 (1.33:1)
- **Medidas recomendadas**:
  - Ancho: 300px - 400px
  - Alto: 225px - 300px
- **Resolución mínima**: 600x450px

#### Móvil (≤767px)
- **Relación de aspecto**: 1:1 (cuadrado)
- **Medidas recomendadas**:
  - Ancho: 280px - 320px
  - Alto: 280px - 320px
- **Resolución mínima**: 560x560px

### Nombres de Archivos

```
proyecto-[número].jpg
```

**Ejemplos:**
- `proyecto-1.jpg` - Fachada de Restaurante
- `proyecto-2.jpg` - Rotulación de Vehículo
- `proyecto-3.jpg` - Stand de Feria
- `proyecto-4.jpg` - Decoración de Evento

### Implementación en Código

```tsx
// En src/components/Portafolio.tsx
<Image
  src="/portafolio/proyecto-1.jpg"
  alt="Fachada de Restaurante"
  width={500}
  height={375}
  className="w-full h-auto object-cover rounded-lg"
/>
```

## 🖼️ Sección Hero

### Proporciones Recomendadas

#### Desktop (≥1024px)
- **Relación de aspecto**: 21:9 (2.33:1) - Ultra Wide
- **Medidas recomendadas**:
  - Ancho: 1920px - 2560px
  - Alto: 825px - 1100px
- **Resolución mínima**: 1920x825px

#### Móvil (≤767px)
- **Relación de aspecto**: 9:16 (0.56:1) - Vertical
- **Medidas recomendadas**:
  - Ancho: 750px - 1080px
  - Alto: 1334px - 1920px
- **Resolución mínima**: 750x1334px

### Nombres de Archivos

```
hero-desktop.jpg
hero-mobile.jpg
```

### Implementación en Código

```tsx
// Desktop
<Image
  src="/hero/hero-desktop.jpg"
  alt="Printología Hero"
  fill
  className="object-cover hidden md:block"
  priority
/>

// Mobile
<Image
  src="/hero/hero-mobile.jpg"
  alt="Printología Hero"
  fill
  className="object-cover md:hidden"
  priority
/>
```

## 📐 Consideraciones Técnicas

### Optimización de Imágenes

#### Formatos Recomendados
- **WebP**: Para mejor compresión y calidad
- **JPG**: Para fotografías con muchos colores
- **PNG**: Solo para imágenes con transparencias

#### Compresión
- **Calidad JPG**: 80-90%
- **WebP**: 75-85%
- **Tamaño máximo**: 500KB por imagen

### Responsive Design

#### Breakpoints Utilizados
- **Móvil**: ≤767px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥1024px

#### CSS Classes Recomendadas
```css
/* Servicios */
.w-full.h-auto.object-cover.rounded-lg

/* Portafolio */
.aspect-[4/3].object-cover.rounded-xl

/* Hero */
.object-cover.absolute.inset-0
```

## 🛠️ Herramientas Recomendadas

### Edición de Imágenes
- **Photoshop** o **GIMP**: Para edición profesional
- **TinyPNG** o **ImageOptim**: Para compresión
- **Figma** o **Sketch**: Para diseño de layouts

### Generación de Tamaños
```bash
# Usando ImageMagick
convert input.jpg -resize 800x600 output.jpg

# Usando Sharp (Node.js)
npm install sharp
```

### Verificación de Proporciones
```javascript
// Función para verificar proporciones
function checkAspectRatio(width, height, targetRatio) {
  const actualRatio = width / height;
  return Math.abs(actualRatio - targetRatio) < 0.1;
}

// Ejemplos
checkAspectRatio(800, 600, 4/3); // true
checkAspectRatio(800, 450, 16/9); // true
```

## 📋 Checklist de Implementación

### ✅ Para cada imagen verificar:
- [ ] Proporción correcta según dispositivo
- [ ] Resolución mínima cumplida
- [ ] Formato optimizado (WebP/JPG)
- [ ] Tamaño de archivo ≤500KB
- [ ] Nombre de archivo correcto
- [ ] Ubicación en carpeta apropiada

### ✅ En código verificar:
- [ ] Atributos width/height correctos
- [ ] Classes CSS responsive
- [ ] Lazy loading cuando aplique
- [ ] Alt text descriptivo
- [ ] Priority en imágenes hero

## 🚀 Próximos Pasos

1. **Crear las carpetas** `public/servicios/` y `public/portafolio/`
2. **Generar imágenes** con las proporciones especificadas
3. **Optimizar imágenes** para web
4. **Implementar en código** con las clases CSS recomendadas
5. **Probar responsive** en diferentes dispositivos

## 📞 Soporte

Si tienes dudas sobre las proporciones o implementación, contacta al equipo de desarrollo.

---

**Última actualización**: Noviembre 2025
**Versión**: 1.0
**Autor**: Equipo de Desarrollo Printología