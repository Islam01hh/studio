'use client';

import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { submitBookingForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const bookingSchema = z.object({
  route: z.string({ required_error: 'Пожалуйста, выберите маршрут.' }),
  travelDate: z.string().min(1, 'Пожалуйста, выберите дату.'),
  personCount: z.coerce.number().min(1, 'Минимум 1 человек.'),
  name: z.string().min(2, 'Имя должно быть не менее 2 символов.'),
  email: z.string().email('Некорректный email.'),
  phone: z.string().optional(),
  comments: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingForm({ routeOptions }: { routeOptions: { value: string; label: string }[] }) {
  const { toast } = useToast();
  const [state, formAction] = useActionState(submitBookingForm, null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      route: '',
      travelDate: '',
      personCount: 1,
      name: '',
      email: '',
      phone: '',
      comments: '',
    },
  });

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.success ? 'Успех!' : 'Ошибка',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        form.reset();
      }
    }
  }, [state, toast, form]);

  return (
    <Form {...form}>
      <form
        action={formAction}
        className="space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="route"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Маршрут</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите туристический маршрут" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {routeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
                control={form.control}
                name="travelDate"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Дата поездки</FormLabel>
                    <FormControl>
                        <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
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
        </div>
        <div className="grid md:grid-cols-2 gap-6">
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
        </div>
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
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
           {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Отправить заявку
        </Button>
      </form>
    </Form>
  );
}
