'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/site/hero-section';
import ScrollToTop from '@/components/site/scroll-to-top';
import Loader from '@/components/site/loader';
import BookingModal from '@/components/site/booking-modal';
import GalleryModal from '@/components/site/gallery-modal';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import FavoritesSection from '@/components/site/favorites-section';
import { useFavorites } from '@/hooks/use-favorites';
import { Separator } from '@/components/ui/separator';
import AttractionsCarousel from '@/components/site/attractions-carousel';
import RoutesCarousel from '@/components/site/routes-carousel';
import HotelsCarousel from '@/components/site/hotels-carousel';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { attractions } from '@/data/attractions';
import { routesData } from '@/data/routes';
import { hotels } from '@/data/hotels';

export type BookingInfo = {
  type: 'Маршрут' | 'Отель';
  name: string;
  price?: string;
} | null;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<ImagePlaceholder[]>([]);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  const { favorites } = useFavorites();

  const handleBooking = (info: BookingInfo) => {
    setBookingInfo(info);
    setIsBookingModalOpen(true);
  };

  const openGalleryModal = (images: ImagePlaceholder[], startIndex: number) => {
    setGalleryImages(images);
    setGalleryStartIndex(startIndex);
    setIsGalleryModalOpen(true);
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);
  
  const allAttractionImages = attractions.map(attr => attr.image).filter((img): img is ImagePlaceholder => !!img);

  return (
    <>
      <Loader loading={loading} />
      <div
        className={`transition-opacity duration-700 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <main className="overflow-x-hidden bg-background">
          <HeroSection />
          <div className="container mx-auto px-4 py-16 sm:py-24 space-y-24 md:space-y-32">
            <AttractionsCarousel onGalleryOpen={(startIndex) => openGalleryModal(allAttractionImages, startIndex)} />
            <div className="text-center">
                <Button asChild size="lg">
                    <Link href="/attractions">Смотреть все достопримечательности</Link>
                </Button>
            </div>
            <Separator />
            <RoutesCarousel onBook={handleBooking} />
             <div className="text-center">
                <Button asChild size="lg">
                    <Link href="/routes">Смотреть все маршруты</Link>
                </Button>
            </div>
            <Separator />
            <HotelsCarousel onBook={handleBooking} />
            <div className="text-center">
                <Button asChild size="lg">
                    <Link href="/hotels">Смотреть все отели</Link>
                </Button>
            </div>
            {favorites.length > 0 && (
                <>
                    <Separator />
                    <FavoritesSection onBook={handleBooking} />
                </>
            )}
          </div>
        </main>
        <ScrollToTop />
        <BookingModal isOpen={isBookingModalOpen} setIsOpen={setIsBookingModalOpen} bookingInfo={bookingInfo} />
        <GalleryModal isOpen={isGalleryModalOpen} setIsOpen={setIsGalleryModalOpen} images={galleryImages} startIndex={galleryStartIndex} />
      </div>
    </>
  );
}
