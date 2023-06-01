export type SortOrder = 'asc' | 'desc';
type OmitType = "contractAddress" | "name" | "description" | "imageUrl" | "slug"
export type SortableFields = keyof Omit<NFTCollectionType, OmitType>

export interface NFTCollectionType {
  contractAddress: string;
  name: string;
  description?: string;
  imageUrl: string;
  totalVolume: number;
  totalSupply: number;
  owners: number;
  floorPrice?: number;
  slug: string;
  updatedAt?: Date;
}

export enum NFTCollectionPath {
  GET_SORTED_NFT_COLLECTIONS = "get-sorted-nftcollections",
  UPDATE_NFT_COLLECTIONS = "update-nftcollections",
}

export type NFTCollectionActionsApiReqBodies = {
  [NFTCollectionPath.GET_SORTED_NFT_COLLECTIONS]: {
    field: SortableFields;
    order: SortOrder;
    page: number;
    pageSize: number;
  },
  [NFTCollectionPath.UPDATE_NFT_COLLECTIONS]: undefined,
};

export type NFTCollectionActionsApiResBodies = {
  [NFTCollectionPath.GET_SORTED_NFT_COLLECTIONS]: {
    success: boolean;
    data: NFTCollectionType[];
  },
  [NFTCollectionPath.UPDATE_NFT_COLLECTIONS]: {
    success: boolean;
  }
};