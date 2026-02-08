import React from "react";

interface IIcon {
  className?: string;
}

const SortDesc: React.FC<IIcon> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        fill="currentColor"
        d="M16 4v9h2.25l-3 3.75-3-3.75h2.25V4H16Zm-6 10.5V16H3.25v-1.5H10Zm1.5-5.25v1.5H3.25v-1.5h8.25Zm0-5.25v1.5H3.25V4h8.25Z"
      />
    </svg>
  );
};

export default SortDesc;
