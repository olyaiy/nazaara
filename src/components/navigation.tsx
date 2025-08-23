import Image from "next/image";
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-maroon-red/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/Logos/Nazaara Logo - White.svg"
              alt="Nazaara Live"
              width={200}
              height={80}
              priority
              className="h-16 w-auto"
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/events" 
              className="text-white font-prettywise font-medium hover:text-gold transition-colors"
            >
              Events
            </Link>
            <Link 
              href="/about" 
              className="text-white font-prettywise font-medium hover:text-gold transition-colors"
            >
              About
            </Link>
            <Link 
              href="/bookings" 
              className="text-white font-prettywise font-medium hover:text-gold transition-colors"
            >
              Bookings
            </Link>
            <a 
              href="https://nazaaralive.myportfolio.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-prettywise font-medium hover:text-gold transition-colors"
            >
              Gallery
            </a>
            <Link 
              href="/contact" 
              className="bg-gold text-maroon-red px-6 py-2 rounded-full font-prettywise font-semibold hover:bg-gold/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <button className="md:hidden text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}