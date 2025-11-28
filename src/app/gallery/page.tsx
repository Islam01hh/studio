'use client';

import { useState } from 'react';
import GallerySection from '@/components/site/gallery-section';
import GalleryModal from '@/components/site/gallery-modal';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';

export default function GalleryPage() {
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const [galleryImages, setGalleryImages] = useState<ImagePlaceholder[]>([]);
    const [galleryStartIndex, setGalleryStartIndex] = useState(0);

    const allGalleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));

    const openGalleryModal = (images: ImagePlaceholder[], startIndex: number) => {
        setGalleryImages(images);
        setGalleryStartIndex(startIndex);
        setIsGalleryModalOpen(true);
    };

    return (
        <main className="bg-background pt-16">
            <GallerySection onImageClick={(id) => {
                const imageIndex = allGalleryImages.findIndex(img => img.id === id);
                if (imageIndex !== -1) {
                    openGalleryModal(allGalleryImages, imageIndex);
                }
            }}/>
            <GalleryModal isOpen={isGalleryModalOpen} setIsOpen={setIsGalleryModalOpen} images={galleryImages} startIndex={galleryStartIndex} />
        </main>
    );
}
