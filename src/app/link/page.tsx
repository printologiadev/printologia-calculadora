'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Instagram, Facebook, MessageCircle, Globe } from 'lucide-react';

export default function LinkPage() {
  const [currentLogo, setCurrentLogo] = useState('/logo_dark.svg');

  useEffect(() => {
    const root = window.document.documentElement;
    let actualTheme: 'light' | 'dark';
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      actualTheme = 'dark';
    } else {
      actualTheme = 'light';
    }

    setCurrentLogo(actualTheme === 'dark' ? '/LOGO_DARK.svg' : '/LOGO_LIGHT.svg');
  }, []);

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/printologiamty/',
      color: 'hover:text-pink-600',
      bgColor: 'bg-pink-600 hover:bg-pink-700'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/profile.php?id=61581039116908',
      color: 'hover:text-blue-600',
      bgColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/528143603610',
      color: 'hover:text-green-600',
      bgColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      name: 'Sitio Web',
      icon: Globe,
      url: 'https://www.printologia.com.mx',
      color: 'hover:text-primary',
      bgColor: 'bg-primary hover:bg-primary/90'
    }
  ];

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-background to-muted/20 dark:from-background dark:to-muted/10 flex items-center justify-center p-6">
      <div className="text-center space-y-12 max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src={currentLogo}
            alt="Printología Logo"
            width={300}
            height={75}
            className="transition-all duration-300"
            priority
          />
        </div>

        {/* Tagline */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Printología
          </h1>
          <p className="text-muted-foreground">
            Impresión creativa en todos los formatos
          </p>
        </div>

        {/* Social Media Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Button
                key={link.name}
                asChild
                size="lg"
                className={`h-20 flex flex-col gap-2 text-white ${link.bgColor} hover:scale-105 transition-all duration-300 shadow-lg`}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2"
                  aria-label={`Visitar ${link.name}`}
                >
                  <IconComponent className="h-8 w-8" />
                  <span className="text-sm font-semibold">{link.name}</span>
                </a>
              </Button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            © 2024 Printología. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}