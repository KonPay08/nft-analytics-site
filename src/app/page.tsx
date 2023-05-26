/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useState } from "react"
import { NFTCollectionPath } from "src/server/NFTCollection/NFTCollection.action"
import { INFTCollection } from "src/server/NFTCollection/NFTCollection.models"
import { SortableFields } from "src/server/NFTCollection/NFTCollection.repository"
import { getActionApi } from "src/app/getActionApi"
import { ListView } from "src/app/ListView"
import { CardView } from "src/app/CardView"

export default function Dashboard() {
  const { postRequest } = getActionApi();
  const [collections, setCollections] = useState<INFTCollection[]>([])
  const [sortedField, setSortedField] = useState<SortableFields>("floorPrice");
  const [view, setView] = useState<"list" | "card">("list");
  const [page, setPage] = useState(1);
  const loadMore = async () => setPage(prev => prev + 1);
  const handleSortChange = (field: SortableFields) => {
    setSortedField(field);
    setPage(1);
    setCollections([]);
  };

  const fetchCollections = async () => {
    const result = await postRequest<NFTCollectionPath.GET_SORTED_NFT_COLLECTIONS>(
      NFTCollectionPath.GET_SORTED_NFT_COLLECTIONS, {
        field: sortedField,
        order: "desc",
        page: page,
        pageSize: 10
      }
    )
    if(!result.success) return
    return setCollections(prev => [...prev, ...result.data]);
  };

  useEffect(() => {
    fetchCollections()
  }, [sortedField, page]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">NFTマーケットサイト</h1>
      <div className="flex items-center mb-4">
        <label className="mr-2">ソート:</label>
        <select
          value={sortedField}
          onChange={(e) => handleSortChange(e.target.value as SortableFields)}
          className="p-2 border rounded mr-4"
        >
          <option value="floorPrice">最低価格</option>
          <option value="totalVolume">総取引量</option>
          <option value="totalSupply">総供給量</option>
          <option value="owners">所有者数</option>
        </select>
        <label className="mr-2">ビュー:</label>
        <button
          onClick={() => setView("list")}
          className={view === "list" ? "bg-gray-200 p-2 rounded" : "p-2 rounded"}
        >
          リスト表示
        </button>
        <button
          onClick={() => setView("card")}
          className={view === "card" ? "bg-gray-200 p-2 rounded mr-2" : "p-2 rounded mr-2"}
        >
          カード表示
        </button>
      </div>
      {view === "list" ? <ListView collections={collections} /> : <CardView collections={collections} />}
      <button 
        onClick={loadMore} 
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded mx-auto block"
        style={{ display: collections.length >= 10 ? 'block' : 'none' }}
      >
        More
      </button>
    </div>
  )
}