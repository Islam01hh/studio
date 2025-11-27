import { Music, Utensils, Palette, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimateOnScroll from './animate-on-scroll';

const cultureItems = [
  {
    icon: Music,
    title: 'Адыгская музыка',
    description: 'Традиционные мелодии и танцы, передающие дух народа',
  },
  {
    icon: Utensils,
    title: 'Национальная кухня',
    description: 'Уникальные блюда: адыгейский сыр, мамалыга, шашлык',
  },
  {
    icon: Palette,
    title: 'Народные ремесла',
    description: 'Золотое шитье, резьба по дереву, плетение',
  },
  {
    icon: CalendarDays,
    title: 'Праздники',
    description: 'Национальные празднества и фестивали круглый год',
  },
];

export default function CultureSection() {
  return (
    <section id="culture" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
            <h2 className="text-center font-headline text-3xl md:text-4xl font-bold text-primary mb-12">
                Культура и традиции
            </h2>
        </AnimateOnScroll>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cultureItems.map((item, index) => (
            <AnimateOnScroll key={index} delay={index * 0.1}>
              <Card className="text-center h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 mb-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline text-xl text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
