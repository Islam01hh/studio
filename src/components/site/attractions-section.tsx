import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimateOnScroll from './animate-on-scroll';

const attractions = [
  {
    id: 'plato-lagonaki',
    title: 'Плато Лагонаки',
    description: 'Высокогорное плато с альпийскими лугами',
  },
  {
    id: 'rufabgo-waterfalls',
    title: 'Водопады Руфабго',
    description: 'Каскад из 16 живописных водопадов',
  },
  {
    id: 'kazachiy-kamen',
    title: 'Казачий камень',
    description: 'Легендарная скала с панорамными видами',
  },
  {
    id: 'granite-canyon',
    title: 'Гранитный каньон',
    description: 'Уникальное геологическое образование',
  },
  {
    id: 'maykop',
    title: 'Майкоп',
    description: 'Столица республики с богатой историей',
  },
  {
    id: 'mishoko-canyon',
    title: 'Каньон Мишоко',
    description: 'Живописное ущелье с изумрудной водой',
  },
];

export default function AttractionsSection() {
  return (
    <section id="attractions" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
            <h2 className="text-center font-headline text-3xl md:text-4xl font-bold text-primary mb-12">
            Главные достопримечательности
            </h2>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction, index) => {
            const image = PlaceHolderImages.find((img) => img.id === attraction.id);
            return (
              <AnimateOnScroll key={attraction.id} delay={index * 0.1}>
                <div className="group relative overflow-hidden rounded-lg shadow-lg h-80">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="font-headline text-2xl font-bold">{attraction.title}</h3>
                    <p className="mt-1 text-white/90">{attraction.description}</p>
                    <Button asChild variant="secondary" className="mt-4 w-fit transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                      <Link href="#">
                        Подробнее <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
