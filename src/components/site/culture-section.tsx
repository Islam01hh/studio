'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import { Music, Utensils, Palette, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimateOnScroll from './animate-on-scroll';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const cultureItems = [
  {
    id: 'adyghe-music',
    icon: Music,
    title: 'Адыгская музыка',
    description: 'Народная музыка адыгов — это живая летопись их истории. Она включает в себя героические песни (пщынатли), лирические и обрядовые мелодии. Ключевые инструменты — шичепшин (скрипка), камыль (флейта) и пхачич (трещотка). Танцы, такие как лезгинка и зафак, являются неотъемлемой частью любого праздника.',
    shortDescription: 'Традиционные мелодии и танцы, передающие дух народа',
  },
  {
    id: 'adyghe-cuisine',
    icon: Utensils,
    title: 'Национальная кухня',
    description: 'Кухня Адыгеи проста, сытна и невероятно вкусна. Основа многих блюд — знаменитый адыгейский сыр (матэкъуае), который едят свежим, жареным и копченым. Обязательно попробуйте щипс (густой соус на основе бульона), пастэ (крутая пшенная или кукурузная каша) и, конечно, ароматный шашлык из баранины.',
    shortDescription: 'Уникальные блюда: адыгейский сыр, щипс, пастэ',
  },
  {
    id: 'adyghe-crafts',
    icon: Palette,
    title: 'Народные ремесла',
    description: 'Адыги издревле славились как искусные мастера. Особое место занимает золотое шитье (дышъэ идэ), которым украшали одежду и предметы быта. Также развиты оружейное дело, резьба по дереву, изготовление циновок и керамики. Эти традиции бережно сохраняются и передаются из поколения в поколение.',
    shortDescription: 'Золотое шитье, резьба по дереву, оружейное дело',
  },
  {
    id: 'adyghe-holidays',
    icon: CalendarDays,
    title: 'Праздники и обычаи',
    description: 'Важнейшей частью культуры является "Адыгэ Хабзэ" — свод неписаных правил и этических норм, регулирующий все аспекты жизни. Гостеприимство — священный долг каждого адыга. В течение года проводится множество фестивалей, где можно увидеть национальные костюмы, танцы, конные игры и попробовать традиционные угощения.',
    shortDescription: 'Древний кодекс "Адыгэ Хабзэ" и яркие фестивали',
  },
];

type SelectedCultureItem = typeof cultureItems[0] & { image?: ImagePlaceholder };

export default function CultureSection() {
  const [selectedItem, setSelectedItem] = useState<SelectedCultureItem | null>(null);

  const openModal = (item: typeof cultureItems[0]) => {
    const image = PlaceHolderImages.find((img) => img.id === item.id);
    setSelectedItem({ ...item, image });
  };

  return (
    <>
      <section id="culture" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <h2 className="text-center font-headline text-3xl md:text-4xl font-bold text-primary mb-12">
              Культура и традиции
            </h2>
          </AnimateOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {cultureItems.map((item, index) => (
              <AnimateOnScroll key={index} delay={index * 0.1}>
                <Card 
                  className="text-center h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col"
                  onClick={() => openModal(item)}
                >
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 mb-4 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="font-headline text-xl text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{item.shortDescription}</p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedItem} onOpenChange={(isOpen) => !isOpen && setSelectedItem(null)}>
        <DialogContent className="max-w-3xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="font-headline text-3xl text-primary">{selectedItem.title}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                {selectedItem.image && (
                  <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={selectedItem.image.imageUrl}
                      alt={selectedItem.image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={selectedItem.image.imageHint}
                    />
                  </div>
                )}
                <div className={`flex flex-col justify-center ${!selectedItem.image ? 'md:col-span-2' : ''}`}>
                  <DialogDescription className="text-base leading-relaxed text-foreground">
                    {selectedItem.description}
                  </DialogDescription>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
