import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AppProvider } from '@/context/app-context';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-headline',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Сердце Кавказа: Путеводитель по Адыгее',
  description:
    'Откройте для себя удивительный мир первозданной природы, богатой культуры и гостеприимства Республики Адыгея. Планируйте маршруты, исследуйте достопримечательности и погрузитесь в культуру Кавказа.',
  openGraph: {
    title: 'Сердце Кавказа: Путеводитель по Адыгее',
    description: 'Интерактивный путеводитель для планирования вашего идеального путешествия по Адыгее.',
    type: 'website',
    url: 'https://adygea-guide.example.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1597521193393-d232eb9491c9?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Горы Адыгеи',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={cn('font-body antialiased', inter.variable, cormorant.variable)}>
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
