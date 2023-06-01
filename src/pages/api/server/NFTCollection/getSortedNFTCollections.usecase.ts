import { NFTCollectionRepository } from "src/pages/api/server/NFTCollection/NFTCollection.repository";
import { NFTCollectionType, SortOrder, SortableFields } from "src/shared/NFTCollection.type";

export async function getSortedNFTCollectionsUsecase(field: SortableFields = "floorPrice", order: SortOrder = "desc", page: number, pageSize: number): Promise<NFTCollectionType[]> {
  const skip = (page - 1) * pageSize;
  const collections = await NFTCollectionRepository.FindAllSorted(field, order, skip, pageSize);
  
  const mappedCollections = collections.map((collection) => ({
    contractAddress: collection.contractAddress,
    name: collection.name,
    description: collection.description,
    imageUrl: collection.imageUrl,
    totalVolume: collection.totalVolume,
    totalSupply: collection.totalSupply,
    owners: collection.owners,
    floorPrice: collection.floorPrice,
    slug: collection.slug,
    updatedAt: collection.updatedAt,
  }));

  return mappedCollections;
}
