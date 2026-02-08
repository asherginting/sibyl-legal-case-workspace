import React from "react";

interface IIcon {
  className?: string;
}

const ChevronDown: React.FC<IIcon> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="square"
        d="M6.667 8.333 10 11.667l3.333-3.334"
      />
    </svg>
  );
};

export default ChevronDown;
