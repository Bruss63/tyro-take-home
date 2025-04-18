"use client";

import { Suspense } from "react";
import CharacterList from "../components/CharacterList/CharacterList";
import CharacterListSkeleton from "@/components/CharacterList/CharacterListSkeleton";
import { useSearchParams } from "next/navigation";

export default function List() {
  const params = useSearchParams();

  const pageParam = params.get("page");
  const page = pageParam ? parseInt(pageParam) : 1;
  const q = params.get("q");

  return (
    <div className="flex flex-col items-center h-full px-12 py-20 overflow-x-scroll">
      <div className="flex flex-col w-full max-w-2xl gap-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Rick and Morty Characters
        </h1>

        <Suspense fallback={<CharacterListSkeleton q={q} />}>
          <CharacterList page={page} q={q} />
        </Suspense>
      </div>
    </div>
  );
}
