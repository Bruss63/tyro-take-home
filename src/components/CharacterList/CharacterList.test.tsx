import { act, render, screen } from "@testing-library/react";
import CharacterList from "./CharacterList";
import { HydrateQueries } from "@/state/testUtils";
import { Provider } from "jotai";
import { Suspense } from "react";

describe("CharacterList", () => {
  it("renders a list of characters", async () => {
    await act(async () => {
      render(
        <Provider>
          <HydrateQueries
            queries={[
              [
                ["characters"],
                [
                  { id: 1, name: "Rick Sanchez", species: "Human" },
                  { id: 2, name: "Morty Smith", species: "Human" },
                ],
              ],
            ]}
          >
            <Suspense>
              <CharacterList page={1} q={null} />
            </Suspense>
          </HydrateQueries>
        </Provider>
      );
    });

    const characterList = screen.getByTestId("character-list");
    expect(characterList).toBeInTheDocument();

    const characterCards = screen.getAllByTestId("character-card-name");
    expect(characterCards).toHaveLength(2);
  });

  describe("No characters found", () => {
    it("renders the no characters found message", async () => {
      await act(async () => {
        render(
          <Provider>
            <HydrateQueries queries={[[["characters"], []]]}>
              <Suspense>
                <CharacterList page={1} q={null} />
              </Suspense>
            </HydrateQueries>
          </Provider>
        );
      });

      expect(
        screen.getByTestId("character-list-no-results")
      ).toBeInTheDocument();
    });
  });
});
