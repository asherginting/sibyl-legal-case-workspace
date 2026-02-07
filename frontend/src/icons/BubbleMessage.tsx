import React from "react";

interface IIcon {
  className?: string;
}

const BubbleMessage: React.FC<IIcon> = ({ className }) => {
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
        d="M2.085 2.917H17.92v12.5h-7.917l-4.167 2.291v-2.291h-3.75v-12.5Z"
      />
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth={0.25}
        d="M6.25 8.625a.542.542 0 1 1-.001 1.083.542.542 0 0 1 .001-1.083Zm3.75 0A.542.542 0 1 1 10 9.708.542.542 0 0 1 10 8.625Zm3.75 0a.542.542 0 1 1-.001 1.083.542.542 0 0 1 .001-1.083Z"
      />
    </svg>
  );
};

export default BubbleMessage;
