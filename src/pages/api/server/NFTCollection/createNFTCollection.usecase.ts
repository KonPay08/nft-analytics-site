// import { PathReporter } from 'io-ts/PathReporter';
// import { isRight } from 'fp-ts/lib/Either';
// import { readJson } from 'src/lib/readJson';
// import { NFTCollection } from 'src/services/NFTCollection/NFTCollection.models';
// import { OpenSea } from 'src/services/OpenSea';
// import { NFTCollectionType } from 'src/services/NFTCollection/updateNFTCollections.usecase';

// export async function createNFTCollectionUsecase() {
//   const openSea = new OpenSea();
//   const path = "data/slug20230520.json"
//   const assets: any[] = await readJson(path)

//   for(const asset of assets) {
//     const result = await openSea.getCollection(asset.tokenAddress, asset.slug);
//     const validationResult = NFTCollectionType.decode(result);

//     if(isRight(validationResult)) {
//       const collection = new NFTCollection({
//         contractAddress: validationResult.right.contractAddress,
//         name: validationResult.right.name,
//         description: validationResult.right.description,
//         imageUrl: validationResult.right.imageUrl,
//         totalVolume: validationResult.right.stats.total_volume,
//         totalSupply: validationResult.right.stats.total_supply,
//         owners: validationResult.right.stats.num_owners,
//         floorPrice: validationResult.right.stats.floor_price,
//         slug: validationResult.right.slug,
//       });
//       await collection.save();
//     } else {
//       console.error(PathReporter.report(validationResult).join("\n"));
//     }
//   }
// }
