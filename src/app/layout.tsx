import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AppProvider } from '@/context/app-context';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Сердце Кавказа: Путеводитель по Адыгее',
  description:
    'Откройте для себя удивительный мир первозданной природы, богатой культуры и гостеприимства Республики Адыгея. Планируйте маршруты, исследуйте достопримечательности и погрузитесь в культуру Кавказа.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={cn('font-body antialiased', inter.variable, playfairDisplay.variable)}>
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
