'use client';

import { useState } from 'react';
import AnimateOnScroll from '@/components/site/animate-on-scroll';
import type { BookingInfo } from '@/app/page';
import { hotels } from '@/data/hotels';
import HotelCard from '@/components/site/hotel-card';
import BookingModal from '@/components/site/booking-modal';

export default function HotelsPage() {
    const [bookingInfo, setBookingInfo] = useState<BookingInfo>(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const handleBooking = (info: BookingInfo) => {
        setBookingInfo(info);
        setIsBookingModalOpen(true);
    };

  return (
    <main className="bg-background pt-16">
        <section id="hotels" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <AnimateOnScroll>
            <h1 className="text-center font-headline text-4xl md:text-5xl font-bold text-primary mb-2">
                Где остановиться
            </h1>
            <p className="text-center max-w-3xl mx-auto text-muted-foreground mb-12 text-lg">
                От уютных гостевых домов у подножия гор до современных отелей в центре Майкопа — найдите идеальное место для вашего отдыха.
            </p>
            </AnimateOnScroll>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {hotels.map((hotel, index) => (
                    <AnimateOnScroll key={hotel.id} className="h-full" delay={index * 0.05}>
                        <HotelCard hotel={hotel} onBook={handleBooking} className="h-full"/>
                    </AnimateOnScroll>
                ))}
            </div>
        </div>
        </section>
        <BookingModal isOpen={isBookingModalOpen} setIsOpen={setIsBookingModalOpen} bookingInfo={bookingInfo} />
    </main>
  );
}
