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
  tour?: string;
  description?: string;
  date: string; // e.g., "04 Sep"
  dates?: string; // Full date description for featured events
  year: string; // e.g., "2024"
  venue: string;
  venueDescription?: string; // Two-sentence venue description
  // Optional physical address for the venue. Kept separate for backward compatibility.
  venueAddress?: string;
  city: string;
  country: string;
  price: string; // displayed as ${price}
  image: string;
  status: string; // e.g., "On Sale", "Waitlist"
  isFeatured: boolean;
}

export const events: Event[] = [
  {
    id: 1,
    number: "01",
    slug: "nazaara-live-vancouver-2024",
    artist: "NAZAARA",
    artists: [
      { name: "Yasmina", image: "/Yasmina.webp", instagram: "yasmina", soundcloud: "yasmina" },
      { name: "Sabzi", instagram: "sabzi", soundcloud: "sabzi" },
      { name: "Wian", instagram: "wian", soundcloud: "wian" },
    ],
    title: "Live In Vancouver",
    tagline: "Vancouver, we begin here. Step into a soundscape built to move you.",
    tour: "Yasmina, Sabzi & Wian",
    description: "An evening shaped by music, culture, and movement at Vancouver's most iconic dance floor. Three continents of sound converge for one unforgettable night.",
    date: "31 Aug",
    dates: "Sunday, August 31 · 10:00 pm - 2:00 am",
    year: "2024",
    venue: "Fortune Sound Club",
    venueDescription: "Located in the heart of Vancouver's vibrant Chinatown, Fortune Sound Club is an underground institution known for its intimate atmosphere and world-class sound system. This iconic venue has hosted legendary artists and continues to be the epicenter of Vancouver's electronic music scene.",
    venueAddress: "147 E Pender St, Vancouver, BC V6A 1T6, Canada",
    city: "Vancouver",
    country: "Canada",
    image: "/events/nazaaea live poster.webp",
    price: "25",
    status: "Featured",
    isFeatured: true,
  },
  {
    id: 2,
    number: "02",
    slug: "aj-wavy-back-2-school-boston-2024",
    artist: "AJ WAVY",
    artists: [
      { name: "AJ WAVY", instagram: "ajwavy", soundcloud: "ajwavy" },
    ],
    title: "Back 2 School",
    date: "04 Sep",
    year: "2024",
    venue: "Icon Boston",
    venueDescription: "Situated in the bustling Theater District of downtown Boston, Icon is a multi-level nightlife destination that combines cutting-edge design with premium entertainment. The venue's sophisticated atmosphere and state-of-the-art production make it Boston's premier destination for unforgettable nights.",
    venueAddress: "100 Warrenton St, Boston, MA 02116, USA",
    city: "Boston",
    country: "USA",
    price: "35",
    image: "/events/back 2 school poster.webp",
    status: "Waitlist",
    isFeatured: false,
  },
  {
    id: 3,
    number: "03",
    slug: "tamasha-strictly-bollywood-calgary-2024",
    artist: "SABZI & RAYTRIX",
    artists: [
      { name: "Sabzi", instagram: "sabzi", soundcloud: "sabzi" },
      { name: "Raytrix", instagram: "raytrix", soundcloud: "raytrix" },
    ],
    title: "Strictly Bollywood",
    date: "23 Aug",
    year: "2024",
    venue: "LVL Three Calgary",
    venueDescription: "Perched above Calgary's dynamic downtown core, LVL Three offers an elevated nightlife experience with panoramic city views. This sophisticated venue combines craft cocktails, premium atmosphere, and carefully curated music programming.",
    // Address unknown; leaving undefined intentionally
    city: "Calgary",
    country: "Canada",
    price: "28",
    image: "/events/TAMASHA Strictly Bollywood Poster.webp",
    status: "On Sale",
    isFeatured: false,
  },
  {
    id: 4,
    number: "04",
    slug: "aj-wavy-back-2-school-nyc-2024",
    artist: "AJ WAVY",
    artists: [
      { name: "AJ WAVY", instagram: "ajwavy", soundcloud: "ajwavy" },
    ],
    title: "Back 2 School NYC",
    date: "05 Sep",
    year: "2024",
    venue: "EVOL New York",
    venueDescription: "Hidden in the heart of Manhattan's Lower East Side, EVOL embodies NYC's underground club culture with its raw industrial design and uncompromising sound quality. This intimate venue attracts music connoisseurs seeking authentic late-night experiences away from the mainstream.",
    // Address unknown; leaving undefined intentionally
    city: "New York",
    country: "USA",
    price: "40",
    image: "/events/back 2 school NYC Poster.webp",
    status: "On Sale",
    isFeatured: false,
  },
  {
    id: 5,
    number: "05",
    slug: "francis-mercier-fortune-sound-club-vancouver-2024",
    artist: "FRANCIS MERCIER",
    artists: [
      { name: "FRANCIS MERCIER", instagram: "francismercier", soundcloud: "francismercier" },
    ],
    title: "Live at Fortune Sound Club",
    tagline: "Deep, soulful, and globally inspired Afro house and melodic sound",
    tour: "Featuring Freeky.P & I Am Sotto Voce",
    description: "Francis Mercier brings his signature Afro house and melodic sound to Fortune Sound Club with local legends on support.",
    date: "12 Sep",
    dates: "Friday, September 12",
    year: "2024",
    venue: "Fortune Sound Club",
    venueDescription: "Located in the heart of Vancouver's vibrant Chinatown, Fortune Sound Club is an underground institution known for its intimate atmosphere and world-class sound system. This iconic venue has hosted legendary artists and continues to be the epicenter of Vancouver's electronic music scene.",
    venueAddress: "147 E Pender St, Vancouver, BC V6A 1T6, Canada",
    city: "Vancouver",
    country: "Canada",
    price: "20",
    image: "/events/Francis Mercier Poster.webp",
    status: "On Sale",
    isFeatured: false,
  },
  {
    id: 6,
    number: "06",
    slug: "neon-affair-wavy-edition-kolkata-2024",
    artist: "Neon Affair",
    artists: [
      { name: "Neon Affair", instagram: "neonaffair", soundcloud: "neonaffair" },
    ],
    title: "The Wavy Edition",
    tagline: "The city's most exclusive night returns",
    tour: "Featuring DJ Shubham",
    description: "AJ Wavy all the way from London headlines an unforgettable evening of sound and spectacle. Limited capacity. Maximum energy. All class.",
    date: "24 Aug",
    dates: "Sunday, August 24 · 5:00 pm onwards",
    year: "2024",
    venue: "Miss Ginko",
    venueDescription: "Nestled in the cultural heart of Kolkata, Miss Ginko is an exclusive boutique venue known for its curated ambiance and artistic interior design. This intimate space offers a sophisticated atmosphere where music, art, and culture converge for select audiences.",
    // Address unknown; leaving undefined intentionally
    city: "Kolkata",
    country: "India",
    price: "20",
    image: "/events/neon affair.webp",
    status: "On Sale",
    isFeatured: false,
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
