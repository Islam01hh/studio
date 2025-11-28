'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Wifi, ParkingSquare, Utensils, Star, Wallet, MapPin, PawPrint, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AnimateOnScroll from './animate-on-scroll';
import type { BookingInfo } from '@/app/page';


type HotelsSectionProps = {
    onBook: (info: BookingInfo) => void;
};


const hotelsData = [
    {
        id: 'hotel-lagonaki',
        name: 'Гостиничный комплекс "Лагонаки"',
        location: 'Плато Лаго-Наки',
        rating: 4.5,
        price: 'от 5500 ₽/ночь',
        description: 'Уютный отель в сердце гор с панорамными видами, рестораном кавказской кухни и спа-центром.',
        amenities: [Wifi, ParkingSquare, Utensils, Star]
    },
    {
        id: 'hotel-guzeripl',
        name: 'Гостевой дом "Гузерипль"',
        location: 'п. Гузерипль',
        rating: 4.2,
        price: 'от 3500 ₽/ночь',
        description: 'Тихий семейный отель на берегу реки Белой, идеален для любителей природы и рыбалки.',
        amenities: [Wifi, ParkingSquare, PawPrint]
    },
    {
        id: 'hotel-maykop',
        name: 'Отель "Майкоп"',
        location: 'г. Майкоп',
        rating: 4.8,
        price: 'от 4800 ₽/ночь',
        description: 'Современный бизнес-отель в центре города. Идеально подходит для деловых поездок и знакомства со столицей.',
        amenities: [Wifi, ParkingSquare, Utensils]
    },
    {
        id: 'hotel-khadzhokh',
        name: 'СПА-отель "Хаджох"',
        location: 'п. Каменномостский',
        rating: 4.7,
        price: 'от 7000 ₽/ночь',
        description: 'Роскошный спа-курорт с термальными бассейнами, широким выбором оздоровительных процедур и изысканным рестораном.',
        amenities: [Wifi, ParkingSquare, Utensils, Waves]
    }
]

export default function HotelsSection({ onBook }: HotelsSectionProps) {
  return (
    <section id="hotels" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-center font-headline text-3xl md:text-4xl font-bold text-primary mb-12">
            Где остановиться
          </h2>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {hotelsData.map((hotel, index) => {
            const image = PlaceHolderImages.find(img => img.id === hotel.id);
            return (
              <AnimateOnScroll key={hotel.id} delay={index * 0.1}>
                <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <CardHeader className="p-0 relative h-56">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={hotel.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <CardTitle className="font-headline text-xl text-primary mb-2">{hotel.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4"/>
                        {hotel.location}
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">{hotel.description}</p>
                    <div className="flex justify-between items-center text-sm mb-4">
                        <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <span className="font-bold">{hotel.rating}</span>
                        </div>
                        <div className="flex gap-2">
                           {hotel.amenities.map((Icon, i) => <Icon key={i} className="w-5 h-5 text-muted-foreground" title={Icon.displayName} />)}
                        </div>
                    </div>
                    <div className="flex items-center font-semibold text-primary">
                        <Wallet className="w-4 h-4 mr-2" />
                        <span>{hotel.price}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full transition-transform hover:scale-105" onClick={() => onBook({type: 'Отель', name: hotel.name, price: hotel.price})}>Забронировать</Button>
                  </CardFooter>
                </Card>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
