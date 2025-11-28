import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Mouse } from 'lucide-react';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <section id="home" className="relative h-[80vh] min-h-[500px] max-h-[700px] flex items-center justify-center text-center text-white">
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      
      <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-4xl">
        <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-lg animate-fade-in-up">
          Откройте Сердце Кавказа
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl font-light text-white/95 drop-shadow-md animate-fade-in-up [animation-delay:200ms]">
          Ваш персональный путеводитель по удивительному миру первозданной природы, богатой культуры и гостеприимства Республики Адыгея.
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center items-start p-1">
              <div className="w-1 h-2 bg-white/80 rounded-full animate-mouse-wheel"></div>
          </div>
      </div>
    </section>
  );
}
