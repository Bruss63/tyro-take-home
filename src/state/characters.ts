import { atomWithSuspenseQuery } from "jotai-tanstack-query";
import { z } from "zod";
import { charactersResponseSchema } from "../schemas/characters";
import { atomFamily } from "jotai/utils";

const BASE_URL = "https://rickandmortyapi.com/api";

// TODO: review error handling here
export const getCharactersAtom = atomFamily((page) =>
  atomWithSuspenseQuery(() => ({
    queryKey: ["characters", page],
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}/character?species=human&page=${page}`
      );

      if (!response.ok) {
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
