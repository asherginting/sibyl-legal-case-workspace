import React from "react";

interface IIcon {
  className?: string;
}

const People: React.FC<IIcon> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        d="M13.333 5.417a3.333 3.333 0 1 1-6.666 0 3.333 3.333 0 0 1 6.666 0Z"
      />
      <path
        fill="currentColor"
        d="m3.333 17.083-.498-.043-.047.543h.545v-.5Zm13.334 0v.5h.545l-.047-.543-.498.043Zm-13.334 0 .498.044c.31-3.536 2.756-6.21 6.169-6.21v-1c-4.037 0-6.819 3.183-7.165 7.123l.498.043ZM10 10.417v.5c3.413 0 5.858 2.674 6.169 6.21l.498-.044.498-.043C16.819 13.1 14.037 9.917 10 9.917v.5Zm-6.667 6.666v.5h13.334v-1H3.333v.5Z"
      />
    </svg>
  );
};

export default People;
