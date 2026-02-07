import React from "react";

interface IIcon {
  className?: string;
}

const PageTextSearch: React.FC<IIcon> = ({ className }) => {
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
        d="M8.333 17.917H3.75V2.083h12.5V8.75m.833 9.167-.857-.815M7.082 5.417h5.834M7.083 8.75h3.334m6.666 5.833a3.333 3.333 0 1 0-6.666 0 3.333 3.333 0 0 0 6.666 0Z"
      />
    </svg>
  );
};

export default PageTextSearch;
