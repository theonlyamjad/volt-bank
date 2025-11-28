import mongoose, { Schema, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface IUser extends Document {
  emails: string;
  firstName: string;
  lastName: string;
  password: string;
  userId?: string;
  dwollaCustomerId?: string;
  dwollaCustomerUrl?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  dateOfBirth?: string;
  ssn?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    emails: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    userId: {
      type: String,
      default: '',
    },
    dwollaCustomerId: {
      type: String,
      default: '',
    },
    dwollaCustomerUrl: {
      type: String,
      default: '',
    },
    address1: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    postalCode: {
      type: String,
      default: '',
    },
    dateOfBirth: {
      type: String,
      default: '',
    },
    ssn: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Hash password before saving
// FIX: Removed 'next' parameter and try/catch block to use proper async/await
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcryptjs.compare(password, this.password);
};

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);