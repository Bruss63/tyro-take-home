import { atomWithSuspenseQuery } from "jotai-tanstack-query";
import { z } from "zod";
import {
  Character,
  characterResponseSchema,
  charactersResponseSchema,
} from "../schemas/characters";
import { atomFamily } from "jotai/utils";
import { atom } from "jotai";
import { isEqual } from "lodash";

const BASE_URL = "https://rickandmortyapi.com/api";

/*
  The API does substring filtering, so in order to get the correct filter for only human characters,
  we need to fetch all characters and filter them on the client side.
  This is not ideal, but in a perfect world we would modify the API to support this.
*/
export const allCharactersAtom = atomWithSuspenseQuery(() => ({
  queryKey: ["characters"],
  queryFn: async ({ signal }) => {
    let page = 1;
    let allCharacters: Character[] = [];

    while (true) {
      const response = await fetch(`${BASE_URL}/character?page=${page}`, {
        signal,
      });

      if (!response.ok) {
        if (response.status === 404) {
          return allCharacters;
        }

        throw new Error("Failed to fetch characters");
      }

      const data = await response.json();

      try {
        const parsedData = charactersResponseSchema.parse(data);
        allCharacters = [...allCharacters, ...parsedData.results];

        if (parsedData.info.next === null) {
          break;
        }

        page++;
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Validation error:", error.errors);
        } else {
          console.error("Unexpected error:", error);
        }
        throw new Error("Validation failed");
      }
    }

    return allCharacters;
  },

  staleTime: 3600000,
}));

export const getCharactersAtom = atomFamily(
  ({ q, page }: { q: string | null; page: number }) =>
    atom<
      Promise<{
        characters: Character[];
        pages: number;
      }>
    >(async (get) => {
      const { data: allCharacters } = await get(allCharactersAtom);

      const humanCharacters = allCharacters.filter(
        (character) => character.species.toLowerCase() === "human"
      );

      const filteredCharacters = q
        ? humanCharacters.filter((character) =>
            character.name.toLowerCase().includes(q.toLowerCase())
          )
        : humanCharacters;

      return {
        characters: filteredCharacters.slice((page - 1) * 20, page * 20),
        pages: Math.ceil(filteredCharacters.length / 20),
      };
    }),
  (a, b) => {
    return isEqual(a, b);
  }
);

export const getCharacterAtom = atomFamily((id) =>
  atomWithSuspenseQuery(() => ({
    queryKey: ["character", id],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/character/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }

        throw new Error("Failed to fetch character");
      }

      const data = await response.json();

      try {
        return characterResponseSchema.parse(data);
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Validation error:", error.errors);
        } else {
          console.error("Unexpected error:", error);
        }
        throw new Error("Validation failed");
      }
    },
  }))
);
