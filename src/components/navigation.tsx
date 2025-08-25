"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/75 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/Logos/Nazaara Logo - White.svg"
              alt="Nazaara Live"
              width={180}
              height={72}
              priority
              className="h-24 w-auto transition-all duration-300 group-hover:scale-105 group-hover:brightness-0 group-hover:saturate-100 group-hover:sepia group-hover:hue-rotate-15 group-hover:contrast-150"
              style={{
                filter: 'brightness(1) saturate(1) sepia(0) hue-rotate(0deg) contrast(1)'
              }}
            />
          </Link>
          
          {/* Center Navigation */}
          <div className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            <Link
              href="/about"
              aria-current={isCurrent("/about") ? "page" : undefined}
              className={cn(
                "relative group text-sm uppercase tracking-[0.2em] font-light transition-colors",
                isCurrent("/about") ? "text-primary" : "text-foreground/80 hover:text-primary"
              )}
            >
              <span>About</span>
              <span
                className={cn(
                  "pointer-events-none absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300",
                  isCurrent("/about")
                    ? "w-full opacity-90"
                    : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                )}
              />
            </Link>
            <Link
              href="/bookings"
              aria-current={isCurrent("/bookings") ? "page" : undefined}
              className={cn(
                "relative group text-sm uppercase tracking-[0.2em] font-light transition-colors",
                isCurrent("/bookings") ? "text-primary" : "text-foreground/80 hover:text-primary"
              )}
            >
              <span>Bookings</span>
              <span
                className={cn(
                  "pointer-events-none absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300",
                  isCurrent("/bookings")
                    ? "w-full opacity-90"
                    : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                )}
              />
            </Link>
            <a
              href="https://tamasha.myportfolio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm uppercase tracking-[0.2em] text-foreground/80 hover:text-primary font-light transition-colors flex items-center gap-1 group"
            >
              Gallery
              <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Right Side CTA */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/contact"
              aria-current={isCurrent("/contact") ? "page" : undefined}
              className={cn("relative group")}
            >
              <span className="text-sm uppercase tracking-[0.2em] text-primary font-light transition-colors group-hover:opacity-90">
                Contact
              </span>
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300",
                  isCurrent("/contact") ? "w-full opacity-80" : "w-0 group-hover:w-full"
                )}
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-foreground/80 hover:text-primary transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
