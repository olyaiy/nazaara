interface EventPageProps {
  params: {
    "event-slug": string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  const eventSlug = params["event-slug"];

  return (
    <div className="min-h-screen bg-[var(--maroon-red)]">
      <div className="px-6 lg:px-12 py-20">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-4xl font-prettywise text-[var(--white)]">
            Event: {eventSlug}
          </h1>
          <p className="text-[var(--white)]/60 mt-4">
            Event page coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}