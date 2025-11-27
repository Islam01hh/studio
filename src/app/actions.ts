'use server';

import { z } from 'zod';
import {provideAITourGuide, AITourGuideInput} from '@/ai/flows/ai-tour-guide';

// AI Tour Guide Action
export async function submitAITourGuide(prevState: any, formData: FormData) {
    const location = formData.get('location') as string;
    if (!location || location.trim().length === 0) {
        return { insight: null };
    }

    try {
        const result = await provideAITourGuide({ location });
        return result;
    } catch (error) {
        console.error(error);
        return { insight: null };
    }
}


// Schema for the contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно быть не менее 2 символов.'),
  email: z.string().email('Некорректный email.'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Сообщение должно быть не менее 10 символов.'),
});

// Server action for the contact form
export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Пожалуйста, исправьте ошибки и попробуйте снова.',
    };
  }

  // Here you would implement email sending logic
  console.log('Contact form submitted:', validatedFields.data);
  // Simulate network delay
  await new Promise(res => setTimeout(res, 1000));
  
  return {
    success: true,
    message: 'Спасибо! Ваше сообщение отправлено.',
  };
}


// Schema for the booking form
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

// Server action for the booking form
export async function submitBookingForm(prevState: any, formData: FormData) {
  const validatedFields = bookingSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      success: false,
      message: 'Пожалуйста, исправьте ошибки и попробуйте снова.',
    };
  }
  
  // Here you would implement booking logic and email sending
  console.log('Booking form submitted:', validatedFields.data);
  // Simulate network delay
  await new Promise(res => setTimeout(res, 1000));

  return {
    success: true,
    message: `Ваша заявка на бронирование "${validatedFields.data.bookingName}" принята! Мы скоро с вами свяжемся.`,
  };
}
