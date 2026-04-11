"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { OrderTracking } from "@/components/ui/order-tracking";

const DEMO_ORDER = {
  _id: "order2",
  orderId: "RS-20240611-0002",
  orderStatus: "shipped",
  paymentStatus: "paid",
  trackingNumber: "SR123456789IN",
  courier: "Delhivery",
  items: [
    { productId: "2", name: "Sports Performance Socks", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop", price: 199, quantity: 3, size: "L", color: "White" },
  ],
  address: { name: "Om Wabale", mobile: "9876543210", street: "123 MG Road", city: "Pune", state: "Maharashtra", pincode: "411001", country: "India" },
  subtotal: 597,
  discount: 59,
  shipping: 0,
  total: 538,
  coupon: "RICHY10",
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

const ORDER_STEPS = ["pending", "confirmed", "processing", "shipped", "delivered"];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const order = DEMO_ORDER;

  const currentStep = ORDER_STEPS.indexOf(order.orderStatus);

  const trackingSteps = [
    { name: "Order Placed", timestamp: new Date(order.createdAt).toLocaleString("en-IN"), isCompleted: currentStep >= 0 },
    { name: "Order Confirmed", timestamp: currentStep >= 1 ? new Date(Date.now() - 1.8 * 24 * 60 * 60 * 1000).toLocaleString("en-IN") : "Pending", isCompleted: currentStep >= 1 },
    { name: "Processing", timestamp: currentStep >= 2 ? new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toLocaleString("en-IN") : "Pending", isCompleted: currentStep >= 2 },
    { name: "Shipped", timestamp: currentStep >= 3 ? new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleString("en-IN") : "Pending", isCompleted: currentStep >= 3 },
    { name: "Delivered", timestamp: currentStep >= 4 ? new Date().toLocaleString("en-IN") : "Pending", isCompleted: currentStep >= 4 },
  ];

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/orders" className="flex items-center gap-1 text-sm text-brand-brown-light/60 hover:text-brand-gold transition-colors">
            <ChevronLeft className="w-4 h-4" /> Orders
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-playfair font-bold text-brand-brown font-mono">
              {order.orderId}
            </h1>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.orderStatus]}`}>
              {order.orderStatus}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Tracking */}
            <div className="bg-brand-cream-light rounded-2xl p-6 border border-brand-cream-dark">
              <h2 className="text-lg font-semibold text-brand-brown mb-4">Order Tracking</h2>
              {order.trackingNumber && (
                <div className="bg-brand-cream rounded-xl p-3 mb-4 text-sm">
                  <span className="text-brand-brown-light/60">Tracking: </span>
                  <span className="font-mono font-semibold text-brand-gold">{order.trackingNumber}</span>
                  {order.courier && <span className="text-brand-brown-light/50 ml-2">via {order.courier}</span>}
                </div>
              )}
              <OrderTracking steps={trackingSteps} />
            </div>

            {/* Items */}
            <div className="bg-brand-cream-light rounded-2xl p-6 border border-brand-cream-dark">
              <h2 className="text-lg font-semibold text-brand-brown mb-4">Items</h2>
              <div className="space-y-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 bg-brand-cream rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-brand-brown">{item.name}</p>
                      <p className="text-sm text-brand-brown-light/60">{item.size} &middot; {item.color} &middot; Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-brand-brown">₹{(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <div className="bg-brand-cream-light rounded-2xl p-5 border border-brand-cream-dark">
              <h2 className="font-semibold text-brand-brown mb-3">Delivery Address</h2>
              <div className="text-sm text-brand-brown-light/60 space-y-1">
                <p className="font-medium text-brand-brown">{order.address.name}</p>
                <p>{order.address.mobile}</p>
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.state} {order.address.pincode}</p>
                <p>{order.address.country}</p>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-brand-cream-light rounded-2xl p-5 border border-brand-cream-dark">
              <h2 className="font-semibold text-brand-brown mb-3">Payment Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-brand-brown-light/60">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount ({order.coupon})</span>
                    <span>-₹{order.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-brand-brown-light/60">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-brand-brown border-t border-brand-cream-dark pt-2">
                  <span>Total</span>
                  <span>₹{order.total}</span>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <span className="text-brand-brown-light/50">Payment Status</span>
                  <span className={`font-semibold capitalize ${order.paymentStatus === "paid" ? "text-green-700" : "text-red-600"}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
