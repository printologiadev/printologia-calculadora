// 📁 EJEMPLO DE IMPLEMENTACIÓN DE IMÁGENES
// Este archivo muestra cómo implementar las imágenes con las proporciones correctas

import Image from 'next/image';

// 🎨 EJEMPLO: Sección de Servicios
export function ServiciosSection() {
  const servicios = [
    {
      titulo: 'Lonas Publicitarias',
      descripcion: 'Impresión de alta calidad en lona resistente',
      imagen: '/servicios/servicio-1.jpg'
    },
    // ... más servicios
  ];

  return (
    <section id="servicios" className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicios.map((servicio, index) => (
            <div key={index} className="group">
              {/* Imagen con proporción 16:9 para desktop */}
              <div className="relative aspect-[16/9] mb-4 overflow-hidden rounded-lg">
                <Image
                  src={servicio.imagen}
                  alt={servicio.titulo}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{servicio.titulo}</h3>
              <p className="text-zinc-400">{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 🎯 EJEMPLO: Sección de Portafolio
export function PortafolioSection() {
  const proyectos = [
    {
      titulo: 'Fachada de Restaurante',
      cliente: 'La Cumbre Bistro',
      imagen: '/portafolio/proyecto-1.jpg'
    },
    // ... más proyectos
  ];

  return (
    <section id="portafolio" className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectos.map((proyecto, index) => (
            <div key={index} className="group">
              {/* Imagen con proporción 4:3 para desktop, 1:1 para móvil */}
              <div className="relative aspect-[4/3] md:aspect-[4/3] overflow-hidden rounded-xl mb-4">
                <Image
                  src={proyecto.imagen}
                  alt={proyecto.titulo}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{proyecto.titulo}</h3>
              <p className="text-zinc-400 text-sm">{proyecto.cliente}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 🖼️ EJEMPLO: Sección Hero
export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen desktop (21:9) */}
      <Image
        src="/hero/hero-desktop.jpg"
        alt="Printología - Impresión de Gran Formato"
        fill
        className="object-cover hidden md:block"
        priority
        sizes="100vw"
      />

      {/* Imagen móvil (9:16) */}
      <Image
        src="/hero/hero-mobile.jpg"
        alt="Printología - Impresión de Gran Formato"
        fill
        className="object-cover md:hidden"
        priority
        sizes="100vw"
      />

      {/* Overlay de contenido */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Impresión Creativa de Gran Formato
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Transformamos tus ideas en realidad con calidad premium
        </p>
      </div>
    </section>
  );
}

// 📱 EJEMPLO: CSS Responsive para diferentes proporciones
/*
En tu archivo CSS global o componente:

// Servicios - 16:9 desktop, 4:3 móvil
.servicio-imagen {
  @apply aspect-[16/9] md:aspect-[16/9];
}

// Portafolio - 4:3 desktop, 1:1 móvil
.portafolio-imagen {
  @apply aspect-square md:aspect-[4/3];
}

// Hero - ultra-wide desktop, vertical móvil
.hero-imagen {
  @apply aspect-[9/16] md:aspect-[21/9];
}
*/

// 🔧 EJEMPLO: Función para verificar proporciones (desarrollo)
export function verificarProporcion(ancho: number, alto: number, relacionEsperada: number): boolean {
  const relacionActual = ancho / alto;
  const tolerancia = 0.1; // 10% de tolerancia
  return Math.abs(relacionActual - relacionEsperada) <= tolerancia;
}

// Uso:
const esProporcionCorrecta = verificarProporcion(800, 600, 4/3); // true
const es16x9 = verificarProporcion(1920, 1080, 16/9); // true

export default {
  ServiciosSection,
  PortafolioSection,
  HeroSection,
  verificarProporcion
};