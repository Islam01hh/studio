'use server';

/**
 * @fileOverview AI tour guide flow for providing insights on location histories,
 * local legends, and travel tips based on the current map location.
 *
 * - provideAITourGuide - A function that provides AI-powered tour guidance.
 * - AITourGuideInput - The input type for the provideAITourGuide function.
 * - AITourGuideOutput - The return type for the provideAITourGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AITourGuideInputSchema = z.object({
  location: z
    .string()
    .describe('The name of the location for which tour guidance is requested.'),
});
export type AITourGuideInput = z.infer<typeof AITourGuideInputSchema>;

const AITourGuideOutputSchema = z.object({
  insight: z
    .string()
    .describe(
      'AI-generated insights on location histories, local legends, and travel tips.'
    ),
});
export type AITourGuideOutput = z.infer<typeof AITourGuideOutputSchema>;

export async function provideAITourGuide(input: AITourGuideInput): Promise<AITourGuideOutput> {
  return aiTourGuideFlow(input);
}

const aiTourGuidePrompt = ai.definePrompt({
  name: 'aiTourGuidePrompt',
  input: {schema: AITourGuideInputSchema},
  output: {schema: AITourGuideOutputSchema},
  prompt: `You are an AI tour guide providing insights for tourists visiting Adygea.

  Provide interesting information regarding the location provided. Include its history,
  any local legends, and travel tips relevant to the location.

  Location: {{{location}}}
  `,
});

const aiTourGuideFlow = ai.defineFlow(
  {
    name: 'aiTourGuideFlow',
    inputSchema: AITourGuideInputSchema,
    outputSchema: AITourGuideOutputSchema,
  },
  async input => {
    const {output} = await aiTourGuidePrompt(input);
    return output!;
  }
);
