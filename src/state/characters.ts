import { atomWithSuspenseQuery } from "jotai-tanstack-query";
import { z } from "zod";
import {
  characterResponseSchema,
  charactersResponseSchema,
} from "../schemas/characters";
import { atomFamily } from "jotai/utils";

const BASE_URL = "https://rickandmortyapi.com/api";

export const getCharactersAtom = atomFamily(
  ({ q, page }: { q: string | null; page: number }) =>
    atomWithSuspenseQuery(() => ({
      queryKey: ["characters", q, page],
      queryFn: async () => {
        const response = await fetch(
          `${BASE_URL}/character?species=human&page=${page}&${
            q ? `name=${q}` : ""
          }`
        );

        if (!response.ok) {
          if (response.status === 404) {
            return {
              info: { count: 0, pages: 0, next: null, prev: null },
              results: [],
            };
          }

          throw new Error("Failed to fetch characters");
        }

        const data = await response.json();

        try {
          return charactersResponseSchema.parse(data);
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

export const getCharacterAtom = atomFamily((id) =>
  atomWithSuspenseQuery(() => ({
    queryKey: ["character", id],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/character/${id}`);

      if (!response.ok) {
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
