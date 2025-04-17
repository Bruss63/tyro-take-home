import { act, render, screen } from "@testing-library/react";
import CharacterList from "./CharacterList";
import { HydrateQueries } from "@/state/testUtils";

describe("CharacterList", () => {
  it("renders a list of characters", async () => {
    await act(async () => {
      render(
        <HydrateQueries
          queries={[
            [
              ["characters", 1],
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
          <CharacterList page={1} />
        </HydrateQueries>
      );
    });

    const characterList = screen.getByTestId("character-list");
    expect(characterList).toBeInTheDocument();

    const characterCards = screen.getAllByTestId("character-card-name");
    expect(characterCards).toHaveLength(2);
  });
});
