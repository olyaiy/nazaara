export type FeaturedEvent = {
  id: number;
  artist: string;
  title: string;
  tagline: string;
  tour: string;
  description: string;
  dates: string;
  venue: string;
  city: string;
  country: string;
  image: string;
  price: string;
  availability: number;
};

export const featuredEvent: FeaturedEvent = {
  id: 1,
  artist: "NAZAARA",
  title: "Live In Vancouver",
  tagline:
    "Vancouver, we begin here. Step into a soundscape built to move you.",
  tour: "Featuring Yasmina, Sabzi & Wian",
  description:
    "An evening shaped by music, culture, and movement at Vancouver's most iconic dance floor. Three continents of sound converge for one unforgettable night.",
  dates: "Sunday, August 31 · 10:00 pm - 2:00 am",
  venue: "Fortune Sound Club, Vancouver",
  city: "Vancouver",
  country: "Canada",
  image: "/events/nazaaea live poster.webp",
  price: "25",
  availability: 75,
};

export type UpcomingEvent = {
  id: number;
  number: string;
  artist: string;
  title: string;
  date: string; // e.g., "04 Sep"
  year: string; // e.g., "2024"
  venue: string;
  city: string;
  country: string;
  price: string; // displayed as ${price}
  image: string;
  status: string; // e.g., "On Sale", "Waitlist"
};

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: 2,
    number: "02",
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
  },
  {
    id: 3,
    number: "03",
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
  },
  {
    id: 4,
    number: "04",
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
  },
  {
    id: 5,
    number: "05",
    artist: "AR Rahman",
    title: "Symphony Orchestra",
    date: "15 Jun",
    year: "2025",
    venue: "Sydney Opera House",
    city: "Sydney",
    country: "Australia",
    price: "250",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
    status: "Exclusive",
  },
  {
    id: 6,
    number: "06",
    artist: "Bollywood Night",
    title: "Summer Beach Party",
    date: "04 Jul",
    year: "2025",
    venue: "Miami Beach",
    city: "Miami",
    country: "USA",
    price: "35",
    image: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80",
    status: "On Sale",
  },
];

