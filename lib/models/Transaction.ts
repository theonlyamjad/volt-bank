import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  userId: string;
  accountId?: string;
  name?: string;
  amount: number;
  paymentChannel?: string;
  category?: string;
  date?: Date;
  pending?: boolean;
  type?: string;
  senderBankId?: string;
  receiverBankId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    accountId: {
      type: String,
      default: '',
      index: true,
    },
    name: {
      type: String,
      default: '',
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentChannel: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: '',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    pending: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',
    },
    senderBankId: {
      type: String,
      default: '',
    },
    receiverBankId: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', transactionSchema);