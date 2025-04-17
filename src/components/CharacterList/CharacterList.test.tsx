import { act, render, screen } from "@testing-library/react";
import CharacterList from "./CharacterList";
import { HydrateQueries } from "@/state/testUtils";
import { Provider } from "jotai";

describe("CharacterList", () => {
  it("renders a list of characters", async () => {
    await act(async () => {
      render(
        <Provider>
          <HydrateQueries
            queries={[
              [
                ["characters", null, 1],
                {
                  results: [
                    { id: 1, name: "Rick Sanchez" },
                    { id: 2, name: "Morty Smith" },
                  ],
                  info: { pages: 1 },
                },
              ],
            ]}
          >
            <CharacterList page={1} q={null} />
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
            <HydrateQueries
              queries={[
                [
                  ["characters", "test", 1],
                  {
                    results: [],
                    info: { pages: 1 },
                  },
                ],
              ]}
            >
              <CharacterList page={1} q={"test"} />
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
