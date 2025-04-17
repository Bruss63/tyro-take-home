"use client";

import classNames from "classnames";

interface PaginationButtonProps {
  children: React.ReactNode;
  page: number;
  selected?: boolean;
  disabled?: boolean;
}

export default function PaginationButton({
  children,
  page,
  selected,
  disabled,
}: PaginationButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(
        "flex items-center justify-center p-2 text-gray-800 border border-gray-400 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ease-in-out",
        !selected && "bg-white hover:bg-gray-100 cursor-pointer",
        selected && "bg-[#A3D5FF] cursor-not-allowed"
      )}
      onClick={() => {
        if (disabled || selected) return;

        const url = new URL(window.location.href);
        url.searchParams.set("page", page.toString());
        window.history.pushState({}, "", url.toString());
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      {children}
    </button>
  );
}
