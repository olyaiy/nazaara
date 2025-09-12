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
    description: `Vancouver, we begin here. Step into a soundscape built to move you👁️‍🗨️

On August 31, we launch NAZAARA at the legendary @fortunesound 🌐 An evening shaped by music, culture, and movement at Vancouver's most iconic dance floor.

We're excited to welcome @yas.mina to Vancouver for her debut at NAZAARA✨Known for her versatile style and natural feel for her audience, she's been building a name across North America and beyond, with performances spanning LA, Montreal, and Morocco.

Joining her is our very own @djsabzii from Vancouver and @wian_music all the way from India, each bringing their own distinct sound to the journey. Hosted by @shalv.m 🪭

One night. Three continents of sound. This is NAZAARA, and it starts now 🧿

📍 @fortunesound
📅 Sunday, August 31 (Long Weekend)
⏰ 10PM till Late`,
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
    description: `This Back 2 School season, join us to kick off your semester with @itsajwavy & special guests 👀 for ONE NIGHT ONLY in Boston & New York 🗽🇺🇸

@itsajwavy x @nazaara.live take over @iconnightclub1 & @evolclubnyc ft. his viral mashups along with timeless bollywood bangers🪩

Roll call: Bring your crew. Sing every hook. Own the floor💃🏻

📍Boston: September 04 | @iconnightclub1
📍New York City: September 05 | @evolclubnyc

🍾 Bottle Service: DM @nazaara.live`,
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
    description: `This Back 2 School season, join us to kick off your semester with @itsajwavy & special guests 👀 for ONE NIGHT ONLY in Boston & New York 🗽🇺🇸

@itsajwavy x @nazaara.live take over @iconnightclub1 & @evolclubnyc ft. his viral mashups along with timeless bollywood bangers🪩

Roll call: Bring your crew. Sing every hook. Own the floor💃🏻

📍Boston: September 04 | @iconnightclub1
📍New York City: September 05 | @evolclubnyc

🍾 Bottle Service: DM @nazaara.live`,
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
    description: `ANCOUUUVER! this back to school, we're bringing back the city's favourite: TAMASHA 🌍✨ bollywood that feels like home, global sounds that keep you moving all night.

if you know, you know. if you don't, now's your chance 🙏

behind the decks: @shalv.m, @djsurbee & @raytrixofficial vancouver's finest, bringing the classic TAMASHA Sound you've been waiting for all summer.

you bring the energy, we'll bring the bangers. let's kick off the semester the only way we know how, it's a tradition after all 🤭

📍 @thepitubc
📅 friday, september 12
⏰ 9:30pm – 2am
🪩 19+ event`,
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
    image: "/events/Habibeats.jpg",
    status: "On Sale",
    isFeatured: false,
    ticketUrl: "https://www.ticketweb.ca/event/dj-habibeats-fortune-sound-club-tickets/13916184?pl=blueprintt",
  },
  {
    id: 7,
    number: "07",
    slug: "tamasha-all-white-retro-affair-calgary-2025",
    artist: "SHALV & REMY",
    artists: [
      { name: "Shalv", instagram: "shalv", soundcloud: "shalv" },
      { name: "Remy", instagram: "remy", soundcloud: "remy" },
    ],
    title: "Tamasha",
    tagline: "An All White Retro Affair",
    description: `CALGARY! 🚨 Nazaara is bringing you a new experience: AN ALL WHITE RETRO AFFAIR🤍

Step into a night where classics and throwbacks collide with the energy of today, bringing you timeless anthems and iconic singalongs in true retro style.

We are flying in the perfect DJs for this occasion. Vancouver’s very own SHALV and Toronto’s vibe setter REMY will be behind the decks, bringing the sounds and nostalgia that define a Tamasha night while giving Calgary a retro experience that you’ll remember long after the last track fades.

📅 Saturday, Sept 27
📍 LVL 3 Bar & Lounge, 818 16 Ave SW
⏰ 10PM - Late
🪩 18+ Event

For Vip/Table Reservations, Call/text: (403) 605-1435
Note: Tables are reserved exclusively for those who have made a reservation.`,
    date: "27 Sep",
    year: "2025",
    venue: "LVL 3 Bar & Lounge",
    venueDescription: "Situated on Calgary's buzzing 17th Ave, LVL 3 Bar & Lounge offers an elevated nightlife experience with cutting-edge lighting, premium sound, and a spacious dance floor.",
    venueAddress: "818 16 Ave SW, Calgary, AB, Canada",
    city: "Calgary",
    country: "Canada",
    price: "18.08",
    image: "/events/all-white-party.webp",
    status: "On Sale",
    isFeatured: false,
    ticketUrl: "https://www.showpass.com/retroaffair/",
  },
  {
    id: 8,
    number: "08",
    slug: "tamasha-in-toronto-2025",
    artist: "AARMASH, REMY & R.O.Y.",
    artists: [
      { name: "AARMASH" },
      { name: "REMY" },
      { name: "R.O.Y." },
    ],
    title: "TAMASHA IN TORONTO",
    tagline: "TAMASHA is finally in the 6ix this September",
    description: `TORONTO 📣 We’re bringing the TAMASHA experience back on Friday, September 26 and it’s going to be epic. Get ready to party with resident DJ REMY along with debut performances by AARMASH and ROY 🎧🔥

Expect Bollywood bangers, epic mashups, timeless anthems and nonstop vibes that will keep you on your toes 🪩💥 If you were at our last event you already know the vibes, and if you missed it this is your chance to be part of the madness!

📅 Friday, September 26
📍 @pearltoronto
⏰ 10 PM to 2:30 AM
🔞 19+ Event`,
    date: "26 Sep",
    year: "2025",
    venue: "Pearl Toronto",
    venueAddress: "184 Pearl Street, Toronto, ON M5H 1Y2, Canada",
    city: "Toronto",
    country: "Canada",
    price: "23.17",
    image: "/events/tamasha toronto.jpg",
    status: "On Sale",
    isFeatured: false,
    ticketUrl: "https://www.eventbrite.ca/e/tamasha-in-toronto-tickets-1689639660709?aff=oddtdtcreator",
  },
];

// Helper functions for backward compatibility and convenience
export const getFeaturedEvent = (): Event | undefined => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day for comparison
  
  return events.find(event => {
    if (!event.isFeatured) return false;
    
    // Parse event date
    const monthMap: { [key: string]: number } = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    
    const [day, month] = event.date.split(' ');
    const eventDate = new Date(parseInt(event.year), monthMap[month], parseInt(day));
    
    // Only return featured event if it's today or in the future
    return eventDate >= today;
  });
};

export const getUpcomingEvents = (): Event[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day for comparison
  
  return events
    .filter(event => {
      if (event.isFeatured) return false;
      
      // Parse event date
      const monthMap: { [key: string]: number } = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };
      
      const [day, month] = event.date.split(' ');
      const eventDate = new Date(parseInt(event.year), monthMap[month], parseInt(day));
      
      // Only include events that are today or in the future
      return eventDate >= today;
    })
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
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day for comparison
  
  // Filter out past events
  const upcomingEvents = events.filter(event => {
    const eventDate = toDate(event);
    return eventDate >= today;
  });
  
  if (city) {
    const match = upcomingEvents.find((e) => e.city.toLowerCase() === city.toLowerCase());
    if (match) return match;
  }

  // Fallback – pick the chronologically next upcoming event regardless of city
  const sorted = [...upcomingEvents].sort((a, b) => toDate(a).getTime() - toDate(b).getTime());
  return sorted[0] ?? getFeaturedEvent();
};
