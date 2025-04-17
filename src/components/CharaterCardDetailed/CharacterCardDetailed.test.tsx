import { render, screen } from "@testing-library/react";
import CharacterCardDetailed from "./CharacterCardDetailed";
import { HydrateQueries } from "@/state/testUtils";
import { Provider } from "jotai";

describe("CharacterCardDetailed", () => {
  it("renders character details correctly", () => {
    const character = {
      id: 1,
      name: "Rick Sanchez",
      image: "https://example.com/rick.jpg",
      status: "Alive",
      origin: { name: "Earth" },
      location: { name: "Earth" },
      created: "2017-11-04T18:48:46.250Z",
    };

    render(
      <Provider>
        <HydrateQueries queries={[[["character", character.id], character]]}>
          <CharacterCardDetailed id={character.id} />
        </HydrateQueries>
      </Provider>
    );

    const characterName = screen.getByTestId("character-card-detailed-name");
    expect(characterName).toBeInTheDocument();
    expect(characterName).toHaveTextContent(character.name);

    const characterImage = screen.getByTestId("character-card-detailed-image");
    expect(characterImage).toHaveAttribute("src", character.image);

    const characterStatus = screen.getByTestId(
      "character-card-detailed-status"
    );
    expect(characterStatus).toHaveTextContent(character.status);

    const characterOrigin = screen.getByTestId(
      "character-card-detailed-origin"
    );
    expect(characterOrigin).toHaveTextContent(character.origin.name);

    const characterLocation = screen.getByTestId(
      "character-card-detailed-location"
    );
    expect(characterLocation).toHaveTextContent(character.location.name);

    const characterCreated = screen.getByTestId(
      "character-card-detailed-created"
    );
    expect(characterCreated).toHaveTextContent(
      new Date(character.created).toDateString()
    );
  });
});
