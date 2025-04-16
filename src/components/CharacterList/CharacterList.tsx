"use client";

import { useAtomValue } from "jotai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getCharactersAtom } from "@/state/characters";
import CharacterCard from "../CharacterCard/CharacterCard";
import PaginationButton from "../PaginationButton/PaginationButton";

interface CharacterListProps {
  page: number;
}

export default function CharacterList({ page }: CharacterListProps) {
  const {
    data: {
      results,
      info: { pages },
    },
  } = useAtomValue(getCharactersAtom(page));

  return (
    <div data-testid="character-list" className="flex flex-col gap-4">
      {results.map(({ id, name }) => (
        <CharacterCard key={id} name={name} />
      ))}

      <div className="flex items-center justify-center w-full">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <PaginationButton disabled={page === 1} href={`/?page=${page - 1}`}>
            <FaChevronLeft className="w-4 h-4 m-1" />
          </PaginationButton>

          {Array.from({ length: pages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <PaginationButton
                key={index}
                href={`/?page=${pageNumber}`}
                selected={page === pageNumber}
              >
                <p className="font-bold w-6 h-6">{pageNumber}</p>
              </PaginationButton>
            );
          })}

          <PaginationButton
            disabled={page === pages}
            href={`/?page=${page + 1}`}
          >
            <FaChevronRight className="w-4 h-4 m-1" />
          </PaginationButton>
        </div>
      </div>
    </div>
  );
}
