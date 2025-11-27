'use server';

/**
 * @fileOverview A flow to enhance gallery images using AI for improved sharpness, reduced noise, and better color.
 *
 * - enhanceGalleryImage - A function that takes an image data URI and returns an enhanced data URI.
 * - EnhanceGalleryImageInput - The input type for the enhanceGalleryImage function.
 * - EnhanceGalleryImageOutput - The return type for the enhanceGalleryImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceGalleryImageInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A gallery image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EnhanceGalleryImageInput = z.infer<typeof EnhanceGalleryImageInputSchema>;

const EnhanceGalleryImageOutputSchema = z.object({
  enhancedImageDataUri: z.string().describe('The enhanced gallery image as a data URI.'),
});
export type EnhanceGalleryImageOutput = z.infer<typeof EnhanceGalleryImageOutputSchema>;

export async function enhanceGalleryImage(input: EnhanceGalleryImageInput): Promise<EnhanceGalleryImageOutput> {
  return enhanceGalleryImageFlow(input);
}

const enhanceGalleryImagePrompt = ai.definePrompt({
  name: 'enhanceGalleryImagePrompt',
  input: {schema: EnhanceGalleryImageInputSchema},
  output: {schema: EnhanceGalleryImageOutputSchema},
  prompt: [
    {
      media: {url: '{{imageDataUri}}'},
    },
    {
      text: 'Enhance this image by improving its sharpness, reducing noise, and correcting colors to make it look its best.',
    },
  ],
  model: 'googleai/gemini-2.5-flash-image-preview',
  config: {
    responseModalities: ['TEXT', 'IMAGE'],
  },
});

const enhanceGalleryImageFlow = ai.defineFlow(
  {
    name: 'enhanceGalleryImageFlow',
    inputSchema: EnhanceGalleryImageInputSchema,
    outputSchema: EnhanceGalleryImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate(enhanceGalleryImagePrompt(input));
    return {enhancedImageDataUri: media!.url};
  }
);
