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

      <footer className="bg-zinc-950 border-t border-white/10 py-12 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image
              src="/LOGO_DARK.svg"
              alt="Printología"
              width={140}
              height={35}
              className="opacity-80"
            />
            <p className="text-zinc-500 text-sm text-center md:text-left max-w-xs">
              Impresión creativa de gran formato en Monterrey. Calidad, rapidez y tecnología.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/printologiamty/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61581039116908"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="container mx-auto mt-12 pt-8 border-t border-white/5 text-center text-zinc-600 text-sm">
          &copy; {new Date().getFullYear()} Printología. Todos los derechos reservados.
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
