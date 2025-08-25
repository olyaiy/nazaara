'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeroImageProps {
  eventSlug: string;
  src: string;
  alt: string;
  day: string;
  month: string;
}

export default function HeroImage({ eventSlug, src, alt, day, month }: HeroImageProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/event/${eventSlug}`);
  };

  return (
    <div className="relative w-full max-w-[360px] lg:max-w-[420px] cursor-pointer group" onClick={handleClick}>
      {/* Geometric Frame Elements */}
      <div className="absolute -top-6 -right-6 w-28 h-28 border" style={{ borderColor: 'var(--gold)', opacity: 0.2 }} />
      <div className="absolute -bottom-6 -left-6 w-28 h-28 border" style={{ borderColor: 'var(--gold)', opacity: 0.2 }} />
      
      {/* Main Poster with Creative Crop */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <div className="absolute inset-0 border" style={{ borderColor: 'var(--gold)', opacity: 0.3 }} />
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover scale-105"
          priority
        />
        {/* Subtle Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-red)]/40 via-transparent to-transparent" />
      </div>
      
      {/* Floating Date Box - Outside Image */}
      <div className="absolute -top-5 -right-5 w-16 h-16 flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--gold)' }}>
        <p className="text-xl font-serif font-light" style={{ color: 'var(--maroon-red)' }}>{day}</p>
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--maroon-red)' }}>{month}</p>
      </div>
      
      {/* Side Typography Element */}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <span className="text-xs uppercase tracking-[0.8em] text-white/20 font-light">
          Vancouver Launch
        </span>
      </div>
    </div>
  );
}
