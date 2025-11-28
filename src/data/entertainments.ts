import { PlaceHolderImages, ImagePlaceholder } from "@/lib/placeholder-images";
import { Activity, Waves, Mountain, Shield } from "lucide-react";

export type Entertainment = {
  id: string;
  title: string;
  description: string;
  details: {
      label: string;
      value: string;
  }[];
  type: 'entertainment';
  image?: ImagePlaceholder;
  badge?: string;
  icon: React.ElementType;
};

const entertainmentsData: Omit<Entertainment, 'image' | 'type' | 'icon'>[] = [
  {
    id: 'entertainment-rafting',
    title: 'Рафтинг по реке Белой',
    description: 'Динамичный сплав по горной реке с прохождением порогов. Доступны маршруты разной сложности для новичков и опытных.',
    details: [
        { label: "Сезон", value: "Май - Октябрь" },
        { label: "Сложность", value: "От легкой до высокой" },
        { label: "Цена", value: "от 2000 ₽/чел." },
    ],
    badge: "Популярно"
  },
  {
    id: 'entertainment-canyoning',
    title: 'Каньонинг в ущельях',
    description: 'Экстремальное приключение: спуск по каньонам горных рек с водопадами, используя альпинистское снаряжение.',
    details: [
        { label: "Места", value: "Ущелье Мишоко, Руфабго" },
        { label: "Сложность", value: "Высокая" },
        { label: "Цена", value: "от 4500 ₽/чел." },
    ],
    badge: "Экстрим"
  },
  {
    id: 'entertainment-horse-riding',
    title: 'Конные прогулки',
    description: 'Насладитесь красотой гор и лесов Адыгеи, совершив конную прогулку по живописным тропам плато Лаго-Наки.',
     details: [
        { label: "Продолжительность", value: "От 1 часа до целого дня" },
        { label: "Сложность", value: "Легкая" },
        { label: "Цена", value: "от 1500 ₽/час" },
    ],
  },
];

export const entertainments: Entertainment[] = entertainmentsData.map(item => ({
    ...item,
    type: 'entertainment',
    icon: item.id.includes('rafting') ? Waves : item.id.includes('canyoning') ? Shield : Mountain,
    image: PlaceHolderImages.find(img => img.id === item.id)
}));
