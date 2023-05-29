export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ページ作成中</h2>
        <p className="text-gray-700">
          {params.slug} ページは現在作成中です。完成までしばらくお待ちください。
        </p>
      </div>
    </div>
  );
}