import Link from 'next/link';
import { MountainIcon, Phone, Mail } from 'lucide-react';
import { FaVk, FaTelegram, FaInstagram, FaYoutube } from 'react-icons/fa';

const socialLinks = [
  { href: '#', icon: FaVk },
  { href: '#', icon: FaTelegram },
  { href: '#', icon: FaInstagram },
  { href: '#', icon: FaYoutube },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <MountainIcon className="h-6 w-6" />
              <span className="font-headline">Адыгея Туризм</span>
            </Link>
            <p className="text-primary-foreground/80">
              Откройте для себя красоту Республики Адыгея
            </p>
          </div>

          <div>
            <h4 className="font-headline text-lg font-semibold mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Link href="#home" className="hover:text-white transition-colors">Главная</Link></li>
              <li><Link href="#attractions" className="hover:text-white transition-colors">Достопримечательности</Link></li>
              <li><Link href="#routes" className="hover:text-white transition-colors">Маршруты</Link></li>
              <li><Link href="#gallery" className="hover:text-white transition-colors">Галерея</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +7 (8772) 52-03-44</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@adygea-tourism.ru</li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-lg font-semibold mb-4">Следите за нами</h4>
            <div className="flex gap-4">
              {socialLinks.map(({ href, icon: Icon }, index) => (
                <a key={index} href={href} className="w-10 h-10 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-full flex items-center justify-center transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60 text-sm">
          <p>&copy; {currentYear} Путеводитель по Адыгее. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
