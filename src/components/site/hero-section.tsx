import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center text-white">
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
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 flex flex-col items-center px-4">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold drop-shadow-lg animate-fade-in-up [animation-delay:200ms]">
          Республика Адыгея
        </h1>
        <p className="mt-4 text-xl md:text-2xl font-light drop-shadow-md animate-fade-in-up [animation-delay:400ms]">
          Жемчужина Кавказа
        </p>
        <p className="mt-6 max-w-2xl text-base md:text-lg text-white/90 animate-fade-in-up [animation-delay:600ms]">
          Откройте для себя удивительный мир первозданной природы, богатой культуры и гостеприимства
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up [animation-delay:800ms]">
          <Button asChild size="lg" className="font-semibold">
            <Link href="#attractions">Исследовать</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary font-semibold">
            <Link href="#routes">Планировать поездку</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full animate-mouse-wheel"></div>
        </div>
      </div>
    </section>
  );
}
