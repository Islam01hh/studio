'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import AnimateOnScroll from './animate-on-scroll';
import GalleryModal from './gallery-modal';
import { cn } from '@/lib/utils';
import { ZoomIn } from 'lucide-react';

type Filter = 'all' | 'nature' | 'culture' | 'architecture' | 'food';

const galleryItemsData = [
  { id: 'gallery-1', category: 'nature' },
  { id: 'gallery-2', category: 'culture' },
  { id: 'gallery-3', category: 'architecture' },
  { id: 'gallery-4', category: 'nature' },
  { id: 'gallery-5', category: 'food' },
  { id: 'gallery-6', category: 'nature' },
  { id: 'gallery-7', category: 'culture' },
  { id: 'gallery-8', category: 'nature' },
  { id: 'gallery-9', category: 'architecture' },
  { id: 'gallery-10', category: 'food' },
  { id: 'gallery-11', category: 'nature' },
  { id: 'gallery-12', category: 'culture' },
];

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'nature', label: 'Природа' },
  { value: 'culture', label: 'Культура' },
  { value: 'architecture', label: 'Архитектура' },
  { value: 'food', label: 'Кухня' },
];

export default function GallerySection() {
  const [filter, setFilter] = useState<Filter>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const galleryImages = galleryItemsData.map(item => {
      const imageData = PlaceHolderImages.find(p => p.id === item.id);
      return { ...item, ...imageData! };
  }).filter(item => item.imageUrl); // Filter out items where image might be missing

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
            <AnimateOnScroll key={item.id} delay={index * 0.05} className="aspect-w-1 aspect-h-1">
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
                    <ZoomIn className="w-6 h-6" />
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
