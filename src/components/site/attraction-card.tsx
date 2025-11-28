'use client';

import Image from "next/image";
import { Heart, Maximize } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { PlaceHolderImages, ImagePlaceholder } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import type { Attraction as AttractionType } from '@/data/attractions';
import { Badge } from "../ui/badge";

type AttractionCardProps = {
  attraction: AttractionType;
  onOpenModal: (attraction: AttractionType) => void;
  className?: string;
};

export default function AttractionCard({ attraction, onOpenModal, className }: AttractionCardProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const image = PlaceHolderImages.find((img) => img.id === attraction.id);
  const isFavorite = favorites.some((fav) => fav.id === attraction.id);

  return (
    <div className={cn("group w-full h-full cursor-pointer", className)}>
        <div className="relative overflow-hidden rounded-lg shadow-md h-full flex flex-col bg-card" onClick={() => onOpenModal(attraction)}>
            <div className="relative h-48 sm:h-56">
                {image && (
                <Image
                    src={image.imageUrl}
                    alt={image.description}
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
                                        toggleFavorite(attraction);
                                    }}
                                    aria-label="Добавить в избранное"
                                    >
                                    <Heart
                                        className={cn(
                                        "w-5 h-5 transition-colors",
                                        isFavorite ? "text-red-500 fill-current" : "text-white"
                                        )}
                                    />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{isFavorite ? "Удалить из избранного" : "Добавить в избранное"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                 {attraction.badge && (
                    <Badge className="absolute top-3 left-3 z-10">{attraction.badge}</Badge>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-headline text-lg font-semibold text-primary leading-tight truncate">{attraction.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-3 flex-grow">{attraction.description}</p>
                <div className="mt-4 flex justify-between items-center text-sm">
                    <p className="font-semibold text-foreground">Подробнее</p>
                    <Maximize className="w-4 h-4 text-muted-foreground" />
                </div>
            </div>
        </div>
    </div>
  );
}
