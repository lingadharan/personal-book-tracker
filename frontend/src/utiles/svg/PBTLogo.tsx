export default function PBTLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      className="h-10 w-10 transition-transform duration-200 group-hover:rotate-3 group-hover:scale-105 sm:h-11 sm:w-11"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAF4E8" />
          <stop offset="100%" stopColor="#F4E8D1" />
        </linearGradient>

        <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="50%" stopColor="#5A270B" />
          <stop offset="100%" stopColor="#3B1604" />
        </linearGradient>

        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        <linearGradient id="pageGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFFBEB" />
        </linearGradient>

        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <rect width="500" height="500" rx="90" fill="url(#bgGrad)" />

      <g transform="translate(-70, -35) scale(1.28)">
        <circle
          cx="250"
          cy="205"
          r="125"
          fill="none"
          stroke="#E6D5BC"
          strokeWidth="8"
          strokeDasharray="6 8"
        />
        <path
          d="M 250 80 A 125 125 0 1 1 130 240"
          fill="none"
          stroke="url(#accentGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#glow)"
        />

        <g transform="translate(0, -5)">
          <path
            d="M 250 255 C 210 235, 160 235, 120 250 L 120 160 C 160 145, 210 145, 250 165 Z"
            fill="url(#pageGrad)"
            stroke="#E6D5BC"
            strokeWidth="2"
            opacity="0.95"
          />

          <path
            d="M 250 255 C 290 235, 340 235, 380 250 L 380 160 C 340 145, 290 145, 250 165 Z"
            fill="url(#pageGrad)"
            stroke="#E6D5BC"
            strokeWidth="2"
            opacity="0.98"
          />

          <path
            d="M 250 165 L 250 255"
            stroke="url(#primaryGrad)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M 250 135 L 250 270 L 238 258"
            fill="none"
            stroke="url(#primaryGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M 145 195 L 195 220 L 350 125"
            fill="none"
            stroke="url(#accentGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
        </g>
      </g>
    </svg>
  );
}
