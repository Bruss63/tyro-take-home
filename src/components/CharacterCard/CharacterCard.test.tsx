import { render, screen } from "@testing-library/react";
import CharacterCard from "./CharacterCard";

describe("CharacterCard", () => {
  it("renders character name correctly", () => {
    const character = {
      name: "Rick Sanchez",
    };

    render(<CharacterCard name={character.name} />);

    const characterName = screen.getByTestId("character-card-name");
    expect(characterName).toBeInTheDocument();
    expect(characterName).toHaveTextContent(character.name);
  });
});
