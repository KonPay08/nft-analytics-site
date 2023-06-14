"use client"
/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment'
import { useState } from "react"
import { ListView } from "src/app/ListView"
import { CardView } from "src/app/CardView"
import { NFTCollectionType, SortableFields } from "src/shared/NFTCollection.type"
import { LoadingScreen } from "src/app/LoadingScreen"
import { useFetchCollections } from "src/app/useFetchCollections"
import { useCheckLatestData } from 'src/app/useCheckLatestData'

type ViewProps = {
  initialCollections: NFTCollectionType[]
}

export const View: React.FC<ViewProps> = ({ initialCollections }) => {
  const [sortedField, setSortedField] = useState<SortableFields>("floorPrice");
  const [view, setView] = useState<"list" | "card">("list");
  const [page, setPage] = useState(1);
  const [isFetchTrigger, setIsFetchTrigger] = useState(false);
  const { collections, setCollections } = useFetchCollections(sortedField, page, initialCollections, isFetchTrigger);
  const { isNewData, setIsNewData } = useCheckLatestData(initialCollections);
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
  const handleRefresh = () => {
    setIsFetchTrigger(true);
    setCollections([]);
    setPage(1);
    setIsNewData(false);
  }
  return (
    <div className="container mx-auto py-8">
      <div className="text-sm text-gray-500 mb-4">
        最終更新日: {lastUpdatedAt ? lastUpdatedAt : "Loading..."}
        {isNewData && 
          <button
            onClick={handleRefresh}
            className="p-2 rounded ml-4 hover:bg-gray-200 hover:text-gray-800"
          >
            最新データ取得 ♻︎
          </button>
        }
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
        : <LoadingScreen />
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
