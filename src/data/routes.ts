import { PlaceHolderImages, ImagePlaceholder } from "@/lib/placeholder-images";

export type RouteType = 'hiking' | 'auto' | 'family' | 'extreme';

export type Route = {
    id: string;
    title: string;
    duration: string;
    difficulty: string;
    distance: string;
    price: string;
    description: string;
    type: RouteType;
    image?: ImagePlaceholder;
    badge?: string;
};

const allRoutes = {
    hiking: [
        {
            id: 'route-lagonaki-hiking',
            title: 'Тропа на плато Лагонаки',
            duration: '6-8 часов',
            difficulty: 'Средняя',
            distance: '15 км',
            price: 'от 2500 ₽/чел.',
            description: 'Живописный маршрут через альпийские луга с потрясающими видами на Кавказский хребет.',
            badge: 'Популярный',
        },
        {
            id: 'route-rufabgo-hiking',
            title: 'К водопадам Руфабго',
            duration: '3-4 часа',
            difficulty: 'Легкая',
            distance: '6 км',
            price: 'от 1500 ₽/чел.',
            description: 'Семейный маршрут по оборудованной тропе к каскаду красивейших водопадов.',
        },
         {
            id: 'route-oshten-hiking',
            title: 'Восхождение на Оштен',
            duration: '2 дня',
            difficulty: 'Высокая',
            distance: '25 км',
            price: 'от 9000 ₽/чел.',
            description: 'Двухдневный поход с ночевкой и восхождением на одну из вершин Лагонакского нагорья (2804 м).',
        },
    ],
    auto: [
        {
            id: 'route-auto-ring',
            title: 'Большое кольцо Адыгеи',
            duration: '2-3 дня',
            difficulty: 'На авто',
            distance: '350 км',
            price: 'от 15000 ₽',
            description: 'Полный обзор республики с посещением основных достопримечательностей на комфортном внедорожнике.',
            badge: 'Всё и сразу',
        },
        {
            id: 'route-auto-guamka',
            title: 'Гуамское ущелье и термы',
            duration: '1 день',
            difficulty: 'На авто',
            distance: '120 км',
            price: 'от 8000 ₽',
            description: 'Поездка на ретро-поезде по узкоколейке, купание в термальных источниках.',
        },
         {
            id: 'route-auto-mountains',
            title: 'Панорамный Джип-тур',
            duration: '6-7 часов',
            difficulty: 'На авто',
            distance: '80 км',
            price: 'от 10000 ₽',
            description: 'Захватывающая поездка по самым живописным смотровым площадкам Лагонакского нагорья.',
        }
    ],
    family: [
        {
            id: 'route-family-adventure',
            title: 'Семейное приключение',
            duration: '1 день',
            difficulty: 'Для всех',
            distance: '~5 км',
            price: 'от 6000 ₽/семья',
            description: 'Легкие прогулки по Хаджохской теснине, посещение экстрим-парка "Мишоко" и пикник.',
            badge: 'Для детей',
        },
        {
            id: 'route-dolmens-and-legends',
            title: 'Дольмены и Легенды',
            duration: '4-5 часов',
            difficulty: 'Легкая',
            distance: 'переезды',
            price: 'от 2000 ₽/чел.',
            description: 'Познавательная экскурсия к древним мегалитам, где вы узнаете их тайны и легенды.',
        },
        {
            id: 'route-hansk-park',
            title: 'Прогулка по "Ханскому парку"',
            duration: '3 часа',
            difficulty: 'Очень легкая',
            distance: '2-3 км',
            price: 'от 1000 ₽/чел.',
            description: 'Спокойная прогулка по дендрологическому парку с редкими растениями, озером и чистым воздухом.',
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
            description: 'Спуск по каньону горной реки с использованием альпинистского снаряжения. Незабываемые эмоции!',
            badge: 'Адреналин',
        },
        {
            id: 'route-fisht-climbing',
            title: 'Восхождение на Фишт',
            duration: '3 дня',
            difficulty: 'Очень высокая',
            distance: '40 км',
            price: 'от 20000 ₽/чел.',
            description: 'Серьезный маршрут для опытных туристов со штурмом одной из самых красивых вершин Кавказа.',
        },
        {
            id: 'route-rafting',
            title: 'Рафтинг по реке Белой',
            duration: '2-3 часа',
            difficulty: 'Средняя',
            distance: '12 км',
            price: 'от 2000 ₽/чел.',
            description: 'Динамичный сплав по горной реке с прохождением порогов. Доступны маршруты разной сложности.',
        }
    ]
};

type RoutesData = {
    [key in RouteType]: Route[];
}

export const routesData: RoutesData = Object.entries(allRoutes).reduce((acc, [type, routes]) => {
    return {
        ...acc,
        [type]: routes.map(route => ({
            ...route,
            type: type as RouteType,
            image: PlaceHolderImages.find(img => img.id === route.id)
        }))
    }
}, {} as RoutesData);
