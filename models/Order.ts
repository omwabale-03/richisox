import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderDocument extends Document {
  orderId: string;
  user: mongoose.Types.ObjectId;
  items: {
    productId: mongoose.Types.ObjectId;
    name: string;
    image: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
  }[];
  address: {
    name: string;
    mobile: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  coupon?: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  shiprocketOrderId?: string;
  trackingNumber?: string;
  courier?: string;
}

const OrderSchema = new Schema<IOrderDocument>(
  {
    orderId: { type: String, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
        size: String,
        color: String,
      },
    ],
    address: {
      name: String,
      mobile: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: "India" },
    },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    total: { type: Number, required: true },
    coupon: String,
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: { type: String, default: "razorpay" },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    shiprocketOrderId: String,
    trackingNumber: String,
    courier: String,
  },
  { timestamps: true }
);

OrderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
    const count = await (this.constructor as Model<IOrderDocument>).countDocuments();
    this.orderId = `RS-${dateStr}-${String(count + 1).padStart(4, "0")}`;
  }
  next();
});

const Order: Model<IOrderDocument> =
  mongoose.models.Order || mongoose.model<IOrderDocument>("Order", OrderSchema);

export default Order;
