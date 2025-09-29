"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  hideAbout?: boolean;
  hideBookings?: boolean;
}

export function Navigation({ hideAbout = false, hideBookings = false }: NavigationProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close on route change and on Escape; lock body scroll when open
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/75 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="Nazaara Live home">
            <Image
              src="/Logos/Logo - Gold.png"
              alt="Nazaara Live"
              width={180}
              height={72}
              priority
              className="h-42 -ml-4 w-auto lg:h-60 transition-all duration-300 group-hover:scale-105 group-hover:brightness-0 group-hover:saturate-100 group-hover:sepia group-hover:hue-rotate-15 group-hover:contrast-150"
              style={{
                filter:
                  "brightness(1) saturate(1) sepia(0) hue-rotate(0deg) contrast(1)",
              }}
            />
          </Link>

          {/* Right Side Navigation (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {!hideAbout && (
              <Link
                href="/about"
                aria-current={isCurrent("/about") ? "page" : undefined}
                className={cn(
                  "relative group text-sm uppercase tracking-[0.2em] font-light transition-colors",
                  isCurrent("/about")
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
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
            )}
            {!hideBookings && (
              <Link
                href="/bookings"
                aria-current={isCurrent("/bookings") ? "page" : undefined}
                className={cn(
                  "relative group text-sm uppercase tracking-[0.2em] font-light transition-colors",
                  isCurrent("/bookings")
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
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
            )}
            <Link
              href="/galleries"
              aria-current={isCurrent("/galleries") ? "page" : undefined}
              className={cn(
                "relative group text-sm uppercase tracking-[0.2em] font-light transition-colors",
                isCurrent("/galleries")
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary"
              )}
            >
              <span>Gallery</span>
              <span
                className={cn(
                  "pointer-events-none absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300",
                  isCurrent("/galleries")
                    ? "w-full opacity-90"
                    : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                )}
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden text-foreground/80 hover:text-primary transition-colors p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            {open ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle navigation</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden fixed left-0 right-0 top-16 lg:top-24 origin-top border-b border-border/30 bg-background/95 backdrop-blur-md shadow-lg transition-all duration-200",
          open ? "opacity-100 scale-y-100" : "pointer-events-none opacity-0 scale-y-95"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-2 py-2">
            {!hideAbout && (
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-3 text-base uppercase tracking-[0.18em] transition-colors",
                  isCurrent("/about")
                    ? "text-primary bg-primary/10"
                    : "text-foreground/90 hover:bg-muted/30 hover:text-primary"
                )}
                aria-current={isCurrent("/about") ? "page" : undefined}
              >
                About
              </Link>
            )}
            {!hideBookings && (
              <Link
                href="/bookings"
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-3 text-base uppercase tracking-[0.18em] transition-colors",
                  isCurrent("/bookings")
                    ? "text-primary bg-primary/10"
                    : "text-foreground/90 hover:bg-muted/30 hover:text-primary"
                )}
                aria-current={isCurrent("/bookings") ? "page" : undefined}
              >
                Bookings
              </Link>
            )}
            <Link
              href="/galleries"
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-md px-3 py-3 text-base uppercase tracking-[0.18em] transition-colors",
                isCurrent("/galleries")
                  ? "text-primary bg-primary/10"
                  : "text-foreground/90 hover:bg-muted/30 hover:text-primary"
              )}
              aria-current={isCurrent("/galleries") ? "page" : undefined}
            >
              Galleries
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
