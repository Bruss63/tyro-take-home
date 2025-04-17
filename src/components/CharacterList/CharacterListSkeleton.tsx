import { CgSpinnerTwoAlt } from "react-icons/cg";
import CharacterCardSkeleton from "../CharacterCard/CharacterCardSkeleton";

interface CharacterListSkeletonProps {
  q: string | null;
}

export default function CharacterListSkeleton({
  q,
}: CharacterListSkeletonProps) {
  return (
    <div data-testid="character-list-skeleton" className="flex flex-col gap-12">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by character name"
          className="w-full p-4 text-xl bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
          disabled={true}
          value={q || ""}
        />
        <CgSpinnerTwoAlt className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 animate-spin" />
      </div>

      <div className="flex flex-col gap-4">
        {Array.from({ length: 20 }, (_, index) => (
          <CharacterCardSkeleton
            key={index}
            data-testid="character-card-skeleton"
          />
        ))}
      </div>
    </div>
  );
}
