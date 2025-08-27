'use client'
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React from "react";

interface HeroButtonProps {
  eventSlug: string;
  ticketUrl?: string; // TEMPORARY: Added for ticket redirect
  asChild?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function HeroButton({ eventSlug, ticketUrl, asChild, children, className }: HeroButtonProps) {
  const router = useRouter();

  const handleEventDetailsClick = () => {
    // TEMPORARY: Redirect to ticket URL instead of event page
    // router.push(`/event/${eventSlug}`); // TEMPORARY: Commented out
    if (ticketUrl) {
      window.open(ticketUrl, '_blank');
    }
  };

  if (asChild) {
    return (
      <div onClick={handleEventDetailsClick} className={className}>
        {children}
      </div>
    );
  }

  return (
    <>
      <Button 
        size="lg"
        className="px-7 py-4 text-xs uppercase tracking-[0.3em] font-light border-0 min-w-60"
        style={{ 
          backgroundColor: 'var(--gold)', 
          color: 'var(--maroon-red)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        onClick={handleEventDetailsClick}
      >
        RSVP
      </Button>
      {/* TEMPORARY: Event Details button hidden - can be restored by uncommenting
      <button 
        className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white"
        style={{ transition: 'color 0.3s' }}
        onClick={handleEventDetailsClick}
      >
        Event Details
      </button>
      */}
    </>
  );
}
