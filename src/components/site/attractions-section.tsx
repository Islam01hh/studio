'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import { Maximize, Heart, Camera } from 'lucide-react';
import AnimateOnScroll from './animate-on-scroll';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useFavorites } from '@/hooks/use-favorites';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const attractions = [
  {
    id: 'plato-lagonaki',
    title: 'Плато Лаго-Наки',
    description: 'Высокогорное плато, входящее в состав Кавказского заповедника и объект Всемирного наследия ЮНЕСКО. Это море альпийских лугов, окруженное каменными вершинами. Уникальная флора насчитывает сотни видов растений, многие из которых – эндемики. Зимой плато превращается в популярный горнолыжный курорт. Здесь можно встретить серн и кавказских благородных оленей.',
    photoTip: 'Лучшие кадры — на рассвете с видом на гору Фишт.',
    type: 'attraction' as const
  },
  {
    id: 'rufabgo-waterfalls',
    title: 'Водопады Руфабго',
    description: 'Каскад из 16 живописных водопадов в ущелье реки Руфабго. Оборудованная тропа ведет к самым известным из них: "Шум", "Каскадный", "Сердце Руфабго" и "Девичья коса". Вода в реке даже летом остается прохладной. Отличное место для семейной прогулки и наслаждения прохладой в жаркий день.',
     photoTip: 'Используйте длинную выдержку для эффекта "молочной" воды.',
    type: 'attraction' as const
  },
  {
    id: 'khadzhokh-gorge',
    title: 'Хаджохская теснина',
    description: 'Узкий и глубокий каньон реки Белой, пробитый водой в известняковых породах. Его длина около 400 метров, а глубина достигает 40 метров. Бурный поток воды создает невероятный гул. Вдоль теснины проложен удобный туристический маршрут с мостиками и смотровыми площадками, безопасный для всех возрастов.',
    photoTip: 'Снимайте в полдень, когда солнце освещает дно каньона.',
    type: 'attraction' as const
  },
  {
    id: 'azish-cave',
    title: 'Большая Азишская пещера',
    description: 'Одна из самых красивых и больших пещер Европы, оборудованная для экскурсий. Протяженность исследованной части – более 600 метров. Пещера поражает разнообразием натечных образований: сталактитов, сталагмитов и сталагнатов, образующих целые залы и галереи. Внутри поддерживается постоянная температура около +5°C.',
    photoTip: 'Возьмите штатив — внутри темно, но очень красиво.',
    type: 'attraction'as const
  },
  {
    id: 'svyato-mihaylovskiy-monastery',
    title: 'Свято-Михайловский монастырь',
    description: 'Крупнейший мужской монастырь на юге России, основанный в 1877 году афонскими монахами. Расположен на склоне горы Физиабго. Комплекс включает несколько храмов, целебный источник и разветвленную сеть рукотворных подземных ходов, открытых для паломников. С территории открывается великолепный панорамный вид.',
     photoTip: 'Лучший вид на монастырь открывается с обзорной площадки на закате.',
    type: 'attraction'as const
  },
  {
    id: 'mishoko-canyon',
    title: 'Каньон Мишоко',
    description: 'Живописное ущелье с изумрудной водой, экстремальным парком (виа-феррата, троллей) и древними стоянками человека. Здесь были найдены следы людей, живших более 130 тысяч лет назад. Отличное место для любителей активного отдыха, истории и головокружительных видов.',
     photoTip: 'Снимайте с высоты, чтобы показать масштаб ущелья.',
    type: 'attraction'as const
  },
  {
      id: 'guzeripl',
      title: 'Поселок Гузерипль',
      description: '"Ворота" в Кавказский биосферный заповедник. Здесь находится самый большой и хорошо сохранившийся дольмен в Адыгее, а также музей природы заповедника, рассказывающий о флоре и фауне региона. Отсюда начинаются многие туристические маршруты, включая знаменитый маршрут "Через горы к морю".',
      photoTip: 'Сфотографируйте древний дольмен на фоне гор.',
      type: 'attraction'as const
  },
  {
      id: 'granite-canyon',
      title: 'Гранитный каньон',
      description: 'Уникальное геологическое образование, где река Белая пробила себе путь сквозь гранитный массив возрастом более 200 миллионов лет. Длина каньона около 4 км, а высота скал достигает 200 метров. Популярное место для рафтинга и смотровых площадок с захватывающими видами.',
       photoTip: 'Ищите ракурс, где виден контраст красного гранита и бирюзовой воды.',
      type: 'attraction'as const
  }
];

export type Attraction = typeof attractions[0];

type AttractionsSectionProps = {
  onGalleryOpen: (images: ImagePlaceholder[], startIndex: number) => void;
};


export default function AttractionsSection({ onGalleryOpen }: AttractionsSectionProps) {
    const [selectedAttraction, setSelectedAttraction] = useState<Attraction & { image?: ImagePlaceholder} | null>(null);
    const { favorites, toggleFavorite } = useFavorites();

    const openModal = (attraction: Attraction) => {
        const image = PlaceHolderImages.find((img) => img.id === attraction.id);
        setSelectedAttraction({ ...attraction, image });
    }

  return (
    <section id="attractions" className="py-16 md:py-8">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
            <h2 className="text-center font-headline text-4xl md:text-5xl font-bold text-primary mb-2">
                Главные достопримечательности
            </h2>
            <p className="text-center max-w-3xl mx-auto text-muted-foreground mb-12 text-lg">
                Откройте для себя сокровища Адыгеи: от величественных гор и шумных водопадов до древних монастырей и таинственных пещер.
            </p>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {attractions.map((attraction, index) => {
            const image = PlaceHolderImages.find((img) => img.id === attraction.id);
            const isFavorite = favorites.some(fav => fav.id === attraction.id);
            return (
              <AnimateOnScroll key={attraction.id} delay={index * 0.1}>
                <div className="group relative overflow-hidden rounded-lg shadow-lg h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col" >
                  <div className="relative h-96" onClick={() => openModal(attraction)}>
                    {image && (
                        <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        data-ai-hint={image.imageHint}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <h3 className="font-headline text-2xl font-bold">{attraction.title}</h3>
                         <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-sm font-semibold">Подробнее</p>
                            <Maximize className="w-5 h-5" />
                        </div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 z-10 flex gap-2">
                     <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Camera className="w-5 h-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{attraction.photoTip}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white"
                      onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(attraction);
                      }}
                      aria-label="Добавить в избранное"
                    >
                      <Heart className={cn("w-5 h-5 transition-colors", isFavorite ? 'text-red-500 fill-current' : 'text-white')} />
                    </Button>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        <Dialog open={!!selectedAttraction} onOpenChange={(isOpen) => !isOpen && setSelectedAttraction(null)}>
            <DialogContent className="max-w-3xl bg-card">
                {selectedAttraction && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="font-headline text-3xl text-primary">{selectedAttraction.title}</DialogTitle>
                        </DialogHeader>
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                                {selectedAttraction.image && (
                                    <Image
                                        src={selectedAttraction.image.imageUrl}
                                        alt={selectedAttraction.image.description}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <DialogDescription className="text-base leading-relaxed text-foreground flex-grow">
                                    {selectedAttraction.description}
                                </DialogDescription>
                                <div className="mt-4 bg-secondary/50 p-3 rounded-lg flex items-start gap-3">
                                    <Camera className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-primary">Совет фотографу</h4>
                                        <p className="text-sm text-muted-foreground">{selectedAttraction.photoTip}</p>
                                    </div>
                                </div>
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
