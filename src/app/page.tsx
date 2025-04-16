"use client";
import { Suspense } from "react";
import CharacterList from "../components/characters/CharacterList/CharacterList";
import CharacterListSkeleton from "@/components/characters/CharacterList/CharacterListSkeleton";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-full px-12 py-20 overflow-x-scroll">
      <div className="flex flex-col w-full max-w-2xl gap-6">
        <h1 className="text-4xl font-bold text-white">
          Rick and Morty Characters
        </h1>

        <Suspense fallback={<CharacterListSkeleton />}>
          <CharacterList />
        </Suspense>
      </div>
    </div>
  );
}
