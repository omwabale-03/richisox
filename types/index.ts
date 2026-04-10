export interface IUser {
  _id: string;
  name: string;
  mobile: string;
  email?: string;
  role: "customer" | "admin";
  createdAt: string;
  updatedAt: string;
}

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

export interface IProductColor {
  name: string;
  hex: string;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  category: "men" | "women" | "kids";
  type: "casual" | "sports" | "formal" | "ankle" | "crew";
  sizes: string[];
  colors: IProductColor[];
  images: string[];
  stock: number;
  sku: string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
  size: string;
  color: string;
}

export interface ICart {
  items: ICartItem[];
  subtotal: number;
  itemCount: number;
}

export interface IOrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
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
  createdAt: string;
  updatedAt: string;
}

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
