import React from "react";

interface IIcon {
  className?: string;
}

const FolderPaper: React.FC<IIcon> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        stroke="currentColor"
        d="M13.75 4.583h3.333V8.75M2.917 6.25V2.917H13.75V8.75M2.917 6.25h-.834v10.833h15.834V8.75h-.834M2.917 6.25h3.958l2.5 2.5h4.375m3.333 0H13.75"
      />
    </svg>
  );
};

export default FolderPaper;
