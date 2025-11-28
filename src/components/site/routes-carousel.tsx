'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import AnimateOnScroll from './animate-on-scroll';
import type { BookingInfo } from '@/app/page';
import { routesData, Route } from '@/data/routes';
import RouteCard from './route-card';
import { Mountain, Car, Users, Zap } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


type RoutesCarouselProps = {
    onBook: (info: BookingInfo) => void;
};

function RoutesGrid({ routes, onBook }: { routes: Route[], onBook: (info: BookingInfo) => void; }) {
    return (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {routes.map((route, index) => (
                <CarouselItem key={route.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <AnimateOnScroll className="h-full" delay={index * 0.05}>
                      <RouteCard route={route} onBook={onBook} className="h-full"/>
                    </AnimateOnScroll>
                </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden sm:flex" />
          <CarouselNext className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 hidden sm:flex" />
        </Carousel>
    );
}


export default function RoutesCarousel({ onBook }: RoutesCarouselProps) {
    return (
        <section id="routes" className="py-8 bg-card">
            <div className="container mx-auto px-4 py-12">
                <AnimateOnScroll>
                    <h2 className="text-center font-headline text-3xl md:text-4xl font-bold text-primary mb-2">
                        Готовые маршруты по Адыгее
                    </h2>
                     <p className="text-center max-w-3xl mx-auto text-muted-foreground mb-12 text-lg">
                        Мы подготовили для вас проверенные маршруты для любого вида отдыха: от легких семейных прогулок до экстремальных восхождений.
                    </p>
                </AnimateOnScroll>
                <Tabs defaultValue="hiking" className="w-full">
                    <AnimateOnScroll delay={0.1}>
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mx-auto max-w-2xl h-auto mb-12">
                            <TabsTrigger value="hiking"><Mountain className="w-4 h-4 mr-2"/>Пешие</TabsTrigger>
                            <TabsTrigger value="auto"><Car className="w-4 h-4 mr-2"/>Автомобильные</TabsTrigger>
                            <TabsTrigger value="family"><Users className="w-4 h-4 mr-2"/>Семейные</TabsTrigger>
                            <TabsTrigger value="extreme"><Zap className="w-4 h-4 mr-2"/>Экстремальные</TabsTrigger>
                        </TabsList>
                    </AnimateOnScroll>
                    
                    <TabsContent value="hiking">
                        <RoutesGrid routes={routesData.hiking} onBook={onBook}/>
                    </TabsContent>
                    <TabsContent value="auto">
                        <RoutesGrid routes={routesData.auto} onBook={onBook}/>
                    </TabsContent>
                    <TabsContent value="family">
                        <RoutesGrid routes={routesData.family} onBook={onBook}/>
                    </TabsContent>
                    <TabsContent value="extreme">
                        <RoutesGrid routes={routesData.extreme} onBook={onBook}/>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}
