'use client'
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface HeroMobileButtonProps {
  eventSlug: string;
  asChild?: boolean;
  children?: React.ReactNode;
}

export default function HeroMobileButton({ eventSlug, asChild, children }: HeroMobileButtonProps) {
  const router = useRouter();

  const handleEventDetailsClick = () => {
    router.push(`/event/${eventSlug}`);
  };

  if (asChild) {
    return (
      <div onClick={handleEventDetailsClick}>
        {children}
      </div>
    );
  }

  return (
    <>
      <Button 
        className="w-full py-5 text-xs uppercase tracking-[0.3em] font-light border-0"
        style={{ 
          backgroundColor: 'var(--gold)', 
          color: 'var(--maroon-red)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        onClick={handleEventDetailsClick}
      >
        RSVP TO EVENT
      </Button>
      <button 
        className="w-full py-2 text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white"
        style={{ transition: 'color 0.3s' }}
        onClick={handleEventDetailsClick}
      >
        View Event Details
      </button>
    </>
  );
}
