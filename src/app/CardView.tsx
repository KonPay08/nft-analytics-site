"use client"
import Image from "next/image"
import Link from "next/link"
import { INFTCollection } from "src/server/NFTCollection/NFTCollection.models"

type CardViewProps = {
  collections: INFTCollection[]
}

export const CardView: React.FC<CardViewProps> = ({ collections }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {collections && collections.map((collection) => (
        <div key={collection.contractAddress} className="bg-white p-4 shadow rounded flex flex-col justify-between">
          <Link href={`/collections/${collection.slug}`}>
            <div className="w-full h-68 mb-2 rounded overflow-hidden">
              <Image
                src={collection.imageUrl}
                alt={collection.name}
                width={300}
                height={200}
              />
            </div>
            <div className="mt-auto">
              <h3 className="text-lg font-bold mb-1 truncate">{collection.name}</h3>
              <p className="text-md text-gray-700">最低価格: {collection.floorPrice}</p>
              <p className="text-md text-gray-700">所有者数: {collection.owners.toLocaleString()}</p>
              <p className="text-md text-gray-700">総供給量: {collection.totalSupply.toLocaleString()}</p>
              <p className="text-md text-gray-700">総取引量: {collection.totalVolume.toLocaleString()}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
