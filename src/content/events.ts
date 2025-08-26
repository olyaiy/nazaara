export interface Artist {
  name: string;
  instagram?: string;
  soundcloud?: string;
  image?: string;
}

export interface Event {
  id: number;
  number: string;
  slug: string;
  artist: string;
  artists?: Artist[];
  title: string;
  tagline?: string;
  description?: string;
  date: string; // e.g., "04 Sep"
  dates?: string; // Full date description for featured events
  year: string; // e.g., "2025"
  venue: string;
  venueDescription?: string; // Two-sentence venue description
  // Optional physical address for the venue. Kept separate for backward compatibility.
  venueAddress?: string;
  // Optional link to a map/directions page for the venue
  venueAddressUrl?: string;
  // Optional images to showcase the venue (paths under /public)
  venueImages?: string[];
  city: string;
  country: string;
  price: string; // displayed as ${price}
  image: string;
  status: string; // e.g., "On Sale", "Waitlist"
  isFeatured: boolean;
  ticketUrl?: string; // Optional URL for ticket purchasing
}

export const events: Event[] = [
  {
    id: 1,
    number: "01",
    slug: "nazaara-vancouver-2025",
    artist: "NAZAARA",
    artists: [
      { name: "Yasmina", image: "/Yasmina.webp", instagram: "yasmina", soundcloud: "yasmina" },
      { name: "Wian", instagram: "wian", soundcloud: "wian" },
      { name: "Sabzi", instagram: "sabzi", soundcloud: "sabzi" },
    ],
    title: "NAZAARA",
    tagline: "Live In Vancouver",
    description: "Vancouver, we begin here. Step into a soundscape built to move you.",
    date: "31 Aug",
    dates: "Sunday, August 31 · 10:00 pm - 2:00 am",
    year: "2025",
    venue: "Fortune Sound Club",
    venueDescription: "Located in the heart of Vancouver's vibrant Chinatown, Fortune Sound Club is an underground institution known for its intimate atmosphere and world-class sound system. This iconic venue has hosted legendary artists and continues to be the epicenter of Vancouver's electronic music scene.",
    venueAddress: "147 E Pender St, Vancouver, BC V6A 1T5, Canada",
    venueAddressUrl: "https://share.google/KxbmlbahhpFePIA9f",
    venueImages: [
      "/fortune-1.jpg",
      "/fortune-2.jpg",
      "/fortune-3.webp",
    ],
    city: "Vancouver",
    country: "Canada",
    price: "25",
    image: "/events/nazaaea live poster.webp",
    status: "Featured",
    isFeatured: true,
    ticketUrl: "https://www.ticketweb.ca/event/nazaara-fortune-sound-club-tickets/13937864?pl=blueprint~",
  },
  {
    id: 2,
    number: "02",
    slug: "back-2-school-aj-wavy-boston-2025",
    artist: "AJ WAVY",
    artists: [
      { name: "AJ WAVY", instagram: "ajwavy", soundcloud: "ajwavy" },
    ],
    title: "Back 2 School with AJ Wavy",
    date: "04 Sep",
    year: "2025",
    venue: "Icon Boston",
    venueDescription: "Situated in the bustling Theater District of downtown Boston, Icon is a multi-level nightlife destination that combines cutting-edge design with premium entertainment. The venue's sophisticated atmosphere and state-of-the-art production make it Boston's premier destination for unforgettable nights.",
    venueAddress: "100 Warrenton St, Boston, MA 02116, USA",
    city: "Boston",
    country: "USA",
    price: "35",
    image: "/events/back 2 school poster.webp",
    status: "Waitlist",
    isFeatured: false,
    ticketUrl: "https://flite.city/e/back-2-school-with-aj-wavy?t=website",
  },
  {
    id: 3,
    number: "03",
    slug: "back-2-school-aj-wavy-nyc-2025",
    artist: "AJ WAVY",
    artists: [
      { name: "AJ WAVY", instagram: "ajwavy", soundcloud: "ajwavy" },
    ],
    title: "Back 2 School with AJ Wavy",
    date: "05 Sep",
    year: "2025",
    venue: "EVOL New York",
    venueDescription: "Hidden in the heart of Manhattan's Lower East Side, EVOL embodies NYC's underground club culture with its raw industrial design and uncompromising sound quality. This intimate venue attracts music connoisseurs seeking authentic late-night experiences away from the mainstream.",
    venueAddress: "2 Thompson St 2nd Fl, New York, NY 10013, USA",
    city: "New York",
    country: "USA",
    price: "40",
    image: "/events/back 2 school NYC Poster.webp",
    status: "On Sale",
    isFeatured: false,
    ticketUrl: "https://flite.city/e/nyc-back-2-school-with-aj-wavy?t=website",
  },
  {
    id: 4,
    number: "04",
    slug: "back-2-school-vancouver-2025",
    artist: "SHALV, RAYTRIX & SURBEE",
    artists: [
      { name: "Shalv", instagram: "shalv", soundcloud: "shalv" },
      { name: "Raytrix", instagram: "raytrix", soundcloud: "raytrix" },
      { name: "Surbee", instagram: "surbee", soundcloud: "surbee" },
    ],
    title: "Tamasha",
    tagline: "Back to School",
    date: "12 Sep",
    year: "2025",
    venue: "The Pit",
    venueDescription: "Located within the University of British Columbia campus, The Pit is a legendary student venue known for its energetic atmosphere and diverse music offerings, making it a staple in Vancouver's nightlife for decades.",
    venueAddress: "6133 University Blvd, Vancouver, BC V6T 1Z1, Canada",
    city: "Vancouver",
    country: "Canada",
    price: "28",
    image: "/events/tamasha-back-2-school-sept-12-poster.webp",
    status: "On Sale",
    isFeatured: false,
    ticketUrl: "https://www.showpass.com/pitkickoff",
  },
  {
    id: 5,
    number: "05",
    slug: "francis-mercier-vancouver-2025",
    artist: "FRANCIS MERCIER",
    artists: [
      { name: "Francis Mercier", instagram: "francismercier", soundcloud: "francismercier" },
      { name: "Sotto Voce", instagram: "sottovoce", soundcloud: "sottovoce" },
    ],
    title: "NAZAARA ft. Francis Mercier",
    tagline: "Deep, soulful, and globally inspired Afro house and melodic sound",
    description: "Francis Mercier brings his signature Afro house and melodic sound to Fortune Sound Club with local legends on support.",
    date: "12 Sep",
    year: "2025",
    venue: "Fortune Sound Club",
    venueDescription: "Located in the heart of Vancouver's vibrant Chinatown, Fortune Sound Club is an underground institution known for its intimate atmosphere and world-class sound system. This iconic venue has hosted legendary artists and continues to be the epicenter of Vancouver's electronic music scene.",
    venueAddress: "147 E Pender St, Vancouver, BC V6A 1T5, Canada",
    venueAddressUrl: "https://share.google/KxbmlbahhpFePIA9f",
    venueImages: [
      "/fortune-1.jpg",
      "/fortune-2.jpg",
      "/fortune-3.webp",
    ],
    city: "Vancouver",
    country: "Canada",
    price: "20",
    image: "/events/Francis Mercier Poster.webp",
    status: "On Sale",
    isFeatured: false,
    ticketUrl: "https://www.ticketweb.ca/event/francis-mercier-fortune-sound-club-tickets/13934854?pl=blueprint",
  },
  {
    id: 6,
    number: "06",
    slug: "habibeats-vancouver-2025",
    artist: "Habibeats",
    artists: [
      { name: "Habibeats", instagram: "habibeats", soundcloud: "habibeats" },
      { name: "Nai", instagram: "nai", soundcloud: "nai" },
      { name: "Raediamendz", instagram: "raediamendz", soundcloud: "raediamendz" },
    ],
    title: "NAZAARA ft. Habibeats",
    date: "10 Oct",
    year: "2025",
    venue: "Fortune Sound Club",
    venueDescription: "Located in the heart of Vancouver's vibrant Chinatown, Fortune Sound Club is an underground institution known for its intimate atmosphere and world-class sound system. This iconic venue has hosted legendary artists and continues to be the epicenter of Vancouver's electronic music scene.",
    venueAddress: "147 E Pender St, Vancouver, BC V6A 1T5, Canada",
    venueAddressUrl: "https://share.google/KxbmlbahhpFePIA9f",
    venueImages: [
      "/fortune-1.jpg",
      "/fortune-2.jpg",
      "/fortune-3.webp",
    ],
    city: "Vancouver",
    country: "Canada",
    price: "20",
    image: "/events/Francis Mercier Poster.webp",
    status: "On Sale",
    isFeatured: false,
    ticketUrl: "https://www.ticketweb.ca/event/dj-habibeats-fortune-sound-club-tickets/13916184?pl=blueprintt",
  },
];

// Helper functions for backward compatibility and convenience
export const getFeaturedEvent = (): Event | undefined => {
  return events.find(event => event.isFeatured);
};

export const getUpcomingEvents = (): Event[] => {
  return events
    .filter(event => !event.isFeatured)
    .sort((a, b) => {
      // Parse dates for comparison (format: "DD MMM")
      const monthMap: { [key: string]: number } = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };
      
      const [dayA, monthA] = a.date.split(' ');
      const [dayB, monthB] = b.date.split(' ');
      
      const dateA = new Date(parseInt(a.year), monthMap[monthA], parseInt(dayA));
      const dateB = new Date(parseInt(b.year), monthMap[monthB], parseInt(dayB));
      
      return dateA.getTime() - dateB.getTime();
    });
};

export const getEventBySlug = (slug: string): Event | undefined => {
  return events.find(event => event.slug === slug);
};

// Helper to parse an Event's date into a JS Date (month/day/year)
function toDate(event: Event): Date {
  const monthMap: { [key: string]: number } = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const [day, month] = event.date.split(" ");
  return new Date(parseInt(event.year), monthMap[month], parseInt(day));
}

export const getEventForCity = (city?: string): Event | undefined => {
  if (city) {
    const match = events.find((e) => e.city.toLowerCase() === city.toLowerCase());
    if (match) return match;
  }

  // Fallback – pick the chronologically next event regardless of city
  const sorted = [...events].sort((a, b) => toDate(a).getTime() - toDate(b).getTime());
  return sorted[0] ?? getFeaturedEvent();
};
