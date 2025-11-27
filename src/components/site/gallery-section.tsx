'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import AnimateOnScroll from './animate-on-scroll';
import GalleryModal from './gallery-modal';
import { cn } from '@/lib/utils';

type Filter = 'all' | 'nature' | 'culture' | 'architecture';

const galleryItemsData = [
  { id: 'gallery-1', category: 'nature' },
  { id: 'gallery-2', category: 'culture' },
  { id: 'gallery-3', category: 'architecture' },
  { id: 'gallery-4', category: 'nature' },
  { id: 'gallery-5', category: 'culture' },
  { id: 'gallery-6', category: 'nature' },
];

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'nature', label: 'Природа' },
  { value: 'culture', label: 'Культура' },
  { value: 'architecture', label: 'Архитектура' },
];

export default function GallerySection() {
  const [filter, setFilter] = useState<Filter>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const galleryImages = galleryItemsData.map(item => {
      const imageData = PlaceHolderImages.find(p => p.id === item.id);
      return { ...item, ...imageData! };
  });

  const filteredImages =
    filter === 'all'
      ? galleryImages
      : galleryImages.filter((item) => item.category === filter);
  
  const handleImageClick = (id: string) => {
    const fullIndex = galleryImages.findIndex(img => img.id === id);
    setSelectedIndex(fullIndex);
    setModalOpen(true);
  }

  return (
    <section id="gallery" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-center font-headline text-3xl md:text-4xl font-bold text-primary mb-6">
            Фотогалерея
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <div className="flex justify-center flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <Button
                key={f.value}
                variant={filter === f.value ? 'default' : 'outline'}
                onClick={() => setFilter(f.value)}
                className="rounded-full"
              >
                {f.label}
              </Button>
            ))}
          </div>
        </AnimateOnScroll>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((item, index) => (
            <AnimateOnScroll key={item.id} delay={index * 0.05} className={cn('aspect-square', item.category === 'architecture' && 'lg:col-span-2 lg:row-span-2 aspect-[2/1] lg:aspect-auto')}>
              <div
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer h-full w-full"
                onClick={() => handleImageClick(item.id)}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.description}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  data-ai-hint={item.imageHint}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary/80 text-white rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="m21 3-7 7"/><path d="m3 21 7-7"/></svg>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
      <GalleryModal 
        isOpen={modalOpen} 
        setIsOpen={setModalOpen}
        images={galleryImages}
        startIndex={selectedIndex}
      />
    </section>
  );
}
