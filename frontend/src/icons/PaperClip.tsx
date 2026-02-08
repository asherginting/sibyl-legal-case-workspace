import React from "react";

interface IIcon {
  className?: string;
}

const PaperClip: React.FC<IIcon> = ({ className }) => {
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
        d="m10.182 8.942-4.407 4.381a1.234 1.234 0 0 0 0 1.752 1.252 1.252 0 0 0 1.763 0l8.815-8.761c.487-.484.73-1.118.73-1.752 0-.635-.243-1.269-.73-1.753a2.493 2.493 0 0 0-1.763-.726c-.638 0-1.276.242-1.763.726l-8.815 8.762A3.694 3.694 0 0 0 2.917 14.2c0 .95.365 1.902 1.095 2.628a3.74 3.74 0 0 0 2.645 1.089 3.74 3.74 0 0 0 2.644-1.09l4.408-4.38"
      />
    </svg>
  );
};

export default PaperClip;
