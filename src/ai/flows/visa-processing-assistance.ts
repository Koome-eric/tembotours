'use server';

/**
 * @fileOverview An AI agent for assisting users with visa processing.
 *
 * - visaProcessingAssistance - A function that handles the visa document check process.
 * - VisaProcessingAssistanceInput - The input type for the visaProcessingAssistance function.
 * - VisaProcessingAssistanceOutput - The return type for the visaProcessingAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VisaProcessingAssistanceInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A visa document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type VisaProcessingAssistanceInput = z.infer<
  typeof VisaProcessingAssistanceInputSchema
>;

const VisaProcessingAssistanceOutputSchema = z.object({
  completenessCheck: z
    .string()
    .describe('The completeness check of the visa document.'),
  errorCheck: z.string().describe('The common error check of the visa document.'),
});

export type VisaProcessingAssistanceOutput = z.infer<
  typeof VisaProcessingAssistanceOutputSchema
>;

export async function visaProcessingAssistance(
  input: VisaProcessingAssistanceInput
): Promise<VisaProcessingAssistanceOutput> {
  return visaProcessingAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'visaProcessingAssistancePrompt',
  input: {schema: VisaProcessingAssistanceInputSchema},
  output: {schema: VisaProcessingAssistanceOutputSchema},
  prompt: `You are an expert visa assistant. You will check the document for completeness and common errors.

  Use the following as the primary source of information about the document.

  Document: {{media url=documentDataUri}}`,
});

const visaProcessingAssistanceFlow = ai.defineFlow(
  {
    name: 'visaProcessingAssistanceFlow',
    inputSchema: VisaProcessingAssistanceInputSchema,
    outputSchema: VisaProcessingAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
