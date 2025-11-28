import { Wifi, ParkingSquare, Utensils, Star, PawPrint, Waves } from 'lucide-react';
import { PlaceHolderImages, ImagePlaceholder } from "@/lib/placeholder-images";

export type Amenity = 'wifi' | 'parking' | 'restaurant' | 'pets_allowed' | 'spa';

export type Hotel = {
    id: string;
    name: string;
    location: string;
    rating: number;
    price: string;
    description: string;
    amenities: Amenity[];
    type: 'hotel';
    image?: ImagePlaceholder;
    badge?: string;
};

const hotelsData: Omit<Hotel, 'image' | 'type'>[] = [
    {
        id: 'hotel-lagonaki',
        name: 'Гостиничный комплекс "Лагонаки"',
        location: 'Плато Лаго-Наки',
        rating: 4.5,
        price: 'от 5500 ₽/ночь',
        description: 'Уютный отель в сердце гор с панорамными видами, рестораном кавказской кухни и спа-центром.',
        amenities: ['wifi', 'parking', 'restaurant'],
        badge: 'Лучший вид'
    },
    {
        id: 'hotel-guzeripl',
        name: 'Гостевой дом "Гузерипль"',
        location: 'п. Гузерипль',
        rating: 4.2,
        price: 'от 3500 ₽/ночь',
        description: 'Тихий семейный отель на берегу реки Белой, идеален для любителей природы и рыбалки. Можно с питомцами.',
        amenities: ['wifi', 'parking', 'pets_allowed'],
    },
    {
        id: 'hotel-maykop',
        name: 'Отель "Майкоп"',
        location: 'г. Майкоп',
        rating: 4.8,
        price: 'от 4800 ₽/ночь',
        description: 'Современный бизнес-отель в центре города. Идеально подходит для деловых поездок и знакомства со столицей.',
        amenities: ['wifi', 'parking', 'restaurant'],
        badge: 'Центр города'
    },
    {
        id: 'hotel-khadzhokh',
        name: 'СПА-отель "Хаджох"',
        location: 'п. Каменномостский',
        rating: 4.7,
        price: 'от 7000 ₽/ночь',
        description: 'Роскошный спа-курорт с термальными бассейнами, широким выбором оздоровительных процедур и изысканным рестораном.',
        amenities: ['wifi', 'parking', 'restaurant', 'spa'],
        badge: 'СПА и релакс'
    }
];


export const hotels: Hotel[] = hotelsData.map(hotel => ({
    ...hotel,
    type: 'hotel',
    image: PlaceHolderImages.find(img => img.id === hotel.id)
}));
