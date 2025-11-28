'use client';

import AnimateOnScroll from './animate-on-scroll';
import type { BookingInfo } from '@/app/page';
import { hotels } from '@/data/hotels';
import HotelCard from './hotel-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


type HotelsCarouselProps = {
    onBook: (info: BookingInfo) => void;
};

export default function HotelsCarousel({ onBook }: HotelsCarouselProps) {
  return (
    <section id="hotels" className="py-8">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-center font-headline text-3xl md:text-4xl font-bold text-primary mb-2">
            Где остановиться
          </h2>
          <p className="text-center max-w-3xl mx-auto text-muted-foreground mb-12 text-lg">
            От уютных гостевых домов у подножия гор до современных отелей в центре Майкопа — найдите идеальное место для вашего отдыха.
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
            {hotels.map((hotel, index) => (
              <CarouselItem key={hotel.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <AnimateOnScroll className="h-full" delay={index * 0.05}>
                    <HotelCard hotel={hotel} onBook={onBook} className="h-full"/>
                </AnimateOnScroll>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden sm:flex" />
          <CarouselNext className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
