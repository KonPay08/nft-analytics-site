import { getActionApi } from "src/app/getActionApi"
import { NFTCollectionPath } from "src/shared/NFTCollection.type"
import { View } from "src/app/View"

export default async function Page() {
  const initialCollections = await fetchCollections();
  return (
    <View initialCollections={initialCollections} />
  )
}

async function fetchCollections() {
  const { postRequest } = getActionApi();
  const result = await postRequest<NFTCollectionPath.GET_SORTED_NFT_COLLECTIONS>(
    NFTCollectionPath.GET_SORTED_NFT_COLLECTIONS, {
      field: "floorPrice",
      order: "desc",
      page: 1,
      pageSize: 10
    }
  )
  if(!result.success) throw new Error("Failed to fetch collections");
  return result.data
}