import { PathReporter } from 'io-ts/PathReporter';
import { isRight } from 'fp-ts/lib/Either';
import { NFTCollectionRepository } from 'src/pages/api/server/NFTCollection/NFTCollection.repository';
import * as t from 'io-ts';
import { OpenSea } from 'src/pages/api/server/OpenSea';

export const NFTCollectionStatsType = t.exact(t.type({
  total_volume: t.number,
  total_supply: t.number,
  num_owners: t.number,
  floor_price: t.union([t.number, t.null]),
}));

export const NFTCollectionType = t.exact(t.type({
  contractAddress: t.string,
  name: t.string,
  description: t.string,
  imageUrl: t.string,
  stats: NFTCollectionStatsType,
  slug: t.string,
}));

export async function updateNFTCollectionUsecase() {
  const assets = await NFTCollectionRepository.FindAll();
  const openSea = new OpenSea();

  for(const asset of assets) {
    const result = await openSea.getCollection(asset.contractAddress, asset.slug);
    const validationResult = NFTCollectionType.decode(result);

    if(isRight(validationResult)) {
      const data = {
        name: validationResult.right.name,
        description: validationResult.right.description,
        imageUrl: validationResult.right.imageUrl,
        totalVolume: validationResult.right.stats.total_volume,
        totalSupply: validationResult.right.stats.total_supply,
        owners: validationResult.right.stats.num_owners,
        floorPrice: validationResult.right.stats.floor_price !== null ? validationResult.right.stats.floor_price : undefined,
        slug: validationResult.right.slug,
      };
    
      const updatedCollection = await NFTCollectionRepository.UpdateByContractAddress(validationResult.right.contractAddress, data);
    
      if (!updatedCollection) {
        await NFTCollectionRepository.Create({contractAddress: validationResult.right.contractAddress, ...data});
      }
    } else {
      console.error(PathReporter.report(validationResult).join("\n"));
    }
  }
}
