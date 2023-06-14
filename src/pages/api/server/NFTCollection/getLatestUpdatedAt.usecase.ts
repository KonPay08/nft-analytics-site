import { NFTCollectionRepository } from "src/pages/api/server/NFTCollection/NFTCollection.repository";

export async function getLatestUpdatedAtUsecase() {
  const updatedAt = await NFTCollectionRepository.FindLatestUpdatedAt();
  return updatedAt;
}