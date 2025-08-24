import React from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  size?: "lg" | "md";
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  size = "lg",
  className = "",
}: SectionHeaderProps) {
  const titleSize =
    size === "lg"
      ? "text-[clamp(4rem,8vw,8rem)]"
      : "text-[clamp(2.5rem,5vw,4rem)]";

  return (
    <div className={`mb-12 ${className}`}>
      <div className="flex items-baseline gap-8 mb-2">
        <span className="text-[9px] font-neue-haas uppercase tracking-[0.5em] text-[var(--gold)]/40">
          {eyebrow}
        </span>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-[var(--gold)]/20 to-transparent" />
      </div>
      <h2
        className={`${titleSize} font-prettywise leading-[0.8] text-foreground`}
      >
        {title}
      </h2>
    </div>
  );
}

