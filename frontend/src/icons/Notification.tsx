import React from "react";

interface IIcon {
  className?: string;
}

const Notification: React.FC<IIcon> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        stroke="currentColor"
        d="M17.083 14.583H2.917v-1.041l1.328-2.709.177-3.478C4.571 4.402 7.024 2.083 10 2.083c2.976 0 5.43 2.319 5.578 5.272l.177 3.478 1.328 2.709v1.041ZM6.672 14.777a3.334 3.334 0 0 0 6.656 0"
      />
    </svg>
  );
};

export default Notification;
