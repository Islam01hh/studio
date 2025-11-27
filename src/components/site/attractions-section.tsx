'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import { Maximize } from 'lucide-react';
import AnimateOnScroll from './animate-on-scroll';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const attractions = [
  {
    id: 'plato-lagonaki',
    title: 'Плато Лагонаки',
    description: 'Высокогорное плато с альпийскими лугами, часть Кавказского заповедника. Уникальная флора и фауна, карстовые пещеры и панорамные виды.',
  },
  {
    id: 'rufabgo-waterfalls',
    title: 'Водопады Руфабго',
    description: 'Каскад из 16 живописных водопадов в ущелье реки Руфабго, оборудованная тропа для туристов.',
  },
  {
    id: 'khadzhokh-gorge',
    title: 'Хаджохская теснина',
    description: 'Узкий и глубокий каньон реки Белой с бурным потоком воды, оборудованный для посещения.',
  },
  {
    id: 'azish-cave',
    title: 'Большая Азишская пещера',
    description: 'Одна из самых красивых и больших пещер Европы, оборудованная для экскурсий. Поражает разнообразием натечных образований: сталактитов и сталагмитов.',
  },
  {
    id: 'svyato-mihaylovskiy-monastery',
    title: 'Свято-Михайловский монастырь',
    description: 'Крупнейший мужской монастырь на юге России с подземными ходами, святым источником и панорамным видом на горы.',
  },
  {
    id: 'mishoko-canyon',
    title: 'Каньон Мишоко',
    description: 'Живописное ущелье с изумрудной водой, экстремальным парком (виа-феррата, троллей) и древними стоянками человека.',
  },
  {
      id: 'guzeripl',
      title: 'Поселок Гузерипль',
      description: 'Ворота в Кавказский заповедник. Здесь находится самый большой дольмен в Адыгее и музей природы.',
  },
  {
      id: 'granite-canyon',
      title: 'Гранитный каньон',
      description: 'Уникальное геологическое образование, где река Белая пробила себе путь сквозь гранитный массив. Популярное место для рафтинга.',
  }
];

export default function AttractionsSection() {
    const [selectedAttraction, setSelectedAttraction] = useState<{title: string, description: string, image: ImagePlaceholder | undefined} | null>(null);

    const openModal = (attraction: typeof attractions[0]) => {
        const image = PlaceHolderImages.find((img) => img.id === attraction.id);
        setSelectedAttraction({ ...attraction, image });
    }

  return (
    <section id="attractions" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
            <h2 className="text-center font-headline text-3xl md:text-4xl font-bold text-primary mb-12">
            Главные достопримечательности
            </h2>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {attractions.map((attraction, index) => {
            const image = PlaceHolderImages.find((img) => img.id === attraction.id);
            return (
              <AnimateOnScroll key={attraction.id} delay={index * 0.1}>
                <div className="group relative overflow-hidden rounded-lg shadow-lg h-96" onClick={() => openModal(attraction)}>
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="font-headline text-2xl font-bold">{attraction.title}</h3>
                    <p className="mt-1 text-white/90 text-sm line-clamp-2">{attraction.description}</p>
                     <div className="mt-4 flex justify-between items-center">
                        <p className="text-sm font-semibold">Подробнее</p>
                        <Maximize className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        <Dialog open={!!selectedAttraction} onOpenChange={(isOpen) => !isOpen && setSelectedAttraction(null)}>
            <DialogContent className="max-w-3xl">
                {selectedAttraction && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="font-headline text-3xl text-primary">{selectedAttraction.title}</DialogTitle>
                        </DialogHeader>
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            {selectedAttraction.image && (
                                <div className="relative aspect-square rounded-lg overflow-hidden">
                                <Image
                                    src={selectedAttraction.image.imageUrl}
                                    alt={selectedAttraction.image.description}
                                    fill
                                    className="object-cover"
                                />
                                </div>
                            )}
                            <div className="flex flex-col justify-center">
                                <DialogDescription className="text-base leading-relaxed text-foreground">
                                    {selectedAttraction.description}
                                </DialogDescription>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>

      </div>
    </section>
  );
}
