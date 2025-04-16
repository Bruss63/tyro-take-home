"use client";

import classNames from "classnames";

interface PaginationButtonProps {
  children: React.ReactNode;
  href: string;
  selected?: boolean;
  disabled?: boolean;
}

export default function PaginationButton({
  children,
  href,
  selected,
  disabled,
}: PaginationButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(
        "flex items-center justify-center p-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ease-in-out",
        !selected && "bg-gray-700 hover:bg-gray-600 cursor-pointer",
        selected && "bg-gray-500 cursor-not-allowed"
      )}
      onClick={() => {
        if (disabled || selected) return;

        window.location.replace(href);
      }}
    >
      {children}
    </button>
  );
}
