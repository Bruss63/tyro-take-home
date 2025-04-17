import CharacterCardSkeleton from "../CharacterCard/CharacterCardSkeleton";

export default function CharacterListSkeleton() {
  return (
    <div data-testid="character-list-skeleton" className="flex flex-col gap-4">
      {Array.from({ length: 30 }, (_, index) => (
        <CharacterCardSkeleton
          key={index}
          data-testid="character-card-skeleton"
        />
      ))}
    </div>
  );
}
