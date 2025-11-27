'use client';

import { useActionState, useState } from 'react';
import { provideAITourGuide } from '@/ai/flows/ai-tour-guide';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2, Sparkles } from 'lucide-react';
import AnimateOnScroll from './animate-on-scroll';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export default function AITourGuideSection() {
  const [location, setLocation] = useState('');
  const [state, formAction, isPending] = useActionState(provideAITourGuide, null);

  return (
    <section id="ai-guide" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 mb-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                <Wand2 className="w-8 h-8" />
              </div>
              <CardTitle className="font-headline text-3xl md:text-4xl text-primary">
                Ваш персональный AI-гид
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Спросите о любом месте в Адыгее, и наш AI-гид расскажет вам его историю, легенды и даст полезные советы.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <Textarea
                  name="location"
                  placeholder="Например, 'Плато Лаго-Наки' или 'Хаджохская теснина'"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="text-base"
                  rows={2}
                />
                <Button type="submit" className="w-full" disabled={isPending || !location.trim()}>
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Получить совет от гида
                </Button>
              </form>

              {state && (
                <div className="mt-6">
                  {state.insight ? (
                     <Alert>
                        <Sparkles className="h-4 w-4" />
                        <AlertTitle className="font-headline text-primary">Вот что я знаю:</AlertTitle>
                        <AlertDescription className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                            {state.insight}
                        </AlertDescription>
                    </Alert>
                  ) : (
                    !isPending && (
                        <Alert variant="destructive">
                        <AlertTitle>Произошла ошибка</AlertTitle>
                        <AlertDescription>
                            Не удалось получить ответ от AI-гида. Пожалуйста, попробуйте еще раз.
                        </AlertDescription>
                        </Alert>
                    )
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
