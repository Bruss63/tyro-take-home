import { render, screen } from "@testing-library/react";
import { useParams } from "next/navigation";
import CharacterPage from "./page";
import { act } from "@testing-library/react";
import { HydrateQueries } from "@/state/testUtils";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

describe("CharacterPage", () => {
  it("renders CharacterCardDetailed", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    await act(async () => {
      render(
        <HydrateQueries
          queries={[
            [
              ["character", 1],
              {
                id: 1,
                name: "Rick Sanchez",
                image: "https://example.com/rick.jpg",
                status: "Alive",
                origin: { name: "Earth" },
                location: { name: "Earth" },
                created: "2017-11-04T18:48:46.250Z",
              },
            ],
          ]}
        >
          <CharacterPage />
        </HydrateQueries>
      );
    });

    expect(screen.getByTestId("character-card-detailed")).toBeInTheDocument();
  });

  it("renders the fallback skeleton while loading", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "2" });
    await act(async () => {
      render(<CharacterPage />);
    });

    expect(
      screen.getByTestId("character-card-detailed-skeleton")
    ).toBeInTheDocument();
  });
});
