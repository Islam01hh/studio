'use client';

import { useState, useEffect } from 'react';
import { Sun, CloudSun, CloudRain, Cloud } from 'lucide-react';
import AnimateOnScroll from './animate-on-scroll';

const weatherData = [
  { icon: Sun, temp: '+23°C', desc: 'Солнечно', color: 'text-yellow-400' },
  { icon: CloudSun, temp: '+19°C', desc: 'Переменная облачность', color: 'text-blue-300' },
  { icon: CloudRain, temp: '+15°C', desc: 'Дождь', color: 'text-gray-400' },
  { icon: Cloud, temp: '+17°C', desc: 'Облачно', color: 'text-gray-300' },
];

export default function WeatherWidget() {
  const [weather, setWeather] = useState(weatherData[0]);

  useEffect(() => {
    // Simulate fetching weather data
    const randomWeather = weatherData[Math.floor(Math.random() * weatherData.length)];
    setWeather(randomWeather);
  }, []);

  const Icon = weather.icon;

  return (
    <section className="py-12 bg-primary/90 text-primary-foreground backdrop-blur-sm">
        <AnimateOnScroll>
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12">
                    <h3 className="font-headline text-xl md:text-2xl">Погода в Майкопе</h3>
                    <div className="flex items-center gap-4">
                        <Icon className={`w-12 h-12 md:w-16 md:h-16 ${weather.color}`} />
                        <div className="text-3xl md:text-4xl font-bold">{weather.temp}</div>
                        <div className="text-lg text-primary-foreground/80">{weather.desc}</div>
                    </div>
                </div>
            </div>
        </AnimateOnScroll>
    </section>
  );
}
