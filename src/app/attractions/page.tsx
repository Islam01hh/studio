'use client';

import { useState } from 'react';
import { attractions, Attraction } from '@/data/attractions';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import AnimateOnScroll from '@/components/site/animate-on-scroll';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { Camera, MapPin, Ticket } from 'lucide-react';
import AttractionCard from '@/components/site/attraction-card';
import GalleryModal from '@/components/site/gallery-modal';

export default function AttractionsPage() {
    const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const [galleryImages, setGalleryImages] = useState<ImagePlaceholder[]>([]);
    const [galleryStartIndex, setGalleryStartIndex] = useState(0);

    const openModal = (attraction: Attraction) => {
        setSelectedAttraction(attraction);
    }

    const openGalleryModal = (images: ImagePlaceholder[], startIndex: number) => {
        setGalleryImages(images);
        setGalleryStartIndex(startIndex);
        setIsGalleryModalOpen(true);
    };

    const attractionImages = attractions.map(attr => attr.image).filter((img): img is ImagePlaceholder => !!img);


  return (
    <main className="bg-background pt-16">
        <section id="attractions" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <AnimateOnScroll>
                    <h1 className="text-center font-headline text-4xl md:text-5xl font-bold text-primary mb-2">
                        Главные достопримечательности
                    </h1>
                    <p className="text-center max-w-3xl mx-auto text-muted-foreground mb-12 text-lg">
                        Откройте для себя сокровища Адыгеи: от величественных гор и шумных водопадов до древних монастырей и таинственных пещер.
                    </p>
                </AnimateOnScroll>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {attractions.map((attraction, index) => (
                    <AnimateOnScroll key={attraction.id} className="h-full" delay={index * 0.05}>
                        <AttractionCard attraction={attraction} onOpenModal={openModal} className="h-full"/>
                    </AnimateOnScroll>
                    ))}
                </div>

                <Dialog open={!!selectedAttraction} onOpenChange={(isOpen) => !isOpen && setSelectedAttraction(null)}>
                    <DialogContent className="max-w-4xl bg-card">
                        {selectedAttraction && (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="font-headline text-3xl text-primary">{selectedAttraction.title}</DialogTitle>
                                </DialogHeader>
                                <div className="grid md:grid-cols-2 gap-6 mt-4">
                                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md cursor-pointer" onClick={() => selectedAttraction.image && openGalleryModal([selectedAttraction.image], 0)}>
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
                <GalleryModal isOpen={isGalleryModalOpen} setIsOpen={setIsGalleryModalOpen} images={galleryImages} startIndex={galleryStartIndex} />
            </div>
        </section>
    </main>
  );
}
