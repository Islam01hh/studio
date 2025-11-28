'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/use-favorites';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { href: '/attractions', label: 'Достопримечательности' },
  { href: '/routes', label: 'Маршруты' },
  { href: '/hotels', label: 'Отели' },
  { href: '/gallery', label: 'Галерея' },
  { href: '/about', label: 'О нас' },
  { href: '/contact', label: 'Контакты' },
];

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    
    handleScroll(); 
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    // Smooth scroll for homepage anchors, direct navigation for other pages
    if (pathname === '/' && href.startsWith('/#')) {
        const element = document.querySelector(href.substring(1));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        hasScrolled || pathname !== '/'
          ? 'bg-background/95 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className={cn("flex items-center gap-2 text-xl font-bold", hasScrolled || pathname !== '/' ? "text-primary" : "text-white")}>
            <Compass className="h-6 w-6" />
            <span className="font-headline">Адыгея</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  (hasScrolled || pathname !== '/') ? 'text-foreground/80' : 'text-white/90',
                  pathname === item.href && "text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            {favorites.length > 0 && (
               <Link
                  href="/#favorites"
                  onClick={(e) => { e.preventDefault(); handleLinkClick("/#favorites"); }}
                  className={cn(
                      "hidden sm:flex items-center gap-2 text-sm font-medium transition-colors rounded-full p-2 hover:bg-primary/10",
                       (hasScrolled || pathname !== '/') ? 'text-foreground/80 hover:text-primary' : 'text-white/90 hover:bg-white/10 hover:text-white',
                  )}
              >
                  <Star className="w-5 h-5" /> 
                  <span>{favorites.length}</span>
              </Link>
            )}

            <div className="lg:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Открыть меню"
                    className={cn("text-primary", !hasScrolled && pathname === '/' && "text-white hover:bg-white/10")}
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-background">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                      <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary" onClick={() => setIsMenuOpen(false)}>
                          <Compass className="h-6 w-6" />
                          <span className="font-headline">Адыгея</span>
                      </Link>
                    </div>
                    <nav className="flex flex-col gap-4 text-lg">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="font-medium text-foreground transition-colors hover:text-primary p-2 rounded-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                      {favorites.length > 0 && (
                          <Link
                              href="/#favorites"
                              onClick={() => { handleLinkClick("/#favorites"); setIsMenuOpen(false); }}
                              className="font-medium text-foreground transition-colors hover:text-primary p-2 rounded-md flex items-center gap-2"
                          >
                              <Star className="w-5 h-5" /> 
                              <span>Избранное ({favorites.length})</span>
                          </Link>
                      )}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
