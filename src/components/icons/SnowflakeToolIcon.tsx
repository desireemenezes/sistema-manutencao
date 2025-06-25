export function ArcticOpsShieldIcon({ size = 48, color = "#0052cc" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Escudo */}
      <path
        d="M32 4L8 16v18c0 16 12 26 24 30 12-4 24-14 24-30V16L32 4z"
        fill="none"
      />

      {/* Engrenagem central */}
      <circle cx="32" cy="32" r="6" />
      <line x1="32" y1="20" x2="32" y2="26" />
      <line x1="32" y1="38" x2="32" y2="44" />
      <line x1="20" y1="32" x2="26" y2="32" />
      <line x1="38" y1="32" x2="44" y2="32" />
      <line x1="25.5" y1="25.5" x2="29" y2="29" />
      <line x1="39" y1="39" x2="35" y2="35" />
      <line x1="39" y1="25" x2="35" y2="29" />
      <line x1="25" y1="39" x2="29" y2="35" />
    </svg>
  );
}
