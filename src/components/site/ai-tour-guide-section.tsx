'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { provideAITourGuide } from '@/ai/flows/ai-tour-guide';
import { Loader2, Wand2 } from 'lucide-react';
import AnimateOnScroll from './animate-on-scroll';

type AITourGuideState = {
  insight?: string;
  error?: string;
};

const initialState: AITourGuideState = {};

export default function AiTourGuideSection() {
  const [state, formAction] = useFormState(aiTourGuideAction, initialState);
  const [pending, setPending] = useState(false);

  async function aiTourGuideAction(
    prevState: AITourGuideState,
    formData: FormData
  ): Promise<AITourGuideState> {
    setPending(true);
    const location = formData.get('location') as string;
    if (!location) {
      setPending(false);
      return { error: 'Пожалуйста, введите название локации.' };
    }
    try {
      const result = await provideAITourGuide({ location });
      setPending(false);
      return { insight: result.insight };
    } catch (e) {
      setPending(false);
      return { error: 'Не удалось получить информацию. Попробуйте еще раз.' };
    }
  }

  return (
    <section id="ai-guide" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
          <Card className="max-w-3xl mx-auto shadow-xl">
            <CardHeader className="text-center">
              <Wand2 className="mx-auto h-8 w-8 text-primary mb-2" />
              <CardTitle className="font-headline text-3xl md:text-4xl text-primary">
                Ваш AI-гид по Адыгее
              </CardTitle>
              <CardDescription className="pt-2">
                Введите название любого места в Адыгее, и наш AI-гид расскажет вам его историю, местные легенды и полезные советы для путешественников.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="flex flex-col sm:flex-row gap-2">
                <Input
                  name="location"
                  placeholder="Например, плато Лагонаки"
                  required
                  className="flex-grow"
                />
                <Button type="submit" disabled={pending} className="w-full sm:w-auto">
                  {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  Рассказать
                </Button>
              </form>

              {state?.insight && (
                <div className="mt-6 p-4 bg-secondary rounded-lg border">
                  <p className="text-secondary-foreground whitespace-pre-line leading-relaxed">{state.insight}</p>
                </div>
              )}
              {state?.error && (
                <div className="mt-6 p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
                  <p>{state.error}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
