"use client";

import { useParams } from "next/navigation";

export default function CharacterPage() {
  const params = useParams();
  const { id } = params;

  return (
    <div className="flex items-center justify-center w-full h-full px-12 py-20 overflow-x-scroll">
      <div className="flex flex-col w-full max-w-2xl gap-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Character Details: {id}
        </h1>
      </div>
    </div>
  );
}
