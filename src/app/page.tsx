'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Instagram, Facebook } from 'lucide-react';
import { Hero } from '@/components/Hero';
import { BentoGrid } from '@/components/BentoGrid';
import { PortfolioSlider } from '@/components/PortfolioSlider';
import { ModernContact } from '@/components/ModernContact';
import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/ContactModal';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500/30">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="relative z-50">
            <Image
              src="/LOGO_DARK.svg"
              alt="Printología"
              width={180}
              height={45}
              className="w-40 md:w-48"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#servicios" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Servicios
            </Link>
            <Link href="#portafolio" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Portafolio
            </Link>
            <Link href="#contacto" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Contacto
            </Link>
            <Button
              asChild
              className="bg-white text-black hover:bg-zinc-200 rounded-full px-6 font-bold"
            >
              <Link href="/calculadora">
                Cotizador Online
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-[70] p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay - Outside header */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-zinc-950/95 backdrop-blur-md z-[60] flex flex-col items-center justify-center gap-8 md:hidden">
          {/* Close button inside overlay */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white hover:text-sky-400 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>

          <Link
            href="#servicios"
            className="text-2xl font-bold hover:text-sky-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Servicios
          </Link>
          <Link
            href="#portafolio"
            className="text-2xl font-bold hover:text-sky-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Portafolio
          </Link>
          <Link
            href="#contacto"
            className="text-2xl font-bold hover:text-sky-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contacto
          </Link>
          <Button
            asChild
            size="lg"
            className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 font-bold mt-4"
          >
            <Link href="/calculadora" onClick={() => setIsMobileMenuOpen(false)}>
              Cotizador Online
            </Link>
          </Button>
        </div>
      )}

      <main>
        <Hero />
        <BentoGrid />
        <PortfolioSlider />
        <ModernContact />
      </main>

      <footer className="relative bg-zinc-950 border-t border-white/10 overflow-hidden">
        {/* Background gradient accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-sky-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <Image
                src="/LOGO_DARK.svg"
                alt="Printología"
                width={160}
                height={40}
                className="opacity-90"
              />
              <p className="text-zinc-400 text-sm leading-relaxed">
                Impresión creativa de gran formato en Monterrey. Transformamos tus ideas en realidad con calidad premium.
              </p>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.instagram.com/printologiamty/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-white/5 rounded-xl hover:bg-sky-600/20 transition-all duration-300 text-white border border-white/5 hover:border-sky-600/30"
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61581039116908"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-white/5 rounded-xl hover:bg-violet-600/20 transition-all duration-300 text-white border border-white/5 hover:border-violet-600/30"
                >
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            {/* Services Column */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg mb-4">Servicios</h3>
              <ul className="space-y-3">
                {['Lonas Publicitarias', 'Vinilos', 'DTF Textil', 'Sublimación', 'Stickers', 'Gran Formato'].map((service) => (
                  <li key={service}>
                    <Link
                      href="#servicios"
                      className="text-zinc-400 hover:text-sky-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-sky-400 transition-colors" />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-zinc-400 hover:text-sky-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-sky-400 transition-colors" />
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="#servicios" className="text-zinc-400 hover:text-sky-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-sky-400 transition-colors" />
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link href="#portafolio" className="text-zinc-400 hover:text-sky-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-sky-400 transition-colors" />
                    Portafolio
                  </Link>
                </li>
                <li>
                  <Link href="#contacto" className="text-zinc-400 hover:text-sky-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-sky-400 transition-colors" />
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/calculadora" className="text-zinc-400 hover:text-sky-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-sky-400 transition-colors" />
                    Cotizador Online
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg mb-4">Contacto</h3>
              <ul className="space-y-3 text-sm">
                <li className="text-zinc-400">
                  <span className="block text-zinc-500 text-xs mb-1">Ubicación</span>
                  Monterrey, Nuevo León
                </li>
                <li className="text-zinc-400">
                  <span className="block text-zinc-500 text-xs mb-1">WhatsApp</span>
                  <a href="https://wa.me/528143603610" className="hover:text-sky-400 transition-colors">
                    +52 814 360 3610
                  </a>
                </li>
                <li className="text-zinc-400">
                  <span className="block text-zinc-500 text-xs mb-1">Horario</span>
                  Lun - Vie: 9:00 AM - 6:00 PM
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-600 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Printología. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-xs text-zinc-600">
              <Link href="/privacidad" className="hover:text-zinc-400 transition-colors">Política de Privacidad</Link>
              <Link href="/terminos" className="hover:text-zinc-400 transition-colors">Términos de Servicio</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/528143603610"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-[#25D366]/50 transition-all duration-300 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 text-white"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        quote={null}
        pdfFile={null}
      />
    </div>
  );
}
