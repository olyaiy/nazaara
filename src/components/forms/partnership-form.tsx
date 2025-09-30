'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

interface SubmitState {
  isSubmitting: boolean;
  isSuccess: boolean;
  errorMessage: string | null;
}

export function PartnershipForm() {
  const [partnershipType, setPartnershipType] = useState<string>("");
  const [state, setState] = useState<SubmitState>({ isSubmitting: false, isSuccess: false, errorMessage: null });

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!accessKey) {
      setState({ isSubmitting: false, isSuccess: false, errorMessage: "Missing Web3Forms access key." });
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload: Record<string, unknown> = {
      access_key: accessKey,
      name: formData.get("name"),
      email: formData.get("email"),
      organization: formData.get("organization"),
      partnership_type: partnershipType,
      message: formData.get("message"),
      subject: "New Partnership Inquiry via Nazaara", // helps identify source in mailbox
    };

    setState({ isSubmitting: true, isSuccess: false, errorMessage: null });
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result?.success) {
        setState({ isSubmitting: false, isSuccess: true, errorMessage: null });
        form.reset();
        setPartnershipType("");
      } else {
        setState({ isSubmitting: false, isSuccess: false, errorMessage: result?.message || "Submission failed." });
      }
    } catch (err) {
      setState({ isSubmitting: false, isSuccess: false, errorMessage: (err as Error).message });
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            required
            className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-[var(--gold)] focus:outline-none transition-colors font-light"
          />
        </div>
        <div>
          <input
            name="organization"
            type="text"
            placeholder="Organization"
            className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-[var(--gold)] focus:outline-none transition-colors font-light"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-[var(--gold)] focus:outline-none transition-colors font-light"
          />
        </div>
        <div>
          <Select value={partnershipType} onValueChange={setPartnershipType}>
            <SelectTrigger className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/50 text-foreground focus:border-[var(--gold)] focus:outline-none transition-colors font-light rounded-none shadow-none h-auto data-[placeholder]:text-muted-foreground/50">
              <SelectValue placeholder="Partnership Type" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              <SelectItem value="venue" className="text-foreground hover:text-foreground focus:text-foreground hover:bg-muted/10 focus:bg-muted/10">Venue Partnership</SelectItem>
              <SelectItem value="corporate" className="text-foreground hover:text-foreground focus:text-foreground hover:bg-muted/10 focus:bg-muted/10">Corporate Collaboration</SelectItem>
              <SelectItem value="media" className="text-foreground hover:text-foreground focus:text-foreground hover:bg-muted/10 focus:bg-muted/10">Media Partnership</SelectItem>
              <SelectItem value="other" className="text-foreground hover:text-foreground focus:text-foreground hover:bg-muted/10 focus:bg-muted/10">Other</SelectItem>
            </SelectContent>
          </Select>
          {/* Ensure value is included in form submissions if needed elsewhere */}
          <input type="hidden" name="partnership_type" value={partnershipType} />
        </div>
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Tell us about your vision..."
          rows={4}
          required
          className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-[var(--gold)] focus:outline-none transition-colors font-light resize-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between pt-4 sm:pt-6">
        <p className="text-xs text-muted-foreground font-light order-2 sm:order-1">
          {state.isSuccess ? "Thanks! We'll be in touch within 48 hours." : "We typically respond within 48 hours"}
        </p>
        <Button
          type="submit"
          disabled={state.isSubmitting}
          className="bg-[var(--gold)] text-[var(--maroon-red)] hover:bg-[var(--gold)]/90 px-8 sm:px-12 py-5 sm:py-6 text-xs sm:text-sm uppercase tracking-wider font-light w-full sm:w-auto order-1 sm:order-2"
        >
          {state.isSubmitting ? "Submitting..." : "Begin Conversation"}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {state.errorMessage && (
        <p className="text-sm text-red-500/80 font-light">{state.errorMessage}</p>
      )}
    </form>
  );
}


