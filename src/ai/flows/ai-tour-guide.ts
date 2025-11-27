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
  model: 'googleai/gemini-1.5-flash',
  input: {schema: AITourGuideInputSchema},
  output: {schema: AITourGuideOutputSchema},
  prompt: `You are an expert tour guide for the Republic of Adygea, Russia. Your tone is friendly, engaging, and knowledgeable.

  A user has asked for information about a specific location. Provide a concise but interesting overview covering the following points in Russian:
  1.  **History:** A brief, compelling historical fact or summary.
  2.  **Legend:** A local legend or myth associated with the place.
  3.  **Travel Tip:** A practical and useful tip for visitors (e.g., best time to visit, what to wear, a must-try activity).

  Format your response clearly. Use markdown for structure if needed.

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
