import { FaArrowRight } from "react-icons/fa6";
import { Character } from "@/schemas/characters";
import Link from "next/link";

export default function CharacterCard({
  id,
  name,
}: Pick<Character, "id" | "name">) {
  return (
    <Link
      className="flex items-center gap-4 p-4 bg-white border border-gray-400 rounded-lg hover:bg-gray-100 transition-colors duration-200 ease-in-out"
      href={`/character/${id}`}
      data-testid="character-card"
      prefetch={false}
    >
      <h2
        data-testid="character-card-name"
        className="text-2xl font-bold text-gray-800"
      >
        {name}
      </h2>

      <FaArrowRight className="w-6 h-6 text-gray-400 ml-auto" />
    </Link>
  );
}
