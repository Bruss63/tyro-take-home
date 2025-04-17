import { render, screen } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import List from "./page";
import { act } from "@testing-library/react";
import { HydrateQueries } from "../state/testUtils";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

describe("List Page", () => {
  it("renders the title", async () => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn() });

    await act(async () => {
      render(<List />);
    });
    <List />;
    <List />;

    expect(
      screen.getByRole("heading", { name: /rick and morty characters/i })
    ).toBeInTheDocument();
  });

  it("renders CharacterList", async () => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn(() => "2") });

    await act(async () => {
      render(
        <HydrateQueries
          queries={[[["characters", 2], { results: [], info: { pages: 1 } }]]}
        >
          <List />
        </HydrateQueries>
      );
    });

    expect(screen.getByTestId("character-list")).toBeInTheDocument();
  });

  it("renders the fallback skeleton while loading", async () => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn() });

    await act(async () => {
      render(<List />);
    });

    expect(screen.getByTestId("character-list-skeleton")).toBeInTheDocument();
  });
});
