import mongoose, { Document, Model, Schema, models } from 'mongoose';
import { NFTCollectionType } from 'src/shared/NFTCollection.type';

export interface INFTCollection extends Document, NFTCollectionType {}

const collectionSchema = new Schema<INFTCollection>({
  contractAddress: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  totalVolume: { type: Number, required: true },
  totalSupply: { type: Number, required: true },
  owners: { type: Number, required: true },
  floorPrice: { type: Number },
  slug: { type: String, required: true },
}, {
  timestamps: true,
});

interface NFTCollectionModel extends Model<INFTCollection> {}

export const NFTCollection = models?.NFTCollection
    ? (models.NFTCollection as NFTCollectionModel)
    : mongoose.model<INFTCollection>('NFTCollection', collectionSchema);
