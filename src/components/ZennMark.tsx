interface ZennMarkProps {
  size?: number;
  className?: string;
}

/**
 * Original Zenn monogram — a sharp "Z" stroke.
 */
export function ZennMark({ size = 24, className }: ZennMarkProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      className={className}
    >
      <path
        d="M8.75 8.75H23.25L13.2 23.25H23.6"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
