import React from "react";

interface IIcon {
  className?: string;
}

const Search: React.FC<IIcon> = ({ className }) => {
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
        d="M9.167 15.417a6.25 6.25 0 1 0 0-12.5 6.25 6.25 0 0 0 0 12.5ZM16.875 16.875l-3.292-3.292"
      />
    </svg>
  );
};

export default Search;
