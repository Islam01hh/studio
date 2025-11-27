'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Clock, Mountain, RulerHorizontal, Car,Users, Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import AnimateOnScroll from './animate-on-scroll';
import BookingForm from './booking-form';

const routesData = {
    hiking: [
        {
            id: 'route-lagonaki',
            title: 'Тропа на плато Лагонаки',
            duration: '6-8 часов',
            difficulty: 'Средняя',
            distance: '15 км',
            description: 'Живописный маршрут через альпийские луга с потрясающими видами на Кавказский хребет.',
        },
        {
            id: 'route-rufabgo',
            title: 'К водопадам Руфабго',
            duration: '3-4 часа',
            difficulty: 'Легкая',
            distance: '8 км',
            description: 'Семейный маршрут к красивейшим водопадам с возможностью купания.',
        }
    ],
    auto: [
        {
            id: 'route-auto',
            title: 'Большое кольцо Адыгеи',
            duration: '2-3 дня',
            difficulty: 'На автомобиле',
            distance: '350 км',
            description: 'Полный обзор республики с посещением основных достопримечательностей.',
        }
    ],
    family: [
        {
            id: 'route-family',
            title: 'Семейное приключение',
            duration: '1 день',
            difficulty: 'Для всей семьи',
            distance: '5 км',
            description: 'Легкие прогулки с детьми по живописным местам с пикниковыми зонами.',
        }
    ],
    extreme: [
        {
            id: 'route-extreme',
            title: 'Альпинистский вызов',
            duration: '2-3 дня',
            difficulty: 'Высокая',
            distance: '25 км',
            description: 'Сложный маршрут для опытных туристов через горные перевалы.',
        }
    ]
};

const routeOptions = Object.values(routesData).flat().map(route => ({ value: route.title, label: route.title }));

export default function RoutesSection() {
    return (
        <section id="routes" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <AnimateOnScroll>
                    <h2 className="text-center font-headline text-3xl md:text-4xl font-bold text-primary mb-12">
                        Туристические маршруты
                    </h2>
                </AnimateOnScroll>
                <Tabs defaultValue="hiking" className="w-full">
                    <AnimateOnScroll delay={0.1}>
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mx-auto max-w-2xl h-auto">
                            <TabsTrigger value="hiking"><Mountain className="w-4 h-4 mr-2"/>Пешие</TabsTrigger>
                            <TabsTrigger value="auto"><Car className="w-4 h-4 mr-2"/>Авто</TabsTrigger>
                            <TabsTrigger value="family"><Users className="w-4 h-4 mr-2"/>Семейные</TabsTrigger>
                            <TabsTrigger value="extreme"><Zap className="w-4 h-4 mr-2"/>Экстрим</TabsTrigger>
                        </TabsList>
                    </AnimateOnScroll>
                    
                    <div className="mt-8">
                        <TabsContent value="hiking">
                            <RoutesGrid routes={routesData.hiking} />
                        </TabsContent>
                        <TabsContent value="auto">
                            <RoutesGrid routes={routesData.auto} />
                        </TabsContent>
                        <TabsContent value="family">
                            <RoutesGrid routes={routesData.family} />
                        </TabsContent>
                        <TabsContent value="extreme">
                            <RoutesGrid routes={routesData.extreme} />
                        </TabsContent>
                    </div>
                </Tabs>

                <div className="mt-16 md:mt-24">
                  <AnimateOnScroll>
                    <h3 className="text-center font-headline text-2xl md:text-3xl font-bold text-primary mb-8">
                      Забронировать маршрут
                    </h3>
                  </AnimateOnScroll>
                  <AnimateOnScroll delay={0.2}>
                    <Card className="max-w-3xl mx-auto shadow-lg">
                      <CardContent className="p-6 md:p-8">
                        <BookingForm routeOptions={routeOptions} />
                      </CardContent>
                    </Card>
                  </AnimateOnScroll>
                </div>
            </div>
        </section>
    );
}

function RoutesGrid({ routes }: { routes: typeof routesData.hiking }) {
    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {routes.map((route) => {
                const image = PlaceHolderImages.find(img => img.id === route.id);
                return (
                    <AnimateOnScroll key={route.id}>
                        <div className="bg-card rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col md:flex-row">
                            <div className="md:w-2/5 h-48 md:h-auto relative">
                                {image && (
                                    <Image
                                        src={image.imageUrl}
                                        alt={image.description}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={image.imageHint}
                                    />
                                )}
                            </div>
                            <div className="md:w-3/5 p-6 flex flex-col">
                                <h3 className="font-headline text-xl font-bold text-primary mb-3">{route.title}</h3>
                                <p className="text-muted-foreground text-sm flex-grow mb-4">{route.description}</p>
                                <div className="text-sm space-y-2 text-foreground/80">
                                    <div className="flex items-center"><Clock className="w-4 h-4 mr-2 text-primary" />{route.duration}</div>
                                    <div className="flex items-center"><Mountain className="w-4 h-4 mr-2 text-primary" />Сложность: {route.difficulty}</div>
                                    <div className="flex items-center"><RulerHorizontal className="w-4 h-4 mr-2 text-primary" />{route.distance}</div>
                                </div>
                            </div>
                        </div>
                    </AnimateOnScroll>
                );
            })}
        </div>
    );
}