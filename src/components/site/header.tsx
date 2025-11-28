'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '#home', label: 'Главная' },
  { href: '#about', label: 'Об Адыгее'},
  { href: '#attractions', label: 'Места' },
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
      // Проверяем, прокручена ли страница, для изменения фона хедера
      setHasScrolled(window.scrollY > 50);

      // Определяем, какая секция сейчас активна
      const sections = navItems.map(item => document.querySelector(item.href));
      const scrollPosition = window.scrollY + 150; // Смещение для более точного определения

      for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && (section as HTMLElement).offsetTop <= scrollPosition) {
              setActiveSection(navItems[i].href);
              break;
          }
      }
    };
    
    // Вызываем функцию при монтировании, чтобы установить начальное состояние
    handleScroll(); 
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Очищаем слушатель при размонтировании компонента
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setActiveSection(href);
    setIsMenuOpen(false); // Закрываем мобильное меню при клике
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
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href)
                }}
                className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                    activeSection === item.href ? 'text-primary font-semibold' : 'text-foreground/80'
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Открыть меню"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      <div className={cn("md:hidden fixed top-0 left-0 w-full h-screen bg-background p-4 transform transition-transform duration-300 ease-in-out", isMenuOpen ? 'translate-x-0' : '-translate-x-full')}>
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                <Compass className="h-6 w-6" />
                <span className="font-headline">Сердце Кавказа</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} aria-label="Закрыть меню">
                <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
      </div>
    </header>
  );
}
