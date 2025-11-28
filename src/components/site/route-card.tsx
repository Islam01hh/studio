'use client';

import Image from 'next/image';
import { Clock, Mountain, Ruler, Car, Users, Zap, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BookingInfo } from '@/app/page';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import type { Route as RouteType } from '@/data/routes';
import { Badge } from '../ui/badge';

type RouteCardProps = {
    route: RouteType;
    onBook: (info: BookingInfo) => void;
    className?: string;
};

const iconMap = {
    duration: Clock,
    difficulty: Mountain,
    distance: Ruler,
    transport: Car,
};

export default function RouteCard({ route, onBook, className }: RouteCardProps) {
    const image = PlaceHolderImages.find(img => img.id === route.id);
    
    return (
        <div className={cn("group w-full h-full", className)}>
            <div className="relative overflow-hidden rounded-lg shadow-md h-full flex flex-col bg-card">
                <div className="relative h-48 sm:h-56">
                    {image && (
                        <Image
                            src={image.imageUrl}
                            alt={route.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            data-ai-hint={image.imageHint}
                        />
                    )}
                    {route.badge && (
                        <Badge className="absolute top-3 left-3 z-10">{route.badge}</Badge>
                    )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-headline text-lg font-semibold text-primary leading-tight truncate">{route.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2 flex-grow">{route.description}</p>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground my-4">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary"/>
                            <span>{route.duration}</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <Ruler className="w-4 h-4 text-primary"/>
                            <span>{route.distance}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Mountain className="w-4 h-4 text-primary"/>
                            <span>{route.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {route.type === 'auto' ? <Car className="w-4 h-4 text-primary"/> : route.type === 'family' ? <Users className="w-4 h-4 text-primary"/> : route.type === 'extreme' ? <Zap className="w-4 h-4 text-primary"/> : <Mountain className="w-4 h-4 text-primary"/>}
                            <span className="capitalize">{
                                route.type === 'hiking' ? 'Пеший' :
                                route.type === 'auto' ? 'На авто' :
                                route.type === 'family' ? 'Семейный' :
                                'Экстрим'
                            }</span>
                        </div>
                    </div>

                    <div className="mt-auto flex justify-between items-center">
                        <div className="text-sm">
                            <span className="text-muted-foreground">от </span>
                            <span className="font-bold text-lg text-foreground">{route.price.split(' ')[1]}</span>
                            <span className="text-muted-foreground"> ₽/чел.</span>
                        </div>
                        <Button onClick={() => onBook({type: 'Маршрут', name: route.title, price: route.price})} size="sm">
                            Забронировать
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
