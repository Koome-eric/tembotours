import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VisaApplicationForm } from "@/components/visa/VisaApplicationForm";
import { Check, FileText, Send } from "lucide-react";

const steps = [
  { icon: <FileText className="h-6 w-6 text-primary"/>, text: "Fill out the application form with your details." },
  { icon: <Check className="h-6 w-6 text-primary"/>, text: "Upload a clear copy of your passport." },
  { icon: <Send className="h-6 w-6 text-primary"/>, text: "Submit and let our AI assistant and human experts handle the rest." },
]

export default function VisaPage() {
  return (
    <div className="container mx-auto max-w-7xl px-6 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold">Hassle-Free Visa Processing</h1>
        <p className="mt-2 text-lg text-muted-foreground">Your gateway to Dubai starts here. Simple, fast, and reliable.</p>
      </header>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold">Easy 3-Step Process</h2>
            <p className="mt-2 text-muted-foreground">We've simplified the visa application to get you on your way faster.</p>
            <ul className="mt-6 space-y-6">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                    {step.icon}
                  </div>
                  <p className="ml-4 text-lg">{step.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">
              Our AI-powered assistant provides an initial check of your document for completeness and common errors, speeding up the process. All applications are then personally reviewed by our visa experts.
            </p>
        </div>
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Visa Application Form</CardTitle>
              <CardDescription>Please fill in your details accurately.</CardDescription>
            </CardHeader>
            <CardContent>
              <VisaApplicationForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
