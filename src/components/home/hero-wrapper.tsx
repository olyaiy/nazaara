"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface HeroWrapperProps {
  eventSlug: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function HeroWrapper({ eventSlug, children, className, style }: HeroWrapperProps) {
  const router = useRouter();
  
  const handleClick = (e: React.MouseEvent) => {
    // Only navigate if clicking on the wrapper itself, not on child links
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    router.push(`/event/${eventSlug}`);
  };

  return (
    <div className={className} style={style} onClick={handleClick}>
      {children}
    </div>
  );
}