// src/ai/flows/generate-initial-model-prompt.ts
'use server';

/**
 * @fileOverview Generates an initial prompt for fine-tuning a drought prediction model.
 *
 * - generateInitialModelPrompt - A function that generates the initial model prompt.
 * - GenerateInitialModelPromptInput - The input type for the generateInitialModelPrompt function.
 * - GenerateInitialModelPromptOutput - The return type for the generateInitialModelPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialModelPromptInputSchema = z.object({
  historicalDataDescription: z.string().describe('Description of the historical climate data, including available variables and time range.'),
  predictionTarget: z.string().describe('The specific drought characteristics to predict (e.g., severity, duration, affected area).'),
  location: z.string().describe('The geographical area for which the drought prediction model is being built.'),
});
export type GenerateInitialModelPromptInput = z.infer<typeof GenerateInitialModelPromptInputSchema>;

const GenerateInitialModelPromptOutputSchema = z.object({
  initialPrompt: z.string().describe('The generated initial prompt for fine-tuning the drought prediction model.'),
});
export type GenerateInitialModelPromptOutput = z.infer<typeof GenerateInitialModelPromptOutputSchema>;

export async function generateInitialModelPrompt(input: GenerateInitialModelPromptInput): Promise<GenerateInitialModelPromptOutput> {
  return generateInitialModelPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialModelPromptPrompt',
  input: {schema: GenerateInitialModelPromptInputSchema},
  output: {schema: GenerateInitialModelPromptOutputSchema},
  prompt: `You are an expert AI prompt engineer specializing in generating prompts for fine-tuning machine learning models for climate prediction.

  Given the following information about the historical climate data, the prediction target, and the location, generate an initial prompt that can be used to fine-tune a drought prediction model.

  Historical Data Description: {{{historicalDataDescription}}}
  Prediction Target: {{{predictionTarget}}}
  Location: {{{location}}}

  The generated prompt should be clear, concise, and specific to the drought prediction task. It should guide the model to learn the relationships between historical climate data and future drought events.
  The prompt MUST ask the model to:
  - Analyze historical climate data to identify patterns and correlations related to drought events.
  - Predict the likelihood and severity of future droughts based on the identified patterns.
  - Provide a risk assessment for the specified location.
  `,
});

const generateInitialModelPromptFlow = ai.defineFlow(
  {
    name: 'generateInitialModelPromptFlow',
    inputSchema: GenerateInitialModelPromptInputSchema,
    outputSchema: GenerateInitialModelPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
