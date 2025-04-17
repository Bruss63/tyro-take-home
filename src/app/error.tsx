"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <html>
      <body className={`bg-gradient-to-b from-white to-[#e3f4ff]`}>
        <div
          className={`flex flex-col items-center justify-center w-full h-screen gap-4`}
        >
          <h2 className="text-4xl font-bold text-center">
            Something went wrong!
          </h2>
          <button
            onClick={() => reset()}
            className="mt-4 px-4 py-2 bg-[#6F73D2] text-white rounded cursor-pointer hover:bg-[#5a5dc4] transition-colors duration-200 ease-in-out"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
