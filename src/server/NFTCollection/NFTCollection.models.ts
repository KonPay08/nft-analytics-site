import mongoose, { Document, Model, Schema, models } from 'mongoose';

export interface NFTCollectionType {
  contractAddress: string;
  name: string;
  description?: string;
  imageUrl: string;
  totalVolume: number;
  totalSupply: number;
  owners: number;
  floorPrice?: number;
  slug: string;
}

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
