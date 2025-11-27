import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import AnimatedCounter from './animated-counter';
import AnimateOnScroll from './animate-on-scroll';

const stats = [
    { value: 7792, label: 'км² площадь' },
    { value: 463, label: 'тыс. население' },
    { value: 1922, label: 'год образования' },
];

export default function AboutSection() {
    const mapImage = PlaceHolderImages.find((img) => img.id === 'adygea-map');

    return (
        <section id="about" className="py-16 md:py-24 bg-card">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <AnimateOnScroll className="w-full">
                        <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-6">
                            О Республике Адыгея
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-8">
                            Республика Адыгея — это уникальный регион на Северном Кавказе, где каждый километр земли хранит свою историю. Здесь величественные горы соседствуют с плодородными равнинами, древние традиции переплетаются с современностью, а гостеприимство местных жителей делает каждое путешествие незабываемым.
                        </p>
                        <div className="flex justify-around text-center border-t border-b border-border py-6">
                            {stats.map((stat, index) => (
                                <div key={index}>
                                    <div className="text-3xl md:text-4xl font-bold text-primary">
                                        <AnimatedCounter to={stat.value} />
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </AnimateOnScroll>
                    <AnimateOnScroll className="w-full" delay={0.2}>
                         {mapImage && (
                            <Image
                                src={mapImage.imageUrl}
                                alt={mapImage.description}
                                width={600}
                                height={500}
                                className="rounded-lg shadow-xl object-cover"
                                data-ai-hint={mapImage.imageHint}
                            />
                        )}
                    </AnimateOnScroll>
                </div>
            </div>
        </section>
    );
}
