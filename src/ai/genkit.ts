import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  // Setting a default model is not required, but it can be useful.
  // model: 'googleai/gemini-1.5-flash',
});
