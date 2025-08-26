interface EventBioProps {
  bio?: string;
}

export default function EventBio({ bio }: EventBioProps) {
  if (!bio) return null;

  return (
    <section className="relative z-10 px-5 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6 text-center">
          <p className="font-neue-haas text-lg leading-relaxed text-[var(--white)] md:text-xl md:leading-relaxed">
            {bio.split('\n\n').map((paragraph, index) => (
              <span key={index} className="mb-6 block">
                {paragraph}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}