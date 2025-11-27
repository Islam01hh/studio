'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '#home', label: 'Главная' },
  { href: '#attractions', label: 'Достопримечательности' },
  { href: '#culture', label: 'Культура' },
  { href: '#routes', label: 'Маршруты' },
  { href: '#hotels', label: 'Отели' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#contact', label: 'Контакты' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');


  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);

      const sections = navItems.map(item => document.querySelector(item.href));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && (section as HTMLElement).offsetTop <= scrollPosition) {
              setActiveSection(navItems[i].href);
              break;
          }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        hasScrolled
          ? 'bg-background/80 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <Compass className="h-6 w-6" />
            <span className="font-headline">Сердце Кавказа</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveSection(item.href)}
                className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-primary",
                    activeSection === item.href ? 'text-primary font-semibold' : 'text-foreground/80'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Открыть меню</span>
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-background p-4">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                <Compass className="h-6 w-6" />
                <span className="font-headline">Сердце Кавказа</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Закрыть меню</span>
            </Button>
          </div>
          <nav className="flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
