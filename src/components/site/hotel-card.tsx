'use client';

import Image from 'next/image';
import { Wifi, ParkingSquare, Utensils, Star, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { BookingInfo } from '@/app/page';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';
import type { Hotel as HotelType } from '@/data/hotels';
import { Badge } from '../ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


type HotelCardProps = {
    hotel: HotelType;
    onBook: (info: BookingInfo) => void;
    className?: string;
};

const iconMap = {
    wifi: Wifi,
    parking: ParkingSquare,
    restaurant: Utensils,
};

export default function HotelCard({ hotel, onBook, className }: HotelCardProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const image = PlaceHolderImages.find(img => img.id === hotel.id);
  const isFavorite = favorites.some(fav => fav.id === hotel.id);

  return (
    <div className={cn("group w-full h-full", className)}>
        <div className="relative overflow-hidden rounded-lg shadow-md h-full flex flex-col bg-card">
            <div className="relative h-48 sm:h-56">
                {image && (
                    <Image
                        src={image.imageUrl}
                        alt={hotel.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        data-ai-hint={image.imageHint}
                    />
                )}
                <div className="absolute top-3 right-3 z-10">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(hotel);
                                    }}
                                    aria-label="Добавить в избранное"
                                >
                                    <Heart className={cn("w-5 h-5 transition-colors", isFavorite ? 'text-red-500 fill-current' : 'text-white')} />
                                </Button>
                            </TooltipTrigger>
                             <TooltipContent>
                                <p>{isFavorite ? "Удалить из избранного" : "Добавить в избранное"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                {hotel.badge && (
                    <Badge className="absolute top-3 left-3 z-10">{hotel.badge}</Badge>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="font-headline text-lg font-semibold text-primary leading-tight flex-1 pr-2">{hotel.name}</h3>
                    <div className="flex items-center gap-1 text-sm shrink-0">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-bold text-foreground">{hotel.rating}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 mb-2">
                    <MapPin className="w-4 h-4"/>
                    <span>{hotel.location}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">{hotel.description}</p>
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm">
                        <span className="text-muted-foreground">от </span>
                        <span className="font-bold text-lg text-foreground">{hotel.price.split(' ')[1]}</span>
                        <span className="text-muted-foreground"> ₽/ночь</span>
                    </div>
                     <Button onClick={() => onBook({type: 'Отель', name: hotel.name, price: hotel.price})} size="sm">Бронь</Button>
                </div>
            </div>
        </div>
    </div>
  );
}
