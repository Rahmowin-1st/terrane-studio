export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="7" y="7" width="50" height="50" rx="18" stroke="currentColor" strokeWidth="1.7" />
      <rect x="16" y="15" width="32" height="10" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <rect x="27" y="20" width="10" height="29" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="32" cy="31" r="6.5" fill="#b48a62" />
      <circle cx="32" cy="31" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="19" cy="39" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="45" cy="39" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
