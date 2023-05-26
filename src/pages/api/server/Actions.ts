import { NextApiRequest, NextApiResponse } from "next"
import { NFTCollectionActions } from "src/pages/api/server/NFTCollection/NFTCollection.action"
import { ApiPath } from "src/shared/apiTypes"

export const Actions: Record<ApiPath, (req: NextApiRequest, res: NextApiResponse<any>) => Promise<void>> = {
  ...NFTCollectionActions,
}