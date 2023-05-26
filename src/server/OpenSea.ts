import Web3 from 'web3';
import { OpenSeaPort, Network } from 'opensea-js';
import { OpenSeaAsset } from 'opensea-js/lib/types';

export class OpenSea {
  #port: OpenSeaPort;
  constructor() {
    const infuraApiKey =  process.env.INFURA_API_KEY;
    const openSeaApiKey = process.env.OPENSEA_API_KEY;
    const provider = new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${infuraApiKey}`);
    this.#port = new OpenSeaPort(provider, {
      networkName: Network.Main,
      apiKey: openSeaApiKey,
    });
  }

  async getCollection(tokenAddress: string, slug: string) {
    const collection = await this.#port.api.getCollection(slug);
    return {
      contractAddress: tokenAddress,
      name: collection.name,
      description: collection.description,
      imageUrl: collection.imageUrl,
      stats: collection.stats,
      slug: collection.slug,
    };
  }

  async getAllAssetsByOwner(walletAddress: string): Promise<OpenSeaAsset[]> {
    let allAssets: OpenSeaAsset[] = [];
    let limit = 50;
    let offset = 0;
    let moreAssets = true;

    while (moreAssets) {
      const assets = await this.#port.api.getAssets({
        owner: walletAddress,
        order_direction: 'desc',
        limit,
        offset,
      })
      allAssets = allAssets.concat(assets.assets);
      offset += limit;
      moreAssets = assets.assets.length === limit;
    }

    return allAssets;
  }
}