export interface Event {
  id: number;
  number: string;
  slug: string;
  artist: string;
  title: string;
  tagline?: string;
  tour?: string;
  description?: string;
  date: string; // e.g., "04 Sep"
  dates?: string; // Full date description for featured events
  year: string; // e.g., "2024"
  venue: string;
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
    title: "Live In Vancouver",
    tagline: "Vancouver, we begin here. Step into a soundscape built to move you.",
    tour: "Featuring Yasmina, Sabzi & Wian",
    description: "An evening shaped by music, culture, and movement at Vancouver's most iconic dance floor. Three continents of sound converge for one unforgettable night.",
    date: "31 Aug",
    dates: "Sunday, August 31 · 10:00 pm - 2:00 am",
    year: "2024",
    venue: "Fortune Sound Club, Vancouver",
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
    title: "Back 2 School",
    date: "04 Sep",
    year: "2024",
    venue: "Icon Boston",
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
    artist: "TAMASHA",
    title: "Strictly Bollywood",
    date: "23 Aug",
    year: "2024",
    venue: "LVL Three Calgary",
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
    title: "Back 2 School NYC",
    date: "05 Sep",
    year: "2024",
    venue: "EVOL New York",
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
    title: "Live at Fortune Sound Club",
    tagline: "Deep, soulful, and globally inspired Afro house and melodic sound",
    tour: "Featuring Freeky.P & I Am Sotto Voce",
    description: "Francis Mercier brings his signature Afro house and melodic sound to Fortune Sound Club with local legends on support.",
    date: "12 Sep",
    dates: "Friday, September 12",
    year: "2024",
    venue: "Fortune Sound Club",
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
    title: "The Wavy Edition",
    tagline: "The city's most exclusive night returns",
    tour: "Featuring DJ Shubham",
    description: "AJ Wavy all the way from London headlines an unforgettable evening of sound and spectacle. Limited capacity. Maximum energy. All class.",
    date: "24 Aug",
    dates: "Sunday, August 24 · 5:00 pm onwards",
    year: "2024",
    venue: "Miss Ginko",
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

