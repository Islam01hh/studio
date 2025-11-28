import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <section id="home" className="relative h-[60vh] min-h-[400px] max-h-[600px] flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
      
      <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-3xl">
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-lg animate-fade-in-up">
          Куда отправимся в Адыгее?
        </h1>
        <p className="mt-3 max-w-xl text-lg md:text-xl font-light text-white/95 drop-shadow-md animate-fade-in-up [animation-delay:200ms]">
          Найдите лучшие туры, достопримечательности и развлечения
        </p>
        <div className="mt-8 w-full animate-fade-in-up [animation-delay:400ms]">
          <form className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
            <Input 
              type="search" 
              placeholder="Поиск по достопримечательностям, например 'Лаго-Наки'"
              className="w-full h-14 pl-12 pr-28 rounded-full bg-white/95 text-foreground placeholder:text-muted-foreground focus:bg-white"
            />
            <Button type="submit" size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-11 px-6">
              Найти
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
