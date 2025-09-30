import type { Metadata } from "next";

// Metadata Configuration
export const aboutMetadata: Metadata = {
  title: "About Us - Nazaara Live | Experience, Culture, and Sound Without Borders",
  description: "Founded in 2022, Nazaara Live has touched 500K+ hearts across 150+ cities worldwide. Discover our story of bringing South Asian entertainment to global stages through innovative experiences.",
  keywords: ["about Nazaara Live", "South Asian entertainment company", "Tamasha", "cultural events", "global music platform", "entertainment history"],
  openGraph: {
    title: "About Us - Nazaara Live | Experience, Culture, and Sound Without Borders",
    description: "Founded in 2022, Nazaara Live has touched 500K+ hearts across 150+ cities worldwide. Discover our story of bringing South Asian entertainment to global stages through innovative experiences.",
    url: "https://nazaara.live/about",
    siteName: "Nazaara Live",
    images: [
      {
        url: "/OG.png",
        width: 1200,
        height: 630,
        alt: "About Nazaara Live - Our Story",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Nazaara Live | Experience, Culture, and Sound Without Borders",
    description: "Founded in 2022, Nazaara Live has touched 500K+ hearts across 150+ cities worldwide. Discover our story of bringing South Asian entertainment to global stages through innovative experiences.",
    images: ["/OG.png"],
  },
};

// Hero Section Content
export interface HeroContent {
  established: string;
  mainHeading: string;
  subHeading: string;
  description: string;
  backgroundImage: string;
}

export const heroContent: HeroContent = {
  established: "Est. 2022",
  mainHeading: "Experience, Culture, and Sound",
  subHeading: "Without Borders",
  description: "Nazaara is a platform shaped by perspective: a wider lens, a bolder rhythm, a new era rooted in the same fire. We create entry points into worlds defined by sound, culture, and movement—familiar energy, new expression.",
  backgroundImage: "/about-bg.webp"
};

// Our Story Section Content
export interface StoryContent {
  sectionTitle: string;
  heading: string;
  subHeading: string;
  paragraphs: string[];
  stats: StatItem[];
  images: {
    primary: string;
    secondary: string;
  };
}

export interface StatItem {
  value: string;
  label: string;
}

export const storyContent: StoryContent = {
  sectionTitle: "Our Story",
  heading: "From Tamasha to",
  subHeading: "A Broader Vision",
  paragraphs: [
    "Nazaara launched in 2022 as a platform for experience, culture, and sound—without borders. It emerged from a simple belief: that the scenes we believe in, the sounds that raised us, and the stories we're excited to tell deserve a global stage.",
    "Tamasha isn't ending—it now lives within Nazaara as a signature experience and part of a bigger vision. Today, we build across genres, mediums, and communities. We honor roots while expanding the frame: a wider lens, a bolder rhythm.",
    "Our journey spans 150+ cities, 500,000+ hearts touched, and countless moments turned into memory. And we're still evolving—introducing new IPs, fresh concepts, and curated formats under the Nazaara umbrella."
  ],
  stats: [
    { value: "2022", label: "Founded" },
    { value: "500K+", label: "Tickets Sold" },
    { value: "150+", label: "Global Cities" }
  ],
  images: {
    primary: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    secondary: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80"
  }
};

// Our Brands Section Content
export interface BrandContent {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  stats: string[];
  isUpcoming?: boolean;
}

export interface BrandsSection {
  sectionTitle: string;
  heading: string;
  subHeading: string;
  brands: BrandContent[];
  bottomStatement: {
    main: string;
    highlight: string;
    description: string;
  };
}

export const brandsContent: BrandsSection = {
  sectionTitle: "Portfolio",
  heading: "Our",
  subHeading: "Brands",
  brands: [
    {
      id: "tamasha",
      number: "01",
      name: "TAMASHA",
      category: "Premium Events & Tours",
      description: "Tamasha lives within Nazaara as our signature live experience—high-voltage shows that transform venues into cultural epicenters. A-list talent, world-class production, and the unmistakable South Asian energy that started it all.",
      stats: [
        "Since 2016 · 100+ Productions",
        "25 Countries · 300K+ Attendees"
      ]
    },
    {
      id: "nazaara",
      number: "02",
      name: "Nazaara",
      category: "Cultural Productions",
      description: "The umbrella for new IPs, cross-cultural collaborations, and curated formats. We move across genres and mediums, connecting diaspora communities worldwide—familiar energy, new expression.",
      stats: [
        "Since 2022 · 200+ Events",
        "50 Cities · Cultural Pioneer"
      ]
    },
    {
      id: "upcoming",
      number: "03",
      name: "New IPs Incoming",
      category: "Next Chapter",
      description: "Fresh concepts and formats under the Nazaara umbrella—global music, emerging styles, and diasporic rhythms alongside the iconic South Asian sound that shaped us.",
      stats: [],
      isUpcoming: true
    }
  ],
  bottomStatement: {
    main: "Three distinct brands,",
    highlight: "infinite possibilities",
    description: "Each brand operates independently while sharing our core values of excellence, authenticity, and innovation in South Asian entertainment."
  }
};

// Achievements Section Content
export interface AchievementItem {
  icon: string;
  title: string;
  description: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface AchievementsContent {
  sectionTitle: string;
  heading: string;
  subHeading: string;
  achievements: AchievementItem[];
  timeline: TimelineItem[];
}

export const achievementsContent: AchievementsContent = {
  sectionTitle: "Impact & Recognition",
  heading: "Milestones That",
  subHeading: "Define Us",
  achievements: [
    {
      icon: "Trophy",
      title: "Industry Pioneer",
      description: "First to bring major South Asian artists to global arenas"
    },
    {
      icon: "Globe2",
      title: "Global Reach",
      description: "Events across 6 continents and 30+ countries"
    },
    {
      icon: "Users",
      title: "Artist Network",
      description: "Exclusive partnerships with 200+ renowned artists"
    },
    {
      icon: "Sparkles",
      title: "Premium Events",
      description: "500+ luxury private celebrations curated"
    }
  ],
  timeline: [
    {
      year: "2022",
      title: "The Launch",
      description: "Launched to platform experience, culture, and sound—without borders"
    },
    {
      year: "2023",
      title: "Tamasha Joins",
      description: "Tamasha becomes the signature live experience within Nazaara"
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Extended operations to Europe, Middle East, and Asia-Pacific"
    },
    {
      year: "2025",
      title: "New IPs",
      description: "Introducing curated formats and cross-cultural collaborations"
    }
  ]
};

// Partnership Section Content
export interface PartnershipBenefit {
  title: string;
  benefits: string[];
}

export interface PartnershipContent {
  sectionTitle: string;
  heading: string;
  subHeading: string;
  description: string;
  partnershipTypes: PartnershipBenefit[];
  formConfig: {
    partnershipOptions: { value: string; label: string }[];
    responseTime: string;
    submitButtonText: string;
  };
}

export const partnershipContent: PartnershipContent = {
  sectionTitle: "Collaborate",
  heading: "Partner With",
  subHeading: "Excellence",
  description: "Join the exclusive network of venues, brands, and visionaries shaping the future of South Asian entertainment worldwide.",
  partnershipTypes: [
    {
      title: "For Venues & Promoters",
      benefits: [
        "Access to exclusive artist roster",
        "Full production management",
        "Marketing & audience development"
      ]
    },
    {
      title: "For Corporate Partners",
      benefits: [
        "Brand activation opportunities",
        "Celebrity endorsements",
        "Custom entertainment solutions"
      ]
    }
  ],
  formConfig: {
    partnershipOptions: [
      { value: "venue", label: "Venue Partnership" },
      { value: "corporate", label: "Corporate Collaboration" },
      { value: "media", label: "Media Partnership" },
      { value: "other", label: "Other" }
    ],
    responseTime: "We typically respond within 48 hours",
    submitButtonText: "Begin Conversation"
  }
};
