import mongoose, { Schema, Document } from 'mongoose';

export interface IBank extends Document {
  userId: string;
  accountId: string;
  bankId?: string;
  accessToken?: string;
  fundingSourceUrl?: string;
  sharableId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bankSchema = new Schema<IBank>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    accountId: {
      type: String,
      required: true,
    },
    bankId: {
      type: String,
      default: '',
    },
    accessToken: {
      type: String,
      default: '',
    },
    fundingSourceUrl: {
      type: String,
      default: '',
    },
    sharableId: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const Bank = mongoose.models.Bank || mongoose.model<IBank>('Bank', bankSchema);