'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Users, Star, Crown } from "lucide-react";
import { useState } from "react";
import {
  heroContent,
  privateEventsContent,
  contactFormContent
} from "@/content/bookings";

// export const revalidate = 0;

// Helper function to map icon names to components
function getIcon(iconName: string) {
  const icons = {
    Star,
    Crown,
    Users
  };
  return icons[iconName as keyof typeof icons];
}

export default function BookingsPage() {
  interface SubmitState { isSubmitting: boolean; isSuccess: boolean; errorMessage: string | null; }
  const [contactSubmit, setContactSubmit] = useState<SubmitState>({ isSubmitting: false, isSuccess: false, errorMessage: null });
  const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;


  return (
    <div className="min-h-screen bg-[var(--black-grey)]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroContent.backgroundImage}
            alt="DJ performing with dramatic lighting"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--maroon-red)]/80 via-[var(--maroon-red)]/60 to-[var(--dark-green)]/70" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-5xl">
        
            
            {/* Main Title */}
            <h1 className="text-[clamp(4rem,10vw,10rem)] font-prettywise leading-[0.8] text-[var(--off-white)] mb-8">
              {heroContent.title}
              <span className="block text-[var(--gold)]">{heroContent.subtitle}</span>
            </h1>
            
            <p className="text-lg font-neue-haas text-[var(--off-white)]/70 leading-relaxed max-w-2xl mb-12">
              {heroContent.description}
            </p>
            
          </div>
        </div>

        {/* Gold accent at the exact bottom edge */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[9]">
          <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12">
            {/* Upward glow from the edge (fades horizontally) */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[var(--gold)]/18 to-transparent [mask-image:linear-gradient(to_right,transparent,black_35%,black_65%,transparent)]" />
            {/* Hairline sits exactly on the bottom edge */}
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] via-60% to-transparent" />
          </div>
        </div>

      </section>

      {/* Private Events Introduction */}
      <section className="py-24 bg-gradient-to-b from-[var(--black-grey)] to-[var(--maroon-red)]/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-8 h-px bg-[var(--gold)]/40" />
                <span className="text-[10px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/60">
                  {privateEventsContent.sectionTitle}
                </span>
                <div className="w-8 h-px bg-[var(--gold)]/40" />
              </div>
              
              <h2 className="text-[clamp(3rem,5vw,5rem)] font-prettywise leading-[0.9] text-[var(--off-white)] mb-8">
                {privateEventsContent.heading}
                <span className="block text-[var(--gold)]">{privateEventsContent.subHeading}</span>
              </h2>
              
              <div className="space-y-6 text-[var(--off-white)]/70 font-neue-haas leading-relaxed mb-12 max-w-3xl mx-auto">
                <p>
                  {privateEventsContent.description}
                </p>
              </div>
              
              {/* Service Details */}
              <div className="space-y-6 mb-12 max-w-2xl mx-auto">
                {privateEventsContent.services.map((service, index) => {
                  const IconComponent = getIcon(service.icon);
                  return (
                    <div key={index} className="flex items-start gap-4 text-left">
                      <IconComponent className="w-5 h-5 text-[var(--gold)] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-prettywise text-[var(--off-white)] mb-2">{service.title}</h3>
                        <p className="text-sm font-neue-haas text-[var(--off-white)]/50">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-form" className="py-24 border-t border-[var(--gold)]/10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Content */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-px bg-[var(--gold)]/20" />
                  <span className="text-[10px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40">
                    {contactFormContent.sectionTitle}
                  </span>
                </div>
                
                <h2 className="text-[clamp(3rem,5vw,5rem)] font-prettywise leading-[0.9] text-[var(--off-white)] mb-8">
                  {contactFormContent.heading}
                  <span className="block text-[var(--gold)]">{contactFormContent.subHeading}</span>
                </h2>
                
                <p className="text-lg font-neue-haas text-[var(--off-white)]/60 leading-relaxed mb-12">
                  {contactFormContent.description}
                </p>
                
                <div className="space-y-8 mb-12">
                  {contactFormContent.contactInfo.map((info, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-prettywise text-[var(--off-white)] mb-2">{info.title}</h3>
                      <p className="text-sm font-neue-haas text-[var(--off-white)]/50">
                        {info.description}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="pt-8 border-t border-[var(--gold)]/10">
                  <p className="text-sm font-neue-haas text-[var(--off-white)]/40 mb-4">
                    {contactFormContent.contactEmail.label}
                  </p>
                  <a 
                    href={`mailto:${contactFormContent.contactEmail.email}`} 
                    className="text-xl font-prettywise text-[var(--gold)] hover:text-[var(--gold)]/80 transition-colors"
                  >
                    {contactFormContent.contactEmail.email}
                  </a>
                </div>
              </div>

              {/* Right Form - Enhanced Design */}
              <div className="relative">
                {/* Premium form container with subtle gradient background */}
                <div className="relative bg-gradient-to-br from-[var(--maroon-red)]/10 via-transparent to-[var(--dark-green)]/5 sm:p-12 backdrop-blur-sm">
                  
                  <form 
                    className="space-y-8" 
                    noValidate
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!web3FormsKey) {
                        setContactSubmit({ isSubmitting: false, isSuccess: false, errorMessage: "Missing Web3Forms access key." });
                        return;
                      }
                      const form = e.currentTarget as HTMLFormElement;
                      const data = new FormData(form);
                      const payload = {
                        access_key: web3FormsKey,
                        name: data.get("name"),
                        email: data.get("email"),
                        event_type: data.get("event_type"),
                        event_date: data.get("event_date"),
                        event_location: data.get("event_location"),
                        expected_guests: data.get("expected_guests"),
                        message: data.get("message"),
                        subject: "New Booking Inquiry via Nazaara",
                      } as Record<string, unknown>;

                      setContactSubmit({ isSubmitting: true, isSuccess: false, errorMessage: null });
                      try {
                        const res = await fetch("https://api.web3forms.com/submit", {
                          method: "POST",
                          headers: { "Content-Type": "application/json", Accept: "application/json" },
                          body: JSON.stringify(payload),
                        });
                        const json = await res.json();
                        if (json?.success) {
                          setContactSubmit({ isSubmitting: false, isSuccess: true, errorMessage: null });
                          form.reset();
                        } else {
                          setContactSubmit({ isSubmitting: false, isSuccess: false, errorMessage: json?.message || "Submission failed." });
                        }
                      } catch (err) {
                        setContactSubmit({ isSubmitting: false, isSuccess: false, errorMessage: (err as Error).message });
                      }
                    }}
                  >
                    {/* Personal Information Row */}
                    <div className="grid md:grid-cols-2 gap-8">
                      {contactFormContent.formFields.personalInfo.map((field, index) => (
                        <div key={index} className="relative">
                          <label className="absolute -top-2 left-0 text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/40">
                            {field.label}
                          </label>
                          <input
                            name={index === 0 ? "name" : "email"}
                            type={field.type}
                            required={index === 0 || index === 1}
                            className="w-full px-0 pt-6 pb-3 bg-transparent border-0 border-b border-[var(--gold)]/30 text-[var(--off-white)] placeholder:text-[var(--off-white)]/20 focus:border-[var(--gold)]/60 focus:outline-none transition-all duration-300 font-neue-haas text-lg"
                            placeholder={field.placeholder}
                          />
                        </div>
                      ))}
                    </div>
                    
                    {/* Event Details Row */}
                    <div className="grid md:grid-cols-2 gap-8">
                      {contactFormContent.formFields.eventDetails.map((field, index) => (
                        <div key={index} className="relative">
                          <label className="absolute -top-2 left-0 text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/40">
                            {field.label}
                          </label>
                          <input
                            name={index === 0 ? "event_type" : "event_date"}
                            type={field.type}
                            className="w-full px-0 pt-6 pb-3 bg-transparent border-0 border-b border-[var(--gold)]/30 text-[var(--off-white)] placeholder:text-[var(--off-white)]/20 focus:border-[var(--gold)]/60 focus:outline-none transition-all duration-300 font-neue-haas text-lg"
                            placeholder={field.placeholder}
                          />
                        </div>
                      ))}
                    </div>
                    
                    {/* Location and Scale Row */}
                    <div className="grid md:grid-cols-2 gap-8">
                      {contactFormContent.formFields.locationAndScale.map((field, index) => (
                        <div key={index} className="relative">
                          <label className="absolute -top-2 left-0 text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/40">
                            {field.label}
                          </label>
                          <input
                            name={index === 0 ? "event_location" : "expected_guests"}
                            type={field.type}
                            className="w-full px-0 pt-6 pb-3 bg-transparent border-0 border-b border-[var(--gold)]/30 text-[var(--off-white)] placeholder:text-[var(--off-white)]/20 focus:border-[var(--gold)]/60 focus:outline-none transition-all duration-300 font-neue-haas text-lg"
                            placeholder={field.placeholder}
                          />
                        </div>
                      ))}
                    </div>
                    
                    {/* Vision Section */}
                    <div className="relative">
                      <label className="absolute -top-2 left-0 text-[9px] font-neue-haas uppercase tracking-[0.3em] text-[var(--gold)]/40">
                        {contactFormContent.formFields.vision.label}
                      </label>
                      <textarea
                        name="message"
                        rows={contactFormContent.formFields.vision.rows}
                        required
                        className="w-full px-0 pt-6 pb-3 bg-transparent border-0 border-b border-[var(--gold)]/30 text-[var(--off-white)] placeholder:text-[var(--off-white)]/20 focus:border-[var(--gold)]/60 focus:outline-none transition-all duration-300 font-neue-haas text-lg resize-none"
                        placeholder={contactFormContent.formFields.vision.placeholder}
                      />
                    </div>
                    
                    {/* Submit Section with Enhanced Design */}
                    <div className="pt-8 space-y-6">
                      {/* Privacy Note */}
                      <p className="text-[10px] font-neue-haas text-[var(--off-white)]/30 tracking-wider">
                        {contactSubmit.isSuccess ? "Thanks! We'll be in touch shortly." : contactFormContent.privacyNote}
                      </p>
                      
                      {/* Submit Button */}
                      <Button 
                        type="submit"
                        size="lg"
                        disabled={contactSubmit.isSubmitting}
                        className="w-full px-7 py-4 text-xs uppercase tracking-[0.3em] font-light border-0"
                        style={{ 
                          backgroundColor: 'var(--gold)', 
                          color: 'var(--maroon-red)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        {contactSubmit.isSubmitting ? 'Submitting…' : contactFormContent.submitButtonText}
                      </Button>
                      {contactSubmit.errorMessage && (
                        <p className="text-sm text-red-500/80 font-neue-haas">{contactSubmit.errorMessage}</p>
                      )}
                    </div>
                  </form>
                </div>
                
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-[var(--gold)] rotate-45" />
                  <div className="absolute bottom-1/4 left-1/3 w-48 h-48 border border-[var(--gold)] rotate-12" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
