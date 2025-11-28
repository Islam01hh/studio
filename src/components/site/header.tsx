'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Menu, X, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/use-favorites';

const navItems = [
  { href: '#home', label: 'Главная' },
  { href: '#about', label: 'Об Адыгее'},
  { href: '#attractions', label: 'Места' },
  { href: '#routes', label: 'Маршруты' },
  { href: '#hotels', label: 'Отели' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#contact', label: 'Контакты' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const { favorites } = useFavorites();

  const visibleNavItems = navItems;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);

      const sections = visibleNavItems.map(item => document.querySelector(item.href)).filter(Boolean) as HTMLElement[];
      const scrollPosition = window.scrollY + 150;

      const currentSection = sections.find(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        return scrollPosition >= top && scrollPosition < top + height;
      });

      if (currentSection) {
        setActiveSection(`#${currentSection.id}`);
      } else if (window.scrollY < 200) {
        setActiveSection('#home');
      }
    };
    
    handleScroll(); 
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleNavItems]);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        hasScrolled
          ? 'bg-background/90 backdrop-blur-sm shadow-sm'
          : 'bg-gradient-to-b from-black/50 to-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className={cn("flex items-center gap-2 text-xl font-bold", hasScrolled ? "text-primary" : "text-white")}>
            <Compass className="h-6 w-6" />
            <span className="font-headline">Адыгея</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {visibleNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href)
                }}
                className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                    activeSection === item.href ? 'text-primary font-semibold' : (hasScrolled ? 'text-foreground/80' : 'text-white/90'),
                    !hasScrolled && activeSection === item.href && "text-white bg-white/10"
                )}
              >
                {item.label}
              </a>
            ))}
             {favorites.length > 0 && (
                <a
                    href="#favorites"
                    onClick={(e) => { e.preventDefault(); handleLinkClick("#favorites"); }}
                    className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
                        activeSection === "#favorites" ? 'text-primary font-semibold' : (hasScrolled ? 'text-foreground/80' : 'text-white/90'),
                        !hasScrolled && activeSection === "#favorites" && "text-white bg-white/10"
                    )}
                >
                    <Star className="w-4 h-4" /> 
                    <span>Избранное</span>
                    <span className="bg-primary text-primary-foreground h-5 w-5 text-xs rounded-full flex items-center justify-center">{favorites.length}</span>
                </a>
            )}
          </nav>

          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Открыть меню"
              className={cn("text-primary", !hasScrolled && "text-white hover:bg-white/10")}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      <div className={cn("lg:hidden fixed top-0 left-0 w-full h-dvh bg-background p-4 transform transition-transform duration-300 ease-in-out z-50", isMenuOpen ? 'translate-x-0' : '-translate-x-full')}>
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                <Compass className="h-6 w-6" />
                <span className="font-headline">Адыгея</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} aria-label="Закрыть меню">
                <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex flex-col items-center gap-4 text-center">
            {visibleNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-lg font-medium text-foreground transition-colors hover:text-primary w-full p-3 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
             {favorites.length > 0 && (
                <a
                    href="#favorites"
                    onClick={(e) => { e.preventDefault(); handleLinkClick("#favorites"); }}
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary w-full p-3 rounded-md flex items-center justify-center gap-2"
                >
                    <Star className="w-5 h-5" /> 
                    <span>Избранное ({favorites.length})</span>
                </a>
            )}
          </nav>
      </div>
    </header>
  );
}
