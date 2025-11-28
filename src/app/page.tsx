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
import WeatherWidget from '@/components/site/weather-widget';
import ContactSection from '@/components/site/contact-section';
import Footer from '@/components/site/footer';
import ScrollToTop from '@/components/site/scroll-to-top';
import Loader from '@/components/site/loader';
import BookingModal from '@/components/site/booking-modal';
import GalleryModal from '@/components/site/gallery-modal';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import AITourGuideSection from '@/components/site/ai-tour-guide-section';


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

  const handleBooking = (info: BookingInfo) => {
    setBookingInfo(info);
    setIsBookingModalOpen(true);
  };

  const handleGalleryOpen = (images: ImagePlaceholder[], startIndex: number) => {
    setGalleryImages(images);
    setGalleryStartIndex(startIndex);
    setIsGalleryModalOpen(true);
  }

  useEffect(() => {
    // Имитация загрузки для демонстрации лоадера
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <div
        className={`transition-opacity duration-500 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Header />
        <main className="overflow-x-hidden">
          <HeroSection />
          <div className="space-y-16 md:space-y-24 lg:space-y-32">
            <AboutSection />
            <AttractionsSection onGalleryOpen={handleGalleryOpen}/>
            <CultureSection />
            <RoutesSection onBook={handleBooking}/>
            <HotelsSection onBook={handleBooking} />
            <GallerySection onImageClick={(id) => {
              const galleryItemsData = [
                { id: 'gallery-1', category: 'nature' }, { id: 'gallery-2', category: 'culture' }, { id: 'gallery-3', category: 'architecture' }, { id: 'gallery-4', category: 'nature' }, { id: 'gallery-5', category: 'food' }, { id: 'gallery-6', category: 'nature' }, { id: 'gallery-7', category: 'culture' }, { id: 'gallery-8', category: 'nature' }, { id: 'gallery-9', category: 'architecture' }, { id: 'gallery-10', category: 'food' }, { id: 'gallery-11', category: 'nature' }, { id: 'gallery-12', category: 'culture' },
              ];
              const images = galleryItemsData.map(item => PlaceHolderImages.find(p => p.id === item.id)).filter(Boolean) as ImagePlaceholder[];
              const index = images.findIndex(img => img.id === id);
              handleGalleryOpen(images, index >= 0 ? index : 0);
            }}/>
            <AITourGuideSection />
            <WeatherWidget />
            <ContactSection />
          </div>
        </main>
        <Footer />
        <ScrollToTop />
        <BookingModal 
          isOpen={isBookingModalOpen}
          setIsOpen={setIsBookingModalOpen}
          bookingInfo={bookingInfo}
        />
        <GalleryModal 
          isOpen={isGalleryModalOpen} 
          setIsOpen={setIsGalleryModalOpen}
          images={galleryImages}
          startIndex={galleryStartIndex}
        />
      </div>
    </>
  );
}
