'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/site/header';
import HeroSection from '@/components/site/hero-section';
import AboutSection from '@/components/site/about-section';
import AttractionsSection from '@/components/site/attractions-section';
import CultureSection from '@/components/site/culture-section';
import RoutesSection from '@/components/site/routes-section';
import HotelsSection from '@/components/site/hotels-section';
import GallerySection from '@/components/site/gallery-section';
import ContactSection from '@/components/site/contact-section';
import Footer from '@/components/site/footer';
import ScrollToTop from '@/components/site/scroll-to-top';
import Loader from '@/components/site/loader';
import BookingModal from '@/components/site/booking-modal';
import GalleryModal from '@/components/site/gallery-modal';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import FavoritesSection from '@/components/site/favorites-section';
import { useFavorites } from '@/hooks/use-favorites';
import { Separator } from '@/components/ui/separator';

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
  
  const allGalleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));

  useEffect(() => {
    // Имитация загрузки для демонстрации лоадера
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <div
        className={`transition-opacity duration-700 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Header />
        <main className="overflow-x-hidden bg-background">
          <HeroSection />
          <div className="container mx-auto px-4 py-16 sm:py-24 space-y-24 md:space-y-32">
            <AboutSection />
            <Separator />
            <AttractionsSection onGalleryOpen={openGalleryModal}/>
            <Separator />
            {favorites.length > 0 && (
                <>
                    <FavoritesSection onBook={handleBooking} />
                    <Separator />
                </>
            )}
            <RoutesSection onBook={handleBooking}/>
            <Separator />
            <HotelsSection onBook={handleBooking} />
            <Separator />
            <CultureSection />
            <Separator />
            <GallerySection onImageClick={(id) => {
                const imageIndex = allGalleryImages.findIndex(img => img.id === id);
                if (imageIndex !== -1) {
                    openGalleryModal(allGalleryImages, imageIndex);
                }
            }}/>
            <Separator />
            <ContactSection />
          </div>
        </main>
        <Footer />
        <ScrollToTop />
        <BookingModal isOpen={isBookingModalOpen} setIsOpen={setIsBookingModalOpen} bookingInfo={bookingInfo} />
        <GalleryModal isOpen={isGalleryModalOpen} setIsOpen={setIsGalleryModalOpen} images={galleryImages} startIndex={galleryStartIndex} />
      </div>
    </>
  );
}
