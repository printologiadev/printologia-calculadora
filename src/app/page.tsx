'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/ContactModal';
import { ContactForm } from '@/components/ContactForm';
import { Moon, Sun, Monitor, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [currentLogo, setCurrentLogo] = useState('/logo_dark.svg');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let actualTheme: 'light' | 'dark';
    if (theme === 'system') {
      actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(actualTheme);
    } else {
      actualTheme = theme;
      root.classList.add(theme);
    }

    // Set logo based on actual theme
    setCurrentLogo(actualTheme === 'dark' ? '/LOGO_DARK.svg' : '/LOGO_LIGHT.svg');
  }, [theme]);

  // Scroll animations
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observerRef.current?.observe(section));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-background to-muted/20 dark:from-background dark:to-muted/10">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 border-b-2 border-border/80 bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/95 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Image
            src={currentLogo}
            alt="Printología Logo"
            width={240}
            height={60}
            className="transition-all duration-300"
          />
        </div>

        {/* Desktop: Navigation & Contact Button */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <a href="#hero" className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors">Inicio</a>
            <a href="#servicios" className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors">Servicios</a>
            <a href="#beneficios" className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors">Beneficios</a>
            <a href="#portafolio" className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors">Portafolio</a>
            <a href="#testimonios" className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors">Testimonios</a>
            <a href="#contacto" className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors">Contacto</a>
          </nav>
          <Button asChild variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/calculadora">
              Cotizar Ahora
            </Link>
          </Button>
        </div>

        {/* Mobile: Menu & Contact Button */}
        <div className="md:hidden flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <a href="#hero" className="flex items-center font-semibold">Inicio</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#servicios" className="flex items-center font-semibold">Servicios</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#beneficios" className="flex items-center font-semibold">Beneficios</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#portafolio" className="flex items-center font-semibold">Portafolio</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#testimonios" className="flex items-center font-semibold">Testimonios</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#contacto" className="flex items-center font-semibold">Contacto</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
            <Link href="/calculadora">
              Cotizar
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content - Landing Page */}
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/10 to-background px-6">
          <div className="text-center space-y-8 max-w-4xl">
            <h1 className="text-4xl md:text-7xl font-bold text-foreground">
              Impresión creativa en todos los formatos
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Lonas, vinilos, sublimación, DTF, stickers y más en Monterrey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                <Link href="/calculadora">
                  Cotiza tu proyecto
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg">
                <Link href="/link">
                  Redes Sociales
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-20 px-6 bg-gradient-to-br from-background via-muted/10 to-background opacity-0">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Nuestros Servicios
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tecnología de vanguardia para dar vida a tus ideas creativas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Lonas Publicitarias */}
              <div className="group relative bg-background p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">Lonas Publicitarias</h3>
                  <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                    Impresiones de alta calidad para exteriores e interiores. Ideales para eventos corporativos y publicidad urbana.
                  </p>
                  <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-semibold">
                    <span>Explorar servicio</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Vinilos */}
              <div className="group relative bg-background p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-2xl">🚗</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-purple-900 dark:text-purple-100">Vinilos</h3>
                  <p className="text-purple-700 dark:text-purple-300 leading-relaxed">
                    Vinilos adhesivos personalizados para vehículos, paredes y decoración. Acabados premium y duraderos.
                  </p>
                  <div className="mt-6 flex items-center text-purple-600 dark:text-purple-400 font-semibold">
                    <span>Explorar servicio</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Sublimación */}
              <div className="group relative bg-background p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-2xl">👕</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-pink-900 dark:text-pink-100">Sublimación</h3>
                  <p className="text-pink-700 dark:text-pink-300 leading-relaxed">
                    Impresión directa en textiles y objetos. Colores vibrantes que se integran perfectamente al material.
                  </p>
                  <div className="mt-6 flex items-center text-pink-600 dark:text-pink-400 font-semibold">
                    <span>Explorar servicio</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* DTF */}
              <div className="group relative bg-background p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-green-900 dark:text-green-100">DTF</h3>
                  <p className="text-green-700 dark:text-green-300 leading-relaxed">
                    Direct to Film para prendas oscuras. Alta definición, resistencia y versatilidad en diseños complejos.
                  </p>
                  <div className="mt-6 flex items-center text-green-600 dark:text-green-400 font-semibold">
                    <span>Explorar servicio</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Stickers */}
              <div className="group relative bg-background p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-2xl">🏷️</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-orange-900 dark:text-orange-100">Stickers</h3>
                  <p className="text-orange-700 dark:text-orange-300 leading-relaxed">
                    Stickers personalizados en diversos materiales, formas y acabados. Perfectos para branding y decoración.
                  </p>
                  <div className="mt-6 flex items-center text-orange-600 dark:text-orange-400 font-semibold">
                    <span>Explorar servicio</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Gran Formato */}
              <div className="group relative bg-background p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-2xl">📐</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-100">Gran Formato</h3>
                  <p className="text-indigo-700 dark:text-indigo-300 leading-relaxed">
                    Impresiones de hasta 160cm x 360cm. Tecnología de vanguardia para proyectos de gran escala.
                  </p>
                  <div className="mt-6 flex items-center text-indigo-600 dark:text-indigo-400 font-semibold">
                    <span>Explorar servicio</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="text-center mt-16">
              <p className="text-lg text-muted-foreground mb-6">
                ¿Tienes un proyecto especial en mente?
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/calculadora">
                  Calcular mi proyecto
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="beneficios" className="py-16 px-6 opacity-0">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">¿Por qué elegir Printología?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-white font-bold text-lg">★</span>
                </div>
                <h3 className="font-semibold">Calidad Superior</h3>
                <p className="text-sm text-muted-foreground">Tecnología de impresión de vanguardia para resultados excepcionales.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-white font-bold text-lg">⚡</span>
                </div>
                <h3 className="font-semibold">Entrega Rápida</h3>
                <p className="text-sm text-muted-foreground">Tiempos de entrega optimizados sin comprometer la calidad.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-white font-bold text-lg">👥</span>
                </div>
                <h3 className="font-semibold">Atención Personalizada</h3>
                <p className="text-sm text-muted-foreground">Asesoría especializada para cada proyecto único.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-white font-bold text-lg">🎨</span>
                </div>
                <h3 className="font-semibold">Versatilidad</h3>
                <p className="text-sm text-muted-foreground">Amplia gama de productos y técnicas de impresión.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="portafolio" className="py-16 px-6 bg-muted/20 opacity-0">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nuestro Portafolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background p-4 rounded-lg shadow-sm border">
                <div className="aspect-video bg-muted rounded mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground">Imagen de Lona Publicitaria</span>
                </div>
                <p className="text-sm text-muted-foreground">Proyecto de lonas para evento corporativo</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border">
                <div className="aspect-video bg-muted rounded mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground">Imagen de Vinilos</span>
                </div>
                <p className="text-sm text-muted-foreground">Vinilos decorativos para vehículo</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border">
                <div className="aspect-video bg-muted rounded mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground">Imagen de Stickers</span>
                </div>
                <p className="text-sm text-muted-foreground">Stickers personalizados para marca</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonios" className="py-16 px-6 opacity-0">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Clientes Satisfechos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <p className="text-muted-foreground mb-4">&quot;Excelente calidad y rapidez en la entrega. Recomiendo Printología para todos sus proyectos de impresión.&quot;</p>
                <p className="font-semibold">- Juan Pérez, Empresa XYZ</p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <p className="text-muted-foreground mb-4">&quot;El servicio personalizado y la atención al detalle hicieron que nuestro evento fuera un éxito.&quot;</p>
                <p className="font-semibold">- María García, EventPlanner</p>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section id="cta" className="py-16 px-6 bg-primary text-primary-foreground opacity-0">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Imprime tu idea hoy mismo</h2>
            <p className="text-lg mb-8 opacity-90">Contáctanos para una cotización personalizada</p>
            <Button asChild variant="secondary" size="lg" className="px-8 py-4 text-lg">
              <a href="https://wa.me/528143603610" target="_blank" rel="noopener noreferrer">
                Contactar por WhatsApp
              </a>
            </Button>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-16 px-6 bg-muted/20 opacity-0">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h2>
              <p className="text-lg text-muted-foreground">Estamos aquí para ayudarte con tus proyectos de impresión</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">📍</span>
                    </div>
                    <div>
                      <p className="font-semibold">Dirección</p>
                      <p className="text-muted-foreground">Narciso Mendoza 4212, Niño Artillero, Monterrey</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">📞</span>
                    </div>
                    <div>
                      <p className="font-semibold">Teléfono</p>
                      <p className="text-muted-foreground">(81) 1234-5678</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">✉️</span>
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">ventasprintologia@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">🕒</span>
                    </div>
                    <div>
                      <p className="font-semibold">Horarios</p>
                      <p className="text-muted-foreground">Lunes a Viernes: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6">Envíanos un Mensaje</h3>
                <ContactForm quote={null} pdfFile={null} />
              </div>
            </div>
          </div>
        </section>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/528143603610"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 whatsapp-pulse"
          aria-label="Contactar por WhatsApp"
        >
          <Image
            src="/whatsapp-icon.svg"
            alt="WhatsApp"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </a>

        {/* Footer */}
        <footer className="bg-background border-t py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Logo */}
              <div className="flex flex-col items-center md:items-start">
                <Image
                  src={currentLogo}
                  alt="Printología Logo"
                  width={180}
                  height={45}
                  className="mb-4"
                />
                <p className="text-sm text-muted-foreground text-center md:text-left">
                  Impresiones de gran formato en Monterrey
                </p>
              </div>

              {/* Navigation */}
              <div>
                <h3 className="font-semibold mb-4">Navegación</h3>
                <nav className="flex flex-col space-y-2">
                  <a href="#hero" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Inicio</a>
                  <a href="#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Servicios</a>
                  <a href="#beneficios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Beneficios</a>
                  <a href="#portafolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Portafolio</a>
                  <a href="#testimonios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonios</a>
                  <a href="/calculadora" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Calculadora</a>
                </nav>
              </div>

              {/* Contact */}
              <div>
                <h3 className="font-semibold mb-4">Contacto</h3>
                <p className="text-sm text-muted-foreground">
                  Dirección: Narciso Mendoza 4212, Niño Artillero, Monterrey<br />
                  Teléfono: (81) 1234-5678<br />
                  Email: ventasprintologia@gmail.com
                </p>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-semibold mb-4">Síguenos</h3>
                <div className="flex gap-6">
                  <a href="https://www.facebook.com/profile.php?id=61581039116908" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    <Image
                      src="/icons8-facebook (2).svg"
                      alt="Facebook"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </a>
                  <a href="https://www.instagram.com/printologiamty/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-pink-600 transition-colors">
                    <Image
                      src="/icons8-instagram-64 (1).png"
                      alt="Instagram"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-black transition-colors">
                    <Image
                      src="/icons8-tik-tok-64.png"
                      alt="TikTok"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
              <p className="mb-4 md:mb-0">&copy; 2024 Printología. Todos los derechos reservados. | <a href="#" className="hover:text-foreground">Aviso de Privacidad</a> | <a href="#" className="hover:text-foreground">Términos de Servicio</a></p>
              <div className="flex gap-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTheme('light')}
                  className="h-8 w-8 p-0"
                  aria-label="Cambiar a tema claro"
                >
                  <Sun className="h-4 w-4" />
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                  className="h-8 w-8 p-0"
                  aria-label="Cambiar a tema oscuro"
                >
                  <Moon className="h-4 w-4" />
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTheme('system')}
                  className="h-8 w-8 p-0"
                  aria-label="Usar tema del sistema"
                >
                  <Monitor className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        quote={null}
        pdfFile={null}
      />
    </div>
  );
}
