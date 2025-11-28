import AboutSection from '@/components/site/about-section';
import CultureSection from '@/components/site/culture-section';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden bg-background pt-16">
        <div className="container mx-auto px-4 py-16 sm:py-24 space-y-24 md:space-y-32">
            <AboutSection />
            <Separator />
            <CultureSection />
        </div>
    </main>
  );
}
