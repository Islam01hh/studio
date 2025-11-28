'use client';

import { useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { submitBookingForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import type { BookingInfo } from '@/app/page';

const bookingSchema = z.object({
  bookingType: z.string(),
  bookingName: z.string(),
  travelDate: z.string().min(1, 'Пожалуйста, выберите дату.'),
  personCount: z.coerce.number().min(1, 'Минимум 1 человек.'),
  name: z.string().min(2, 'Имя должно быть не менее 2 символов.'),
  email: z.string().email('Некорректный email.'),
  phone: z.string().optional(),
  comments: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

type BookingModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  bookingInfo: BookingInfo;
};

export default function BookingModal({ isOpen, setIsOpen, bookingInfo }: BookingModalProps) {
  const { toast } = useToast();
  const [state, formAction, isSubmitting] = useActionState(submitBookingForm, null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      bookingType: '',
      bookingName: '',
      travelDate: '',
      personCount: 1,
      name: '',
      email: '',
      phone: '',
      comments: '',
    },
  });

  useEffect(() => {
    if (bookingInfo) {
      form.reset({
        ...form.getValues(),
        bookingType: bookingInfo.type,
        bookingName: bookingInfo.name,
      });
    }
  }, [bookingInfo, form]);

  useEffect(() => {
    if (state) {
      toast({
        title: state.success ? 'Успех!' : 'Ошибка',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        form.reset();
        setIsOpen(false);
      }
    }
  }, [state, toast, form, setIsOpen]);

  if (!bookingInfo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-xl bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">
            Бронирование: {bookingInfo.type}
          </DialogTitle>
          <DialogDescription>
            Вы бронируете "{bookingInfo.name}". {bookingInfo.price && `Стоимость ${bookingInfo.price}.`}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action={formAction} className="space-y-4 mt-4">
            <input type="hidden" {...form.register('bookingType')} />
            <input type="hidden" {...form.register('bookingName')} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="travelDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата заезда / начала</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Количество человек</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ваше имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Иван Иванов" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон (необязательно)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+7 (999) 999-99-99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Комментарии</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ваши пожелания..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Отправить заявку
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
