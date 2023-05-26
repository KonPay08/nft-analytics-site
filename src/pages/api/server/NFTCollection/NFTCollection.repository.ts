import { INFTCollection, NFTCollection } from "src/pages/api/server/NFTCollection/NFTCollection.models";
import { NFTCollectionType, SortOrder, SortableFields } from "src/shared/NFTCollection.type";

export class NFTCollectionRepository {
  static async FindAll(): Promise<INFTCollection[]> {
    const collection = await NFTCollection.find();
    return collection
  }
  static async Create(data: NFTCollectionType): Promise<INFTCollection> {
    const collection = new NFTCollection(data);
    return collection.save();
  }
  static async FindAllSorted(field: SortableFields, order: SortOrder, skip: number, take: number): Promise<INFTCollection[]> {
    const collection = await NFTCollection.find().sort({ [field]: order }).skip(skip).limit(take);
    return collection;
  }
  static async UpdateByContractAddress(contractAddress: string, data: Partial<NFTCollectionType>): Promise<INFTCollection | null> {
    const collection = await NFTCollection.findOneAndUpdate({ contractAddress }, data, { new: true })
    return collection;
  }
}
