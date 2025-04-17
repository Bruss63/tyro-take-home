export default function CharacterCardDetailedSkeleton() {
  return (
    <div
      data-testid="character-card-detailed-skeleton"
      className="flex flex-col gap-4 animate-pulse"
    >
      <div className="h-10 w-3/4 bg-gray-200 rounded"></div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-grow w-full sm:min-w-32 rounded-lg sm:w-1/4  bg-gray-200"></div>

        <div className="flex flex-col gap-2 w-full sm:w-3/4 h-full p-4 bg-white border border-gray-400 rounded-lg">
          <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
          <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
