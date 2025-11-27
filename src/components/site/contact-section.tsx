import { MapPin, Clock, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ContactForm from './contact-form';
import AnimateOnScroll from './animate-on-scroll';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Туристический центр',
    lines: ['г. Майкоп, ул. Советская, 177', 'Тел: +7 (8772) 52-03-44'],
  },
  {
    icon: Clock,
    title: 'Режим работы',
    lines: ['Пн - Пт: 9:00 - 18:00', 'Сб: 10:00 - 16:00, Вс: выходной'],
  },
  {
    icon: Mail,
    title: 'Связь с нами',
    lines: ['info@adygea-tourism.ru', 'Социальные сети'],
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-center font-headline text-3xl md:text-4xl font-bold text-primary mb-12">
            Полезная информация
          </h2>
        </AnimateOnScroll>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-8">
                {contactInfo.map((item, index) => (
                    <AnimateOnScroll key={index} delay={index * 0.1}>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-headline text-lg font-semibold text-primary">{item.title}</h3>
                                {item.lines.map((line, i) => (
                                    <p key={i} className="text-muted-foreground">{line}</p>
                                ))}
                            </div>
                        </div>
                    </AnimateOnScroll>
                ))}
            </div>
            <AnimateOnScroll delay={0.3}>
                <Card className="shadow-lg">
                    <CardContent className="p-6 md:p-8">
                        <h3 className="font-headline text-2xl text-primary mb-4">Напишите нам</h3>
                        <ContactForm />
                    </CardContent>
                </Card>
            </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
