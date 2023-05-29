"use client"
import Image from "next/image"
import Link from "next/link"
import { NFTCollectionType } from "src/shared/NFTCollection.type"

type ListViewProps = {
  collections: NFTCollectionType[]
}

export const ListView: React.FC<ListViewProps> = ({ collections }) => {
  return (
    <div className="divide-y divide-gray-200">
      <div className="block p-4 flex items-center justify-between space-x-12">
        <div className="flex items-center">
          <div className="w-16 h-16"></div>
          <div className="text-lg font-bold truncate text-left ml-4">コレクション名</div>
        </div>
        <div className="flex space-x-12">
          <div className="flex justify-between w-32">
            <span className="text-gray-700 font-bold">最低価格</span>
          </div>
          <div className="flex justify-between w-32">
            <span className="text-gray-700 font-bold">総取引量</span>
          </div>
          <div className="flex justify-between w-32">
            <span className="text-gray-700 font-bold">総供給量</span>
          </div>
          <div className="flex justify-between w-32">
            <span className="text-gray-700 font-bold">所有者数</span>
          </div>
        </div>
      </div>
      {collections &&
        collections.map((collection) => (
          <Link key={collection.contractAddress} href={`/${collection.slug}`}>
            <div className="block p-4 flex items-center justify-between space-x-12 hover:bg-gray-100">
              <div className="flex items-center">
                <div className="w-16 h-16 relative mr-4">
                  <Image 
                    src={collection.imageUrl}
                    alt={collection.name}
                    className="rounded"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="text-lg font-bold truncate text-left">{collection.name}</div>
              </div>
              <div className="flex space-x-12">
                <div className="flex justify-between w-32">
                  <span>{collection.floorPrice}</span>
                </div>
                <div className="flex justify-between w-32">
                  <span>{Math.round(collection.totalVolume).toLocaleString()}</span>
                </div>
                <div className="flex justify-between w-32">
                  <span>{collection.totalSupply.toLocaleString()}</span>
                </div>
                <div className="flex justify-between w-32">
                  <span>{collection.owners.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

