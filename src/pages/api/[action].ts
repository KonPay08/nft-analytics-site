import { NextApiRequest, NextApiResponse } from 'next';
import { Actions } from 'src/pages/api/server/Actions';
import { connectToDatabase } from 'src/pages/api/server/dbConnect';
import { discordNotifier } from 'src/pages/api/server/discordNotifier';
import { NFTCollectionPath } from 'src/shared/NFTCollection.type';
import { ApiPath } from "src/shared/apiTypes"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { action } = req.query;

  try {
    await connectToDatabase();
  } catch (error) {
    await discordNotifier(`😭Error in connectToDatabase: ${error}`);
    return res.status(500).json({ error: 'An error occurred when connecting to the database' });
  }

  console.log(`Action: ${action}, Method: ${req.method}, URL: ${req.url}, Body: ${req.body}`);

  if (!Object.keys(Actions).includes(action as ApiPath)) {
    console.log("Invalid action");
    return res.status(400).json({ error: 'Invalid action' });
  }

  const actionHandler = Actions[action as ApiPath];
  if (!actionHandler) {
    return res.status(400).json({ error: 'Invalid action' });
  }

  try {
    await actionHandler(req, res);
  } catch (error) {
    await discordNotifier(`😭Error in actionHandler: ${error}`);
    return res.status(500).json({ error: 'An error occurred when handling the action' });
  }

  if(action === NFTCollectionPath.UPDATE_NFT_COLLECTIONS) {
    try {
      await discordNotifier(`🚀Success: ${action}`);
    } catch (error) {
      await discordNotifier(`😭Error in discordNotifier (success notification): ${error}`);
    }
  }
}

