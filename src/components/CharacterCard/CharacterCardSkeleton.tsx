export default function CharacterCardSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-gray-400 rounded-lg animate-pulse">
      <div className="w-48 h-8 bg-gray-200 rounded" />

      <div className="w-6 h-6 bg-gray-200 rounded ml-auto" />
    </div>
  );
}
