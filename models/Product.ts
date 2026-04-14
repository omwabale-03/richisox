import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProductDocument extends Document {
  name: string;
  description: string;
  price: number;
  mrp?: number;
  comparePrice?: number;
  discount?: number;
  category: string;
  type: string;
  sockType: string;
  material: string;
  occasion: string[];
  technologies: string[];
  packOptions: { label: string; size: number; price: number }[];
  sizes: string[];
  colors: { name: string; hex: string; imageUrl?: string }[];
  images: string[];
  stock: number;
  sku: string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isTrending: boolean;
  rating: number;
  reviewCount: number;
  reviews: { user: string; rating: number; comment: string; date: Date; verified: boolean }[];
  materialCare?: string;
  [key: string]: unknown;
}

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number },
    comparePrice: { type: Number },
    discount: { type: Number, default: 0 },
    category: {
      type: String,
      enum: ["men", "women", "kids", "unisex"],
      required: true,
    },
    type: { type: String, default: "crew" },
    sockType: {
      type: String,
      enum: ["ankle", "crew", "no-show", "knee-high", "quarter", "over-the-calf"],
      default: "crew",
    },
    material: {
      type: String,
      enum: ["cotton", "bamboo", "wool", "modal", "merino", "cashmere", "polyester", "silk-blend"],
      default: "cotton",
    },
    occasion: [{ type: String }],
    technologies: [{ type: String }],
    packOptions: [
      {
        label: { type: String },
        size: { type: Number },
        price: { type: Number },
      },
    ],
    sizes: [{ type: String }],
    colors: [
      {
        name: String,
        hex: String,
        imageUrl: String,
      },
    ],
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
    sku: { type: String, unique: true },
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    reviews: [
      {
        user: String,
        rating: Number,
        comment: String,
        date: { type: Date, default: Date.now },
        verified: { type: Boolean, default: false },
      },
    ],
    materialCare: { type: String },
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", description: "text", tags: "text" });
ProductSchema.index({ category: 1, sockType: 1, material: 1 });
ProductSchema.index({ occasion: 1 });
ProductSchema.index({ isNew: 1, isTrending: 1, isFeatured: 1 });

const Product: Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProductDocument>("Product", ProductSchema);

export default Product;
