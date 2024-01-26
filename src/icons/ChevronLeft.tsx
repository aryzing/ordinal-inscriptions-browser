import { SVGProps } from "react";

export const ChevronLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={28}
    width={28}
    viewBox="0 0 28 28"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_1491_15)">
      <path
        d="M17.5 7L10.5 14L17.5 21"
        stroke="white"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1491_15">
        <rect width={28} height={28} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
