import { NextApiRequest, NextApiResponse } from 'next';
import { INFTCollection } from 'src/server/NFTCollection/NFTCollection.models';
import { SortOrder, SortableFields } from 'src/server/NFTCollection/NFTCollection.repository';
import { getSortedNFTCollectionsUsecase } from 'src/server/NFTCollection/getSortedNFTCollections.usecase';
import { updateNFTCollectionUsecase } from 'src/server/NFTCollection/updateNFTCollections.usecase';

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
    data: INFTCollection[];
  },
  [NFTCollectionPath.UPDATE_NFT_COLLECTIONS]: {
    success: boolean;
  }
};

const getSortedNFTCollectionsAction = async (req: NextApiRequest, res: NextApiResponse<NFTCollectionActionsApiResBodies[NFTCollectionPath.GET_SORTED_NFT_COLLECTIONS]>) => {
  const requestBody = req.body as NFTCollectionActionsApiReqBodies[NFTCollectionPath.GET_SORTED_NFT_COLLECTIONS];
  const { field, order, page, pageSize } = requestBody;
  const data = await getSortedNFTCollectionsUsecase(field, order, page, pageSize);
  res.status(200).json({ success: true, data });
}

const updateNFTCollectionsAction = async (req: NextApiRequest, res: NextApiResponse<NFTCollectionActionsApiResBodies[NFTCollectionPath.UPDATE_NFT_COLLECTIONS]>) => {
  await updateNFTCollectionUsecase();
  res.status(200).json({ success: true })
}

export const NFTCollectionActions: Record<NFTCollectionPath, (req: NextApiRequest, res: NextApiResponse<any>) => Promise<void>> = {
  [NFTCollectionPath.GET_SORTED_NFT_COLLECTIONS]: getSortedNFTCollectionsAction,
  [NFTCollectionPath.UPDATE_NFT_COLLECTIONS]: updateNFTCollectionsAction,
}
