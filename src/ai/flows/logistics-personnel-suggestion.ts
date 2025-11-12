'use server';

/**
 * @fileOverview Suggests logistics personnel based on client details and event requirements.
 *
 * - suggestLogisticsPersonnel - A function that suggests logistics personnel.
 * - LogisticsPersonnelSuggestionInput - The input type for the suggestLogisticsPersonnel function.
 * - LogisticsPersonnelSuggestionOutput - The return type for the suggestLogisticsPersonnel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LogisticsPersonnelSuggestionInputSchema = z.object({
  clientDetails: z
    .string()
    .describe('Details about the client, including preferences and history.'),
  eventRequirements: z
    .string()
    .describe('Requirements for the event, including type, scale, and location.'),
});
export type LogisticsPersonnelSuggestionInput = z.infer<typeof LogisticsPersonnelSuggestionInputSchema>;

const LogisticsPersonnelSuggestionOutputSchema = z.object({
  suggestedPersonnel: z
    .array(z.string())
    .describe('A list of suggested logistics personnel based on the input.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the personnel suggestions.'),
});
export type LogisticsPersonnelSuggestionOutput = z.infer<typeof LogisticsPersonnelSuggestionOutputSchema>;

export async function suggestLogisticsPersonnel(
  input: LogisticsPersonnelSuggestionInput
): Promise<LogisticsPersonnelSuggestionOutput> {
  return suggestLogisticsPersonnelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'logisticsPersonnelSuggestionPrompt',
  input: {schema: LogisticsPersonnelSuggestionInputSchema},
  output: {schema: LogisticsPersonnelSuggestionOutputSchema},
  prompt: `You are an expert event logistics coordinator. Based on the client details and event requirements provided, suggest suitable logistics personnel from our team. Explain your reasoning for each suggestion.

Client Details: {{{clientDetails}}}
Event Requirements: {{{eventRequirements}}}

Provide the suggestions and reasoning in a structured format.`,
});

const suggestLogisticsPersonnelFlow = ai.defineFlow(
  {
    name: 'suggestLogisticsPersonnelFlow',
    inputSchema: LogisticsPersonnelSuggestionInputSchema,
    outputSchema: LogisticsPersonnelSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
