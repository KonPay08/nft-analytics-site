import { NextApiRequest, NextApiResponse } from "next"
import { NFTCollectionActions, NFTCollectionActionsApiReqBodies, NFTCollectionActionsApiResBodies, NFTCollectionPath } from "src/server/NFTCollection/NFTCollection.action"

export type ApiPath = NFTCollectionPath
export type ApiReqBodies = NFTCollectionActionsApiReqBodies
export type ApiResBodies = NFTCollectionActionsApiResBodies

export const Actions: Record<ApiPath, (req: NextApiRequest, res: NextApiResponse<any>) => Promise<void>> = {
  ...NFTCollectionActions,
}