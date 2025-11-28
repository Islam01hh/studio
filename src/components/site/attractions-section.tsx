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
    title: 'Плато Лаго-Наки',
    description: 'Высокогорное плато, входящее в состав Кавказского заповедника и объект Всемирного наследия ЮНЕСКО. Это море альпийских лугов, окруженное каменными вершинами. Уникальная флора насчитывает сотни видов растений, многие из которых – эндемики. Зимой плато превращается в популярный горнолыжный курорт. Здесь можно встретить серн и кавказских благородных оленей.',
  },
  {
    id: 'rufabgo-waterfalls',
    title: 'Водопады Руфабго',
    description: 'Каскад из 16 живописных водопадов в ущелье реки Руфабго. Оборудованная тропа ведет к самым известным из них: "Шум", "Каскадный", "Сердце Руфабго" и "Девичья коса". Вода в реке даже летом остается прохладной. Отличное место для семейной прогулки и наслаждения прохладой в жаркий день.',
  },
  {
    id: 'khadzhokh-gorge',
    title: 'Хаджохская теснина',
    description: 'Узкий и глубокий каньон реки Белой, пробитый водой в известняковых породах. Его длина около 400 метров, а глубина достигает 40 метров. Бурный поток воды создает невероятный гул. Вдоль теснины проложен удобный туристический маршрут с мостиками и смотровыми площадками, безопасный для всех возрастов.',
  },
  {
    id: 'azish-cave',
    title: 'Большая Азишская пещера',
    description: 'Одна из самых красивых и больших пещер Европы, оборудованная для экскурсий. Протяженность исследованной части – более 600 метров. Пещера поражает разнообразием натечных образований: сталактитов, сталагмитов и сталагнатов, образующих целые залы и галереи. Внутри поддерживается постоянная температура около +5°C.',
  },
  {
    id: 'svyato-mihaylovskiy-monastery',
    title: 'Свято-Михайловский монастырь',
    description: 'Крупнейший мужской монастырь на юге России, основанный в 1877 году афонскими монахами. Расположен на склоне горы Физиабго. Комплекс включает несколько храмов, целебный источник и разветвленную сеть рукотворных подземных ходов, открытых для паломников. С территории открывается великолепный панорамный вид.',
  },
  {
    id: 'mishoko-canyon',
    title: 'Каньон Мишоко',
    description: 'Живописное ущелье с изумрудной водой, экстремальным парком (виа-феррата, троллей) и древними стоянками человека. Здесь были найдены следы людей, живших более 130 тысяч лет назад. Отличное место для любителей активного отдыха, истории и головокружительных видов.',
  },
  {
      id: 'guzeripl',
      title: 'Поселок Гузерипль',
      description: '"Ворота" в Кавказский биосферный заповедник. Здесь находится самый большой и хорошо сохранившийся дольмен в Адыгее, а также музей природы заповедника, рассказывающий о флоре и фауне региона. Отсюда начинаются многие туристические маршруты, включая знаменитый маршрут "Через горы к морю".',
  },
  {
      id: 'granite-canyon',
      title: 'Гранитный каньон',
      description: 'Уникальное геологическое образование, где река Белая пробила себе путь сквозь гранитный массив возрастом более 200 миллионов лет. Длина каньона около 4 км, а высота скал достигает 200 метров. Популярное место для рафтинга и смотровых площадок с захватывающими видами.',
  }
];

type AttractionsSectionProps = {
  onGalleryOpen: (images: ImagePlaceholder[], startIndex: number) => void;
};


export default function AttractionsSection({ onGalleryOpen }: AttractionsSectionProps) {
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
                <div className="group relative overflow-hidden rounded-lg shadow-lg h-96 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]" onClick={() => openModal(attraction)}>
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
                    <p className="mt-1 text-white/90 text-sm line-clamp-2">{attraction.description}</p>
                     <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-semibold">Подробнее</p>
                        <Maximize className="w-5 h-5" />
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
                                <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
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
