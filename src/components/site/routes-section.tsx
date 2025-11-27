'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Clock, Mountain, Ruler, Car,Users, Zap, Wallet } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import AnimateOnScroll from './animate-on-scroll';
import type { BookingInfo } from '@/app/page';

type RoutesSectionProps = {
    onBook: (info: BookingInfo) => void;
};

const routesData = {
    hiking: [
        {
            id: 'route-lagonaki-hiking',
            title: 'Тропа на плато Лагонаки',
            duration: '6-8 часов',
            difficulty: 'Средняя',
            distance: '15 км',
            price: 'от 2500 ₽/чел.',
            description: 'Живописный маршрут через альпийские луга с потрясающими видами на Кавказский хребет. Включен перекус и услуги гида.',
        },
        {
            id: 'route-rufabgo-hiking',
            title: 'К водопадам Руфабго',
            duration: '3-4 часа',
            difficulty: 'Легкая',
            distance: '8 км',
            price: 'от 1500 ₽/чел.',
            description: 'Семейный маршрут к красивейшим водопадам с возможностью купания. Идеально для первого знакомства с природой Адыгеи.',
        }
    ],
    auto: [
        {
            id: 'route-auto-ring',
            title: 'Большое кольцо Адыгеi',
            duration: '2-3 дня',
            difficulty: 'На автомобиле',
            distance: '350 км',
            price: 'от 15000 ₽/машина',
            description: 'Полный обзор республики с посещением основных достопримечательностей на комфортном внедорожнике.',
        },
        {
            id: 'route-auto-guamka',
            title: 'Гуамское ущелье и термы',
            duration: '1 день',
            difficulty: 'На автомобиле',
            distance: '120 км',
            price: 'от 8000 ₽/машина',
            description: 'Поездка на ретро-поезде по узкоколейке, купание в термальных источниках и невероятные виды.',
        }
    ],
    family: [
        {
            id: 'route-family-adventure',
            title: 'Семейное приключение',
            duration: '1 день',
            difficulty: 'Для всей семьи',
            distance: '~5 км',
            price: 'от 6000 ₽/семья',
            description: 'Легкие прогулки по Хаджохской теснине, посещение парка и пикник с видом на горы.',
        },
        {
            id: 'route-dolmens-and-legends',
            title: 'Дольмены и Легенды',
            duration: '4-5 часов',
            difficulty: 'Легкая',
            distance: 'небольшие переезды',
            price: 'от 2000 ₽/чел.',
            description: 'Познавательная экскурсия к древним мегалитам, где вы узнаете тайны и легенды этих загадочных сооружений.',
        }
    ],
    extreme: [
        {
            id: 'route-canyoning',
            title: 'Каньонинг в ущелье Мишоко',
            duration: '5-6 часов',
            difficulty: 'Высокая',
            distance: '2 км',
            price: 'от 4500 ₽/чел.',
            description: 'Спуск по каньону горной реки с использованием альпинистского снаряжения. Незабываемые эмоции гарантированы!',
        },
        {
            id: 'route-fisht-climbing',
            title: 'Восхождение на Фишт',
            duration: '3 дня',
            difficulty: 'Очень высокая',
            distance: '40 км',
            price: 'от 20000 ₽/чел.',
            description: 'Серьезный маршрут для опытных туристов с ночевками в палатках и штурмом одной из самых красивых вершин Кавказа.',
        }
    ]
};

export default function RoutesSection({ onBook }: RoutesSectionProps) {
    return (
        <section id="routes" className="py-16 md:py-24 bg-card">
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
                    </div>
                </Tabs>
            </div>
        </section>
    );
}

function RoutesGrid({ routes, onBook }: { routes: typeof routesData.hiking, onBook: (info: BookingInfo) => void; }) {
    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {routes.map((route) => {
                const image = PlaceHolderImages.find(img => img.id === route.id);
                return (
                    <AnimateOnScroll key={route.id}>
                        <div className="bg-background rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col h-full">
                            <div className="h-56 relative">
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
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="font-headline text-xl font-bold text-primary mb-3">{route.title}</h3>
                                <p className="text-muted-foreground text-sm flex-grow mb-4">{route.description}</p>
                                <div className="text-sm space-y-2 text-foreground/80 mb-6">
                                    <div className="flex items-center"><Clock className="w-4 h-4 mr-2 text-primary" />{route.duration}</div>
                                    <div className="flex items-center"><Mountain className="w-4 h-4 mr-2 text-primary" />Сложность: {route.difficulty}</div>
                                    <div className="flex items-center"><Ruler className="w-4 h-4 mr-2 text-primary" />{route.distance}</div>
                                    <div className="flex items-center"><Wallet className="w-4 h-4 mr-2 text-primary" />{route.price}</div>
                                </div>
                                <Button className="mt-auto w-full" onClick={() => onBook({type: 'Маршрут', name: route.title, price: route.price})}>
                                    Забронировать
                                </Button>
                            </div>
                        </div>
                    </AnimateOnScroll>
                );
            })}
        </div>
    );
}
