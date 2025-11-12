"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { processVisaApplication } from "@/lib/actions";
import { visaApplicationSchema } from "@/lib/schemas";
import type { VisaApplication } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import type { VisaProcessingAssistanceOutput } from "@/ai/flows/visa-processing-assistance";

export function VisaApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<VisaProcessingAssistanceOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<VisaApplication>({
    resolver: zodResolver(visaApplicationSchema),
    defaultValues: {
      fullName: "",
      nationality: "",
      passportNumber: "",
      duration: "",
    },
  });

  async function onSubmit(data: VisaApplication) {
    setIsSubmitting(true);
    setError(null);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('nationality', data.nationality);
    formData.append('passportNumber', data.passportNumber);
    formData.append('duration', data.duration);
    if (data.document && data.document[0]) {
      formData.append('document', data.document[0]);
    }
    
    const result = await processVisaApplication(formData);

    if (result.success) {
      setAnalysisResult(result.analysis!);
      form.reset();
    } else {
      setError(result.error!);
    }
    
    setIsSubmitting(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="As on passport" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Canadian" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passportNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passport Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., A12345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visa Duration</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="60">60 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Passport Copy</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept="image/*,application/pdf"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Submit Application
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {analysisResult && (
        <Alert className="mt-6">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Application Submitted & Analyzed!</AlertTitle>
          <AlertDescription>
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-semibold">Completeness Check:</h4>
                <p>{analysisResult.completenessCheck}</p>
              </div>
              <div>
                <h4 className="font-semibold">Common Error Check:</h4>
                <p>{analysisResult.errorCheck}</p>
              </div>
               <p className="text-xs text-muted-foreground pt-2">Your application has been submitted for manual review by our team. We will contact you shortly.</p>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
