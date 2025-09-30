"use client";

import { ReactNode } from "react";

interface HeroCtaWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function HeroCtaWrapper({ children, className }: HeroCtaWrapperProps) {
  return (
    <div className={className} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
}