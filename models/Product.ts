import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProductDocument extends Document {
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  category: "men" | "women" | "kids";
  type: "casual" | "sports" | "formal" | "ankle" | "crew";
  sizes: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  stock: number;
  sku: string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
}

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    comparePrice: { type: Number },
    category: { type: String, enum: ["men", "women", "kids"], required: true },
    type: {
      type: String,
      enum: ["casual", "sports", "formal", "ankle", "crew"],
      required: true,
    },
    sizes: [{ type: String }],
    colors: [{ name: String, hex: String }],
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
    sku: { type: String, unique: true },
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", description: "text", tags: "text" });

const Product: Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProductDocument>("Product", ProductSchema);

export default Product;
