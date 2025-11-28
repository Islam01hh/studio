'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Wand2, Loader2, RefreshCw } from 'lucide-react';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { enhanceGalleryImage } from '@/ai/flows/enhance-gallery-images';
import { useToast } from '@/hooks/use-toast';

type GalleryModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  images: ImagePlaceholder[];
  startIndex: number;
};

export default function GalleryModal({ isOpen, setIsOpen, images, startIndex }: GalleryModalProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [enhancedImages, setEnhancedImages] = useState<Record<string, string>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (api && isOpen) {
      // API может быть не готово сразу, поэтому небольшая задержка
      setTimeout(() => api.scrollTo(startIndex, true), 0);
    }
  }, [api, isOpen, startIndex]);


  const handleEnhance = useCallback(async (image: ImagePlaceholder) => {
    setLoadingStates((prev) => ({ ...prev, [image.id]: true }));
    try {
      // 1. Получаем изображение как Blob
      const response = await fetch(image.imageUrl);
      if (!response.ok) throw new Error('Network response was not ok.');
      const blob = await response.blob();

      // 2. Конвертируем Blob в data URI с помощью FileReader
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        try {
            // 3. Отправляем data URI в AI flow
            const result = await enhanceGalleryImage({ imageDataUri: base64data });
            if (result.enhancedImageDataUri) {
                setEnhancedImages((prev) => ({ ...prev, [image.id]: result.enhancedImageDataUri }));
                toast({ title: "Успех", description: "Изображение улучшено!" });
            } else {
                throw new Error('AI-поток не вернул изображение.');
            }
        } catch (error) {
            console.error('Failed to enhance image with AI flow:', error);
            toast({ variant: "destructive", title: "Ошибка", description: "Не удалось улучшить изображение." });
        } finally {
            setLoadingStates((prev) => ({ ...prev, [image.id]: false }));
        }
      };
      reader.onerror = () => {
        throw new Error('Could not read file for data URI conversion.');
      }
    } catch (error) {
      console.error('Failed to fetch or read image:', error);
      setLoadingStates((prev) => ({ ...prev, [image.id]: false }));
      toast({ variant: "destructive", title: "Ошибка", description: "Не удалось загрузить изображение для улучшения." });
    }
  }, [toast]);

  const resetEnhancement = (imageId: string) => {
    const newEnhancedImages = { ...enhancedImages };
    delete newEnhancedImages[imageId];
    setEnhancedImages(newEnhancedImages);
  }

  // Сбрасываем состояние при закрытии модального окна
  const handleOpenChange = (open: boolean) => {
    if (!open) {
        setEnhancedImages({});
        setLoadingStates({});
    }
    setIsOpen(open);
  }

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl p-2 sm:p-4 bg-card/80 backdrop-blur-md border-border">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image.id}>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/10">
                    {loadingStates[image.id] && (
                        <div className="absolute inset-0 z-10 bg-black/50 flex flex-col items-center justify-center text-white">
                            <Loader2 className="h-8 w-8 animate-spin mb-2" />
                            <p>Улучшаем изображение...</p>
                        </div>
                    )}
                    <Image 
                        src={enhancedImages[image.id] || image.imageUrl} 
                        alt={enhancedImages[image.id] ? `Enhanced ${image.description}` : image.description}
                        fill 
                        className="object-contain" 
                        sizes="(max-width: 1280px) 100vw, 1280px"
                        data-ai-hint={image.imageHint}
                    />
                  </div>
                  <div className="flex gap-2">
                    {enhancedImages[image.id] ? (
                        <Button onClick={() => resetEnhancement(image.id)} variant="outline">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Показать оригинал
                        </Button>
                    ) : (
                        <Button onClick={() => handleEnhance(image)} disabled={loadingStates[image.id]}>
                            {loadingStates[image.id] ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                            Улучшить с помощью AI
                        </Button>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 sm:-left-12 bg-background/50 hover:bg-background" />
          <CarouselNext className="right-2 sm:-right-12 bg-background/50 hover:bg-background" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
