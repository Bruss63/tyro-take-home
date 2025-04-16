import { Character } from "@/schemas/characters";

export default function CharacterCard({ name }: Pick<Character, "name">) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
      <h2
        data-testid="character-card-name"
        className="text-2xl font-bold text-white"
      >
        {name}
      </h2>
    </div>
  );
}
