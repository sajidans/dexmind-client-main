export default function AgentSimmer() {
  return (
    <div className="grid grid-cols-2 gap-6 w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 rounded-xl shadow-lg animate-pulse w-full"
        >
          <div className="h-6 bg-gray-600 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>

          <div className="space-y-2 my-4">
            <div className="h-3 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded w-2/3"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>

          <div className="h-2 rounded bg-gray-600 w-full mt-4"></div>
        </div>
      ))}
    </div>
  );
}