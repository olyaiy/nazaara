import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Navigation() {
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
              className="text-sm uppercase tracking-[0.2em] text-foreground/80 hover:text-primary font-light transition-colors"
            >
              About
            </Link>
            <Link 
              href="/bookings" 
              className="text-sm uppercase tracking-[0.2em] text-foreground/80 hover:text-primary font-light transition-colors"
            >
              Bookings
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
              className="relative group"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-primary font-light">
                Contact
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
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
