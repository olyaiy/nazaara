"use client";

interface TicketButtonProps {
  ticketUrl: string;
  className?: string;
  children: React.ReactNode;
}

export default function TicketButton({ ticketUrl, className, children }: TicketButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(ticketUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}