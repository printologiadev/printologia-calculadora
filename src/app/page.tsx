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
            className="md:hidden relative z-50 p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Mobile Nav Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-zinc-950 z-40 flex flex-col items-center justify-center gap-8 md:hidden">
              <Link
                href="#servicios"
                className="text-2xl font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link
                href="#portafolio"
                className="text-2xl font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portafolio
              </Link>
              <Link
                href="#contacto"
                className="text-2xl font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </Link>
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 font-bold mt-4"
              >
                <Link href="/calculadora">
                  Cotizador Online
                </Link>
              </Button>
            </div>
          )}
        </div>
      </header>

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
              <Link href="#" className="hover:text-zinc-400 transition-colors">Política de Privacidad</Link>
              <Link href="#" className="hover:text-zinc-400 transition-colors">Términos de Servicio</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/528143603610"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
      >
        <Image
          src="/whatsapp-icon.svg"
          alt="WhatsApp"
          width={24}
          height={24}
          className="w-6 h-6 invert brightness-0"
        />
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
