'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimateOnScroll from '@/components/site/animate-on-scroll';
import type { BookingInfo } from '@/app/page';
import { routesData, Route } from '@/data/routes';
import RouteCard from '@/components/site/route-card';
import { Mountain, Car, Users, Zap } from 'lucide-react';
import BookingModal from '@/components/site/booking-modal';

function RoutesGrid({ routes, onBook }: { routes: Route[], onBook: (info: BookingInfo) => void; }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {routes.map((route, index) => (
                <AnimateOnScroll key={route.id} className="h-full" delay={index * 0.05}>
                  <RouteCard route={route} onBook={onBook} className="h-full"/>
                </AnimateOnScroll>
            ))}
        </div>
    );
}

export default function RoutesPage() {
    const [bookingInfo, setBookingInfo] = useState<BookingInfo>(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const handleBooking = (info: BookingInfo) => {
        setBookingInfo(info);
        setIsBookingModalOpen(true);
    };

    return (
        <main className="bg-background pt-16">
            <section id="routes" className="py-16 md:py-24 bg-card">
                <div className="container mx-auto px-4 py-12">
                    <AnimateOnScroll>
                        <h1 className="text-center font-headline text-4xl md:text-5xl font-bold text-primary mb-2">
                            Готовые маршруты по Адыгее
                        </h1>
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
                            <RoutesGrid routes={routesData.hiking} onBook={handleBooking}/>
                        </TabsContent>
                        <TabsContent value="auto">
                            <RoutesGrid routes={routesData.auto} onBook={handleBooking}/>
                        </TabsContent>
                        <TabsContent value="family">
                            <RoutesGrid routes={routesData.family} onBook={handleBooking}/>
                        </TabsContent>
                        <TabsContent value="extreme">
                            <RoutesGrid routes={routesData.extreme} onBook={handleBooking}/>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
            <BookingModal isOpen={isBookingModalOpen} setIsOpen={setIsBookingModalOpen} bookingInfo={bookingInfo} />
        </main>
    );
}
