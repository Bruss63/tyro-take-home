"use client";

import { getCharactersAtom } from "@/state/characters";
import { useAtomValue } from "jotai";
import CharacterCard from "../CharacterCard/CharacterCard";

export default function CharacterList() {
  const { data: characters } = useAtomValue(getCharactersAtom);

  return (
    <div className="flex flex-col gap-4">
      {characters.results.map(({ id, name }) => (
        <CharacterCard key={id} name={name} />
      ))}
    </div>
  );
}
