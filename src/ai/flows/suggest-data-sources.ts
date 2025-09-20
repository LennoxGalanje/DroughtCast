'use server';

/**
 * @fileOverview An AI agent that suggests potential new data sources for improving the drought prediction model.
 *
 * - suggestDataSources - A function that suggests potential new data sources.
 * - SuggestDataSourcesInput - The input type for the suggestDataSources function.
 * - SuggestDataSourcesOutput - The return type for the suggestDataSources function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDataSourcesInputSchema = z.object({
  existingDataSources: z
    .string()
    .describe('A comma-separated list of the existing data sources.'),
  region: z.string().describe('The region for which to suggest data sources.'),
});
export type SuggestDataSourcesInput = z.infer<typeof SuggestDataSourcesInputSchema>;

const SuggestDataSourcesOutputSchema = z.object({
  suggestedDataSources: z
    .array(z.string())
    .describe('A list of suggested data sources to improve the drought prediction model.'),
});
export type SuggestDataSourcesOutput = z.infer<typeof SuggestDataSourcesOutputSchema>;

export async function suggestDataSources(input: SuggestDataSourcesInput): Promise<SuggestDataSourcesOutput> {
  return suggestDataSourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDataSourcesPrompt',
  input: {schema: SuggestDataSourcesInputSchema},
  output: {schema: SuggestDataSourcesOutputSchema},
  prompt: `You are an expert data scientist specializing in drought prediction.

You will suggest new data sources that can be used to improve the drought prediction model for the given region, based on the existing data sources.

Existing Data Sources: {{{existingDataSources}}}
Region: {{{region}}}

Suggest at least three data sources.

Your output should be a JSON array of strings.`,
});

const suggestDataSourcesFlow = ai.defineFlow(
  {
    name: 'suggestDataSourcesFlow',
    inputSchema: SuggestDataSourcesInputSchema,
    outputSchema: SuggestDataSourcesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
