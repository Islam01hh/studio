'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/site/header';
import HeroSection from '@/components/site/hero-section';
import AboutSection from '@/components/site/about-section';
import AttractionsSection from '@/components/site/attractions-section';
import CultureSection from '@/components/site/culture-section';
import RoutesSection from '@/components/site/routes-section';
import GallerySection from '@/components/site/gallery-section';
import WeatherWidget from '@/components/site/weather-widget';
import AiTourGuideSection from '@/components/site/ai-tour-guide-section';
import ContactSection from '@/components/site/contact-section';
import Footer from '@/components/site/footer';
import ScrollToTop from '@/components/site/scroll-to-top';
import Loader from '@/components/site/loader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
            <AttractionsSection />
            <CultureSection />
            <RoutesSection />
            <GallerySection />
            <AiTourGuideSection />
            <WeatherWidget />
            <ContactSection />
          </div>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
