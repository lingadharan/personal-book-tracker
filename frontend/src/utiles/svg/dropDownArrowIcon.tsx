export default function DropdownArrowIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`ms-1.5 -me-0.5 h-4 w-4 shrink-0 transition-transform ${
        isOpen ? 'rotate-180' : ''
      }`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 9-7 7-7-7"
      />
    </svg>
  );
}
