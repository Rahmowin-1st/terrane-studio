export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="7" y="7" width="50" height="50" rx="18" stroke="currentColor" strokeWidth="1.7" />
      <rect x="15" y="16" width="34" height="11" rx="5.5" stroke="currentColor" strokeWidth="1.7" />
      <rect x="26.5" y="22" width="11" height="27" rx="5.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="32" cy="31.5" r="5.8" fill="#a97855" />
      <circle cx="32" cy="31.5" r="5.8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
