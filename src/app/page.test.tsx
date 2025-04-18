import { render, screen } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import List from "./page";
import { act } from "@testing-library/react";
import { HydrateQueries } from "../state/testUtils";
import { Provider } from "jotai";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

describe("List Page", () => {
  it("renders the title", async () => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn() });

    await act(async () => {
      render(<List />);
    });

    expect(
      screen.getByRole("heading", { name: /rick and morty characters/i })
    ).toBeInTheDocument();
  });

  it("renders CharacterList", async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key) => {
        const paramMap: {
          [key: string]: string | null;
        } = {
          page: "2",
          q: null,
        };

        return paramMap[key];
      }),
    });

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
            <List />
          </HydrateQueries>
        </Provider>
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
