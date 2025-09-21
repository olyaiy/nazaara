// Hero Section Content
export interface HeroContent {
  backgroundImage: string;
  title: string;
  subtitle: string;
  description: string;
}

export const heroContent: HeroContent = {
  backgroundImage: "/bookings-bg.webp",
  title: "Curated",
  subtitle: "Excellence",
  description: "From intimate gatherings to grand celebrations, we orchestrate extraordinary entertainment experiences with exclusive access to the world's most celebrated South Asian artists."
};

// Private Events Section Content
export interface ServiceDetail {
  icon: string;
  title: string;
  description: string;
}

export interface PrivateEventsContent {
  sectionTitle: string;
  heading: string;
  subHeading: string;
  description: string;
  services: ServiceDetail[];
  ctaButtonText: string;
  images: {
    primary: string;
    secondary: string;
  };
}

export const privateEventsContent: PrivateEventsContent = {
  sectionTitle: "Private Services",
  heading: "Beyond",
  subHeading: "Extraordinary",
  description: "From intimate celebrations to grand spectacles, we orchestrate private experiences that transcend the ordinary. Our reputation isn't built on portfolios—it's earned through whispers in elite circles.",
  services: [
    {
      icon: "Star",
      title: "Bollywood A-Listers",
      description: "Direct access to India's biggest stars for your most prestigious private events"
    },
    {
      icon: "Crown",
      title: "International Artists",
      description: "Global South Asian sensations and cultural icons for exclusive performances"
    },
    {
      icon: "Users",
      title: "Private Concerts",
      description: "Intimate performances and private concerts by legendary artists"
    }
  ],
  ctaButtonText: "Book a Consultation",
  images: {
    primary: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    secondary: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80"
  }
};

// DJ Roster Section Content
export interface DJRosterContent {
  sectionTitle: string;
  heading: string;
  description: string;
}

export const djRosterContent: DJRosterContent = {
  sectionTitle: "Available Artists",
  heading: "DJ Roster",
  description: "Professional DJs available for private bookings"
};

// Contact Form Section Content
export interface ContactInfoItem {
  title: string;
  description: string;
}

export interface FormField {
  label: string;
  placeholder: string;
  type: string;
}

export interface ContactFormContent {
  sectionTitle: string;
  heading: string;
  subHeading: string;
  description: string;
  contactInfo: ContactInfoItem[];
  contactEmail: {
    label: string;
    email: string;
  };
  formFields: {
    personalInfo: FormField[];
    eventDetails: FormField[];
    locationAndScale: FormField[];
    vision: {
      label: string;
      placeholder: string;
      rows: number;
    };
  };
  privacyNote: string;
  submitButtonText: string;
}

export const contactFormContent: ContactFormContent = {
  sectionTitle: "Begin Your Journey",
  heading: "Let's Create",
  subHeading: "Magic Together",
  description: "Every extraordinary event begins with a conversation. Share your vision, and we'll orchestrate an experience beyond imagination.",
  contactInfo: [
    {
      title: "What We Need",
      description: "Event type, date, location, and guest count to get started"
    },
    {
      title: "Response Time",
      description: "We typically respond within 24 hours with initial availability"
    }
  ],
  contactEmail: {
    label: "Preferred contact for urgent bookings",
    email: "bookings@nazaara.live"
  },
  formFields: {
    personalInfo: [
      {
        label: "Full Name",
        placeholder: "John Doe",
        type: "text"
      },
      {
        label: "Email Address",
        placeholder: "john@example.com",
        type: "email"
      }
    ],
    eventDetails: [
      {
        label: "Event Type",
        placeholder: "Wedding, Corporate Event, etc.",
        type: "text"
      },
      {
        label: "Event Date",
        placeholder: "MM/DD/YYYY",
        type: "text"
      }
    ],
    locationAndScale: [
      {
        label: "Event Location",
        placeholder: "City, Country",
        type: "text"
      },
      {
        label: "Expected Guests",
        placeholder: "500",
        type: "text"
      }
    ],
    vision: {
      label: "Your Vision",
      placeholder: "Share your dream event details, special requirements, and artistic preferences...",
      rows: 4
    }
  },
  privacyNote: "Your information is kept strictly confidential and used solely for event planning purposes.",
  submitButtonText: "Send Inquiry"
};
