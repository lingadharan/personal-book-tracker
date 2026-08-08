import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Book Tracker - Personal Reading Log';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        background: 'linear-gradient(135deg, #FAF4E8 0%, #F4E8D1 100%)',
        padding: '60px',
      }}
    >
      {/* SVG Icon */}
      <svg viewBox="0 0 500 500" width="280" height="280">
        <defs>
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
        </defs>

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
        />

        <g transform="translate(0, -5)">
          <path
            d="M 250 255 C 210 235, 160 235, 120 250 L 120 160 C 160 145, 210 145, 250 165 Z"
            fill="url(#pageGrad)"
            stroke="#E6D5BC"
            strokeWidth="2"
          />
          <path
            d="M 250 255 C 290 235, 340 235, 380 250 L 380 160 C 340 145, 290 145, 250 165 Z"
            fill="url(#pageGrad)"
            stroke="#E6D5BC"
            strokeWidth="2"
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
          />
        </g>
      </svg>

      {/* Text Details */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: '56px',
            fontWeight: '800',
            color: '#5A270B',
            letterSpacing: '2px',
          }}
        >
          BOOK TRACKER
        </div>
        <div
          style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#8B4513',
            letterSpacing: '4px',
            marginTop: '10px',
          }}
        >
          PERSONAL READING LOG
        </div>
      </div>
    </div>,
    { ...size }
  );
}
