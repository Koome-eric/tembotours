"use server";

import { Resend } from "resend";
import { visaProcessingAssistance } from "@/ai/flows/visa-processing-assistance";
import { suggestLogisticsPersonnel } from "@/ai/flows/logistics-personnel-suggestion";
import { contactFormSchema, visaApplicationSchema } from "./schemas";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'info@tembotours.com';
const FROM_EMAIL = 'Tembo Tours <info@tembotours.com>'; // Replace with a verified domain or your email

export async function processVisaApplication(data: FormData) {
  try {
    // Validate all fields with Zod
    const validatedFields = visaApplicationSchema.safeParse(Object.fromEntries(data.entries()));
    if (!validatedFields.success) {
      return { success: false, error: 'Invalid form data. Please check your inputs.', analysis: null };
    }
    const { fullName, nationality, passportNumber, duration } = validatedFields.data;
    const documentFile = data.get('document') as File;
    if (!documentFile || documentFile.size === 0) {
      return { success: false, error: 'Document is required.' };
    }
    
    // Convert file to data URI
    const arrayBuffer = await documentFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const documentDataUri = `data:${documentFile.type};base64,${buffer.toString('base64')}`;

    const result = await visaProcessingAssistance({ documentDataUri });

    // Send email notification
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `New Visa Application from ${fullName}`,
      html: `
        <h1>New Visa Application</h1>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Nationality:</strong> ${nationality}</p>
        <p><strong>Passport Number:</strong> ${passportNumber}</p>
        <p><strong>Visa Duration:</strong> ${duration} days</p>
        <p>A passport copy is attached.</p>
      `,
      attachments: [
        {
          filename: documentFile.name,
          content: buffer,
        },
      ],
    });
    
    return { success: true, analysis: result, error: null };

  } catch (error) {
    console.error(error);
    return { success: false, error: "An unexpected error occurred.", analysis: null };
  }
}


export async function getLogisticsSuggestion(prevState: any, formData: FormData) {
  const clientDetails = formData.get('clientDetails') as string;
  const eventRequirements = formData.get('eventRequirements') as string;

  if (!clientDetails || !eventRequirements) {
    return { message: 'Both fields are required.', suggestions: null, reasoning: null };
  }
  
  try {
    const result = await suggestLogisticsPersonnel({ clientDetails, eventRequirements });
    return {
      message: 'Suggestion generated successfully.',
      suggestions: result.suggestedPersonnel,
      reasoning: result.reasoning
    };
  } catch (error) {
    console.error(error);
    return { message: 'Failed to generate suggestion.', suggestions: null, reasoning: null };
  }
}

export async function sendContactEmail(
  prevState: any,
  formData: FormData
): Promise<{ message: string; }> {
    const validatedFields = contactFormSchema.safeParse(
        Object.fromEntries(formData.entries())
    );
  
    if (!validatedFields.success) {
      return { message: "Invalid data. Please check your inputs." };
    }
  
    const { name, email, subject, message } = validatedFields.data;
  
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email, // <-- change here
      subject: `Contact Form: ${subject}`,
      html: `<p>New message from <strong>${name}</strong> (${email}):</p><p>${message}</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return { message: "Failed to send message. Please try again later." };
    }
    return { message: "Your message has been sent successfully!" };
  } catch (error) {
    console.error("Email send failed:", error);
    return { message: "Failed to send message. Please try again later." };
  }
}
