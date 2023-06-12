export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 min-h-[50vh]">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-36 w-36"></div>
      <p className="text-xl">読み込み中...</p>
    </div>
  );
};