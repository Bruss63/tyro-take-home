export default function CharacterListSkeleton() {
  console.log("skeleton");

  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 10 }, (_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg animate-pulse"
        >
          <div className="w-48 h-8 bg-gray-600 rounded" />
        </div>
      ))}
    </div>
  );
}
