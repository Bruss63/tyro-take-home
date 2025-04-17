"use client";

import { useAtomValue } from "jotai";
import { getCharacterAtom } from "@/state/characters";
import Image from "next/image";

interface CharacterCardDetailedProps {
  id: number;
}

export default function CharacterCardDetailed({
  id,
}: CharacterCardDetailedProps) {
  const { data: character } = useAtomValue(getCharacterAtom(id));

  return (
    <div data-testid="character-card-detailed" className="flex flex-col gap-4">
      <h1
        data-testid="character-card-detailed-name"
        className="text-4xl font-bold text-gray-800"
      >
        {character.name}
      </h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <Image
          data-testid="character-card-detailed-image"
          src={character.image}
          alt={character.name}
          width={0}
          height={0}
          className="flex flex-grow w-full sm:min-w-32 rounded-lg sm:w-1/4 object-cover"
          unoptimized
        />

        <div className="flex flex-col gap-2 w-full sm:w-3/4 h-full p-4 bg-white border border-gray-400 rounded-lg">
          <p className="text-2xl text-gray-800">
            <span className="font-bold">{`Status: `}</span>
            <span data-testid="character-card-detailed-status">
              {character.status}
            </span>
          </p>

          <p className="text-2xl text-gray-800">
            <span className="font-bold">{`Origin: `}</span>
            <span data-testid="character-card-detailed-origin">
              {character.origin.name}
            </span>
          </p>

          <p className="text-2xl text-gray-800">
            <span className="font-bold">{`Location: `}</span>
            <span data-testid="character-card-detailed-location">
              {character.location.name}
            </span>
          </p>

          <p className="text-2xl text-gray-800">
            <span className="font-bold">{`Created: `}</span>
            <span data-testid="character-card-detailed-created">
              {new Date(character.created).toDateString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
