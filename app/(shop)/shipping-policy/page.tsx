export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-[800px] mx-auto px-[4%] py-16">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">Policies</p>
          <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "clamp(28px, 3vw, 40px)" }}>
            Shipping <em className="font-playfair italic">Policy</em>
          </h1>
        </div>
        <div className="bg-white border border-luxe-border p-8 space-y-6 text-[13px] text-luxe-text-secondary" style={{ fontWeight: 300, lineHeight: 1.85 }}>
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>Free Shipping</h2>
            <p>All orders above ₹499 qualify for free standard shipping across India. Orders below ₹499 incur a flat ₹49 shipping fee.</p>
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>Delivery Timelines</h2>
            <ul className="space-y-1.5">
              <li>Metro cities (Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad): 3-4 business days</li>
              <li>Tier 2 cities: 4-5 business days</li>
              <li>Rest of India: 5-7 business days</li>
            </ul>
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>Courier Partners</h2>
            <p>We ship through Delhivery and Blue Dart to ensure safe and timely delivery. You will receive a tracking number via SMS once your order is shipped.</p>
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>Order Tracking</h2>
            <p>Track your order anytime from your account under &ldquo;My Orders&rdquo; or use the tracking number sent to your registered mobile.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
