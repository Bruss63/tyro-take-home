"use client";

import { useAtomValue } from "jotai";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { getCharactersAtom } from "@/state/characters";
import CharacterCard from "../CharacterCard/CharacterCard";
import PaginationButton from "../PaginationButton/PaginationButton";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";

interface CharacterListProps {
  page: number;
  q: string | null;
}

export default function CharacterList({ page, q }: CharacterListProps) {
  const { characters: results, pages } = useAtomValue(
    getCharactersAtom(useMemo(() => ({ q, page }), [q, page]))
  );

  const [query, setQuery] = useState<string | null>(q);

  const handleSearch = debounce(() => {
    if (query === q) return;

    const url = new URL(window.location.href);
    if (query === null || query === "") {
      url.searchParams.delete("q");
    } else {
      url.searchParams.set("q", query);
    }
    url.searchParams.set("page", "1");

    window.history.pushState({}, "", url.toString());
  }, 1000);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setQuery(query);
  };

  useEffect(() => {
    handleSearch();

    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch]);

  return (
    <div data-testid="character-list" className="flex flex-col gap-12">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by character name"
          data-testid="character-list-search"
          className="w-full p-4 text-xl border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
          value={query || ""}
          onChange={handleSearchChange}
        />
        <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
      </div>

      {results.length === 0 ? (
        <div className="flex flex-col gap-3 items-center justify-center w-full">
          <p
            data-testid="character-list-no-results"
            className="text-2xl text-gray-800"
          >
            No characters found
          </p>
          <button
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.delete("q");
              url.searchParams.set("page", "1");

              window.history.pushState({}, "", url.toString());
              setQuery(null);
            }}
            className="mt-4 px-4 py-2 bg-[#6F73D2] text-white rounded cursor-pointer hover:bg-[#5a5dc4] transition-colors duration-200 ease-in-out"
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {results.map(({ id, name }) => (
              <CharacterCard key={id} id={id} name={name} />
            ))}
          </div>

          <div className="flex items-center justify-center w-full">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <PaginationButton disabled={page === 1} page={page - 1}>
                <FaChevronLeft className="w-4 h-4 m-1" />
              </PaginationButton>

              {Array.from({ length: pages }, (_, index) => {
                const pageNumber = index + 1;

                return (
                  <PaginationButton
                    key={index}
                    page={pageNumber}
                    selected={page === pageNumber}
                  >
                    <p className="font-bold w-6 h-6">{pageNumber}</p>
                  </PaginationButton>
                );
              })}

              <PaginationButton disabled={page === pages} page={page + 1}>
                <FaChevronRight className="w-4 h-4 m-1" />
              </PaginationButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
