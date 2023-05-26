import { INFTCollection, NFTCollection, NFTCollectionType } from "src/server/NFTCollection/NFTCollection.models";

export type SortOrder = 'asc' | 'desc';
type OmitType = "contractAddress" | "name" | "description" | "imageUrl" | "slug"
export type SortableFields = keyof Omit<NFTCollectionType, OmitType>

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
