'use client'
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface HeroButtonProps {
  eventSlug: string;
  asChild?: boolean;
  children?: React.ReactNode;
}

export default function HeroButton({ eventSlug, asChild, children }: HeroButtonProps) {
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
      <button 
        className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white"
        style={{ transition: 'color 0.3s' }}
        onClick={handleEventDetailsClick}
      >
        Event Details
      </button>
    </>
  );
}
