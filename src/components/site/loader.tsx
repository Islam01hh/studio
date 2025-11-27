'use client';

import { Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

type LoaderProps = {
  loading: boolean;
};

export default function Loader({ loading }: LoaderProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary text-primary-foreground transition-opacity duration-1000',
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="text-center animate-fade-in-up">
        <Compass className="mx-auto h-16 w-16 animate-spin-slow" />
        <div className="mt-4 font-headline text-2xl tracking-widest">
          СЕРДЦЕ КАВКАЗА
        </div>
        <p className="text-sm text-primary-foreground/80">Загрузка...</p>
      </div>
    </div>
  );
}
