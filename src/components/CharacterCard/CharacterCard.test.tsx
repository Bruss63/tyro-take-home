import { render, screen } from "@testing-library/react";
import CharacterCard from "./CharacterCard";

describe("CharacterCard", () => {
  it("renders character name correctly", () => {
    const character = {
      id: 1,
      name: "Rick Sanchez",
    };

    render(<CharacterCard id={character.id} name={character.name} />);

    const characterName = screen.getByTestId("character-card-name");
    expect(characterName).toBeInTheDocument();
    expect(characterName).toHaveTextContent(character.name);
  });

  it("renders character card link correctly", () => {
    const character = {
      id: 1,
      name: "Rick Sanchez",
    };

    render(<CharacterCard id={character.id} name={character.name} />);

    const characterCard = screen.getByTestId("character-card");
    expect(characterCard).toHaveAttribute("href", `/character/${character.id}`);
  });
});
