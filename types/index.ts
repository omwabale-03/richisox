// ── Product ──────────────────────────────────────────────────────────────────

export interface IProductColor {
  name: string;
  hex: string;
  imageUrl?: string;
}

export interface IPackOption {
  label: string;   // "Single", "Pack of 3", "Pack of 5", "Pack of 9"
  size: number;     // 1, 3, 5, 9
  price: number;    // price for that pack
}

export interface IReview {
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export type SockType = "ankle" | "crew" | "no-show" | "knee-high" | "quarter" | "over-the-calf";
export type Material = "cotton" | "bamboo" | "wool" | "modal" | "merino" | "cashmere" | "polyester" | "silk-blend";
export type Occasion = "casual" | "formal" | "sports" | "office" | "festive" | "travel";
export type Category = "men" | "women" | "kids" | "unisex";

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  mrp?: number;               // original price (MRP) for strikethrough
  comparePrice?: number;       // backward compat alias for mrp
  discount?: number;           // percentage discount
  category: Category;
  type: string;                // legacy field, kept for compat
  sockType: SockType;
  material: Material;
  occasion: Occasion[];
  technologies: string[];      // e.g. "Silver Frost Anti-Odour", "Moisture Wicking"
  packOptions: IPackOption[];
  sizes: string[];
  colors: IProductColor[];
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
  reviews: IReview[];
  materialCare?: string;       // washing/care instructions rich text
  createdAt: string;
  updatedAt: string;
}

// ── User ─────────────────────────────────────────────────────────────────────

export interface IUser {
  _id: string;
  name: string;
  mobile: string;
  email?: string;
  role: "customer" | "admin";
  loyaltyPoints: number;
  createdAt: string;
  updatedAt: string;
}

// ── Address ──────────────────────────────────────────────────────────────────

export interface IAddress {
  _id: string;
  userId: string;
  name: string;
  mobile: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

// ── Cart ─────────────────────────────────────────────────────────────────────

export interface ICartItem {
  product: IProduct;
  quantity: number;
  size: string;
  color: string;
  packSize?: number;          // 1, 3, 5, 9
  packPrice?: number;         // price for chosen pack
  giftBox?: {
    items: string[];          // product IDs in the gift box
    message: string;
    packaging: string;
    packagingPrice: number;
  };
}

export interface ICart {
  items: ICartItem[];
  subtotal: number;
  itemCount: number;
}

// ── Order ────────────────────────────────────────────────────────────────────

export interface IOrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  packSize?: number;
}

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

export interface IOrder {
  _id: string;
  orderId: string;
  user: IUser;
  items: IOrderItem[];
  address: IAddress;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  coupon?: string;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  orderStatus: OrderStatus;
  shiprocketOrderId?: string;
  trackingNumber?: string;
  courier?: string;
  loyaltyPointsEarned?: number;
  loyaltyPointsRedeemed?: number;
  createdAt: string;
  updatedAt: string;
}

// ── Coupon ────────────────────────────────────────────────────────────────────

export interface ICoupon {
  _id: string;
  code: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  expiresAt: string;
}

// ── API ──────────────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface IDashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  recentOrders: IOrder[];
  ordersByStatus: Record<OrderStatus, number>;
}
