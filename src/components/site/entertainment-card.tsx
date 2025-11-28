'use client';

import Image from "next/image";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import type { Entertainment as EntertainmentType } from '@/data/entertainments';

type EntertainmentCardProps = {
  entertainment: EntertainmentType;
  className?: string;
};

export default function EntertainmentCard({ entertainment, className }: EntertainmentCardProps) {
  const Icon = entertainment.icon;

  return (
    <div className={cn("group w-full h-full cursor-pointer", className)}>
        <div className="relative overflow-hidden rounded-lg shadow-lg h-full flex flex-col bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
            {entertainment.image && (
                <div className="relative h-56">
                    <Image
                        src={entertainment.image.imageUrl}
                        alt={entertainment.image.description}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        data-ai-hint={entertainment.image.imageHint}
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
            )}
            
            <div className="p-5 flex flex-col flex-grow relative -mt-10 z-10">
                <div className="flex justify-between items-start mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center border-2 border-background/50 shadow-lg">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    {entertainment.badge && (
                        <Badge variant="destructive">{entertainment.badge}</Badge>
                    )}
                </div>

                <h3 className="font-headline text-2xl font-semibold text-foreground leading-tight mb-2">{entertainment.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-3 flex-grow">{entertainment.description}</p>
                
                <div className="mt-4 border-t border-border/50 pt-4 space-y-2">
                    {entertainment.details.map(detail => (
                        <div key={detail.label} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{detail.label}</span>
                            <span className="font-medium text-foreground">{detail.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}
