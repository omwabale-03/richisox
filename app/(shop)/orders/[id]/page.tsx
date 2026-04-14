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
  pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  confirmed: "bg-blue-50 text-blue-700 border border-blue-200",
  processing: "bg-purple-50 text-purple-700 border border-purple-200",
  shipped: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  delivered: "bg-green-50 text-green-700 border border-green-200",
  cancelled: "bg-red-50 text-red-700 border border-red-200",
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
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-4xl mx-auto px-[4%] py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/orders" className="flex items-center gap-1 text-[11px] uppercase tracking-[0.12em] text-luxe-muted hover:text-luxe-text transition-colors duration-200" style={{ fontWeight: 500 }}>
            <ChevronLeft className="w-4 h-4" /> Orders
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-playfair text-luxe-text font-mono" style={{ fontWeight: 400, fontSize: "22px" }}>
              {order.orderId}
            </h1>
            <span className={`px-3 py-1 text-[9px] uppercase tracking-[0.15em] capitalize ${statusColors[order.orderStatus]}`} style={{ fontWeight: 500 }}>
              {order.orderStatus}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Tracking */}
            <div className="bg-white p-6 border border-luxe-border">
              <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-4" style={{ fontWeight: 600 }}>
                Order Tracking
              </h2>
              {order.trackingNumber && (
                <div className="bg-luxe-surface p-3 mb-4 text-[12px] border border-luxe-border">
                  <span className="text-luxe-muted">Tracking: </span>
                  <span className="font-mono text-luxe-gold" style={{ fontWeight: 500 }}>{order.trackingNumber}</span>
                  {order.courier && <span className="text-luxe-muted ml-2">via {order.courier}</span>}
                </div>
              )}
              <OrderTracking steps={trackingSteps} />
            </div>

            {/* Items */}
            <div className="bg-white p-6 border border-luxe-border">
              <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-4" style={{ fontWeight: 600 }}>
                Items
              </h2>
              <div className="space-y-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 bg-luxe-image-bg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-playfair text-[14px] text-luxe-text" style={{ fontWeight: 400 }}>{item.name}</p>
                      <p className="text-[11px] text-luxe-muted">{item.size} &middot; {item.color} &middot; Qty: {item.quantity}</p>
                    </div>
                    <span className="text-[14px] text-luxe-text" style={{ fontWeight: 500 }}>&#8377;{(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <div className="bg-white p-5 border border-luxe-border">
              <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>
                Delivery Address
              </h2>
              <div className="text-[12px] text-luxe-text-secondary space-y-1" style={{ fontWeight: 300 }}>
                <p className="text-luxe-text" style={{ fontWeight: 500 }}>{order.address.name}</p>
                <p>{order.address.mobile}</p>
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.state} {order.address.pincode}</p>
                <p>{order.address.country}</p>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white p-5 border border-luxe-border">
              <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>
                Payment Summary
              </h2>
              <div className="space-y-2 text-[12px]">
                <div className="flex justify-between text-luxe-muted">
                  <span>Subtotal</span>
                  <span>&#8377;{order.subtotal}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount ({order.coupon})</span>
                    <span>-&#8377;{order.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-luxe-muted">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</span>
                </div>
                <div className="flex justify-between text-luxe-text border-t border-luxe-border pt-2">
                  <span style={{ fontWeight: 600 }}>Total</span>
                  <span style={{ fontWeight: 500 }}>&#8377;{order.total}</span>
                </div>
                <div className="flex justify-between text-[10px] mt-2">
                  <span className="text-luxe-muted">Payment Status</span>
                  <span className={`uppercase tracking-[0.1em] capitalize ${order.paymentStatus === "paid" ? "text-green-700" : "text-luxe-sale"}`} style={{ fontWeight: 500 }}>
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
