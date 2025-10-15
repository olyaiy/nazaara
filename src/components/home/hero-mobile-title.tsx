"use client";

import { useEffect, useRef, useState } from "react";

interface HeroMobileTitleProps {
  title: string;
}

export default function HeroMobileTitle({ title }: HeroMobileTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState("18vw");

  useEffect(() => {
    function adjustFontSize() {
      if (!titleRef.current) return;

      const titleLength = title.length;
      
      // Dynamic font sizing based on title length
      // Short titles (< 10 chars): 18vw
      // Medium titles (10-15 chars): 16vw
      // Long titles (15-20 chars): 14vw
      // Very long titles (> 20 chars): 12vw
      
      if (titleLength <= 10) {
        setFontSize("18vw");
      } else if (titleLength <= 15) {
        setFontSize("16vw");
      } else if (titleLength <= 20) {
        setFontSize("14vw");
      } else {
        setFontSize("12vw");
      }
    }

    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);
    
    return () => window.removeEventListener("resize", adjustFontSize);
  }, [title]);

  return (
    <h1
      ref={titleRef}
      className="font-prettywise leading-[1.1]"
      style={{
        color: "var(--white)",
        fontSize,
      }}
    >
      {title}
    </h1>
  );
}

