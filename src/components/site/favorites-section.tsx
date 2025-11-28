'use client';

import { useFavorites } from "@/hooks/use-favorites";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import AnimateOnScroll from "./animate-on-scroll";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Heart, MapPin } from "lucide-react";
import type { BookingInfo } from "@/app/page";
import { cn } from "@/lib/utils";

type FavoritesSectionProps = {
    onBook: (info: BookingInfo) => void;
};

export default function FavoritesSection({ onBook }: FavoritesSectionProps) {
    const { favorites, toggleFavorite } = useFavorites();

    if (favorites.length === 0) {
        return null;
    }

    return (
        <section id="favorites" className="py-16 md:py-24 bg-card">
            <div className="container mx-auto px-4">
                <AnimateOnScroll>
                    <h2 className="text-center font-headline text-3xl md:text-4xl font-bold text-primary mb-12">
                        Ваше избранное
                    </h2>
                </AnimateOnScroll>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {favorites.map((item, index) => {
                        const image = PlaceHolderImages.find(img => img.id === item.id);
                        const isHotel = item.type === 'hotel';

                        return (
                            <AnimateOnScroll key={item.id} delay={index * 0.1}>
                                <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                                    <CardHeader className="p-0 relative h-56">
                                        {image && (
                                            <Image
                                                src={image.imageUrl}
                                                alt={item.name || item.title || ''}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                data-ai-hint={image.imageHint}
                                            />
                                        )}
                                        <div className="absolute top-3 right-3 z-10">
                                            <Button 
                                                size="icon" 
                                                variant="ghost" 
                                                className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white"
                                                onClick={() => toggleFavorite(item)}
                                                aria-label="Удалить из избранного"
                                            >
                                                <Heart className="w-5 h-5 text-red-500 fill-current" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 flex-grow flex flex-col">
                                        <CardTitle className="font-headline text-xl text-primary mb-2">{item.name || item.title}</CardTitle>
                                        {isHotel && 'location' in item && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                                <MapPin className="w-4 h-4"/>
                                                {item.location}
                                            </div>
                                        )}
                                        <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">{item.description}</p>
                                    </CardContent>
                                    {isHotel && 'price' in item && (
                                    <CardFooter className="p-6 pt-0">
                                        <Button className="w-full transition-transform hover:scale-105" onClick={() => onBook({type: 'Отель', name: item.name, price: item.price})}>
                                            Забронировать
                                        </Button>
                                    </CardFooter>
                                    )}
                                </Card>
                            </AnimateOnScroll>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
