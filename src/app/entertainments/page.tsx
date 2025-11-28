'use client';

import AnimateOnScroll from '@/components/site/animate-on-scroll';
import { entertainments, Entertainment } from '@/data/entertainments';
import EntertainmentCard from '@/components/site/entertainment-card';

export default function EntertainmentsPage() {

  return (
    <main className="bg-background pt-16">
        <section id="entertainments" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <AnimateOnScroll>
                    <h1 className="text-center font-headline text-4xl md:text-5xl font-bold text-primary mb-2">
                        Развлечения и Активный отдых
                    </h1>
                    <p className="text-center max-w-3xl mx-auto text-muted-foreground mb-12 text-lg">
                        Почувствуйте вкус приключений в Адыгее! От экстремальных спусков и сплавов до спокойных конных прогулок.
                    </p>
                </AnimateOnScroll>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {entertainments.map((item, index) => (
                    <AnimateOnScroll key={item.id} className="h-full" delay={index * 0.05}>
                        <EntertainmentCard entertainment={item} className="h-full"/>
                    </AnimateOnScroll>
                    ))}
                </div>
            </div>
        </section>
    </main>
  );
}
