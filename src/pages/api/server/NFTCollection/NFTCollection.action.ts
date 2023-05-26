import { NextApiRequest, NextApiResponse } from 'next';
import { getSortedNFTCollectionsUsecase } from 'src/pages/api/server/NFTCollection/getSortedNFTCollections.usecase';
import { updateNFTCollectionUsecase } from 'src/pages/api/server/NFTCollection/updateNFTCollections.usecase';
import { NFTCollectionActionsApiReqBodies, NFTCollectionActionsApiResBodies, NFTCollectionPath } from 'src/shared/NFTCollection.type';


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
