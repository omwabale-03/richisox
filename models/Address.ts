import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAddressDocument extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  mobile: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

const AddressSchema = new Schema<IAddressDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: "India" },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Address: Model<IAddressDocument> =
  mongoose.models.Address || mongoose.model<IAddressDocument>("Address", AddressSchema);

export default Address;
