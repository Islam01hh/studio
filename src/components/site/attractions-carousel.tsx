'use client';

import { useState } from 'react';
import { attractions, Attraction } from '@/data/attractions';
import AnimateOnScroll from './animate-on-scroll';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { Camera, MapPin, Ticket } from 'lucide-react';
import AttractionCard from './attraction-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type AttractionsCarouselProps = {
  onGalleryOpen: (startIndex: number) => void;
};

export default function AttractionsCarousel({ onGalleryOpen }: AttractionsCarouselProps) {
    const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);

    const openModal = (attraction: Attraction) => {
        setSelectedAttraction(attraction);
    }
    
    const handleCardClick = (attraction: Attraction) => {
        const imageIndex = attractions.findIndex(a => a.id === attraction.id);
        if (attraction.image && imageIndex !== -1) {
            onGalleryOpen(imageIndex);
        } else {
            openModal(attraction);
        }
    }

  return (
    <section id="attractions" className="py-8">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
            <h2 className="text-center font-headline text-3xl md:text-4xl font-bold text-primary mb-2">
                Главные достопримечательности
            </h2>
            <p className="text-center max-w-3xl mx-auto text-muted-foreground mb-12 text-lg">
                Откройте для себя сокровища Адыгеи: от величественных гор и шумных водопадов до древних монастырей и таинственных пещер.
            </p>
        </AnimateOnScroll>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {attractions.map((attraction, index) => (
              <CarouselItem key={attraction.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                 <AnimateOnScroll className="h-full" delay={index * 0.05}>
                  <AttractionCard attraction={attraction} onOpenModal={() => handleCardClick(attraction)} className="h-full"/>
                 </AnimateOnScroll>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden sm:flex" />
          <CarouselNext className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 hidden sm:flex" />
        </Carousel>

        <Dialog open={!!selectedAttraction} onOpenChange={(isOpen) => !isOpen && setSelectedAttraction(null)}>
            <DialogContent className="max-w-4xl bg-card">
                {selectedAttraction && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="font-headline text-3xl text-primary">{selectedAttraction.title}</DialogTitle>
                        </DialogHeader>
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
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
                            <div className="flex flex-col space-y-4">
                                <DialogDescription className="text-base leading-relaxed text-foreground flex-grow">
                                    {selectedAttraction.fullDescription}
                                </DialogDescription>
                                
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <p className="text-muted-foreground">{selectedAttraction.location}</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Ticket className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <p className="text-muted-foreground">{selectedAttraction.ticketInfo}</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Camera className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <p className="text-muted-foreground">{selectedAttraction.photoTip}</p>
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
