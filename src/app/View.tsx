"use client"
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { getActionApi } from "src/app/getActionApi"
import { ListView } from "src/app/ListView"
import { CardView } from "src/app/CardView"
import { NFTCollectionPath, NFTCollectionType, SortableFields } from "src/shared/NFTCollection.type"
import moment from 'moment'

type ViewProps = {
  initialCollections: NFTCollectionType[]
}

export const View: React.FC<ViewProps> = ({ initialCollections }) => {
  const { postRequest } = getActionApi();
  const [collections, setCollections] = useState<NFTCollectionType[]>(initialCollections);
  const [sortedField, setSortedField] = useState<SortableFields>("floorPrice");
  const [view, setView] = useState<"list" | "card">("list");
  const [page, setPage] = useState(1);
  const [isFetchTrigger, setIsFetchTrigger] = useState(false);
  const lastUpdatedAt = collections.length ? moment(collections[0].updatedAt).format('YYYY/MM/DD HH:mm') : null;
  const loadMore = () => {
    setIsFetchTrigger(true)
    setPage(prev => prev + 1);
  }
  const handleSortChange = (field: SortableFields) => {
    setIsFetchTrigger(true);
    setSortedField(field);
    setPage(1);
    setCollections([]);
    
  };
  const fetchCollections = async () => {
    if(page === 1 && !isFetchTrigger) return;
    const result = await postRequest<NFTCollectionPath.GET_SORTED_NFT_COLLECTIONS>(
      NFTCollectionPath.GET_SORTED_NFT_COLLECTIONS, {
        field: sortedField,
        order: "desc",
        page: page,
        pageSize: 10
      }
    )
    if(!result.success) throw new Error("Failed to fetch collections");
    setCollections(prev => [...prev, ...result.data]);
  };

  useEffect(() => {
    fetchCollections();
  }, [sortedField, page]);

  return (
    <div className="container mx-auto py-8">
      <div className="text-sm text-gray-500 mb-4">
        最終更新日: {lastUpdatedAt ? lastUpdatedAt : "Loading..."}
      </div>
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
      {collections.length
        ? view === "list" ? <ListView collections={collections} /> : <CardView collections={collections} />
        : <Loading />
      }
      <button 
        onClick={loadMore}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded mx-auto block"
        style={{ display: collections?.length >= 10 ? 'block' : 'none' }}
      >
        More
      </button>
    </div>
  )
}

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 min-h-[50vh]">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-36 w-36"></div>
      <p className="text-xl">読み込み中...</p>
    </div>
  );
}
