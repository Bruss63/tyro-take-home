"use client";

import CharacterCardDetailed from "@/components/CharaterCardDetailed/CharacterCardDetailed";
import CharacterCardDetailedSkeleton from "@/components/CharaterCardDetailed/CharacterCardDetailedSkeleton";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";

export default function CharacterPage() {
  const { id: idParam } = useParams();

  if (!idParam || typeof idParam !== "string") {
    throw new Error("ID is required");
  }

  const id = parseInt(idParam, 10);

  if (isNaN(id)) {
    throw new Error("Invalid ID");
  }

  return (
    <div className="flex items-center justify-center w-full h-full px-12 py-20 overflow-x-scroll">
      <div className="flex flex-col w-full max-w-2xl gap-4">
        <button
          onClick={() => window.history.back()}
          className="text-blue-500 underline self-start cursor-pointer hover:text-blue-700 transition-colors duration-200 ease-in-out"
        >
          <IoReturnUpBackOutline className="inline-block mr-2" />
          Back
        </button>

        <Suspense fallback={<CharacterCardDetailedSkeleton />}>
          <CharacterCardDetailed id={id} />
        </Suspense>
      </div>
    </div>
  );
}
