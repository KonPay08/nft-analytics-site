import { INFTCollection } from "src/server/NFTCollection/NFTCollection.models";
import { NFTCollectionRepository, SortOrder, SortableFields } from "src/server/NFTCollection/NFTCollection.repository";

export async function getSortedNFTCollectionsUsecase(field: SortableFields = "floorPrice", order: SortOrder = "desc", page: number, pageSize: number): Promise<INFTCollection[]> {
  const skip = (page - 1) * pageSize;
  const collections = await NFTCollectionRepository.FindAllSorted(field, order, skip, pageSize);
  return collections
}