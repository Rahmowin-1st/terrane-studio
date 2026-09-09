export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="48" height="48" stroke="currentColor" strokeWidth="1.6" />
      <rect x="20" y="14" width="24" height="10" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="24" width="12" height="16" stroke="currentColor" strokeWidth="1.8" />
      <rect x="38" y="24" width="12" height="16" stroke="currentColor" strokeWidth="1.8" />
      <rect x="20" y="40" width="24" height="10" stroke="currentColor" strokeWidth="1.8" />
      <rect x="26" y="26" width="12" height="12" fill="#b48a62" />
      <rect x="26" y="26" width="12" height="12" stroke="currentColor" strokeWidth="1.8" />
      <path d="M32 26v-4M32 42v-4M26 32h-4M42 32h-4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
