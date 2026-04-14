export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-[800px] mx-auto px-[4%] py-16">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">Policies</p>
          <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "clamp(28px, 3vw, 40px)" }}>
            Return <em className="font-playfair italic">Policy</em>
          </h1>
        </div>
        <div className="bg-white border border-luxe-border p-8 space-y-6 text-[13px] text-luxe-text-secondary" style={{ fontWeight: 300, lineHeight: 1.85 }}>
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>7-Day Return Window</h2>
            <p>We offer a 7-day hassle-free return policy from the date of delivery. If you&apos;re not completely satisfied with your purchase, you can initiate a return.</p>
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>How to Return</h2>
            <ol className="space-y-1.5 list-decimal ml-4">
              <li>Log in to your account and go to &ldquo;My Orders&rdquo;</li>
              <li>Select the order you wish to return</li>
              <li>Choose the items and reason for return</li>
              <li>Our logistics partner will pick up the product from your address</li>
            </ol>
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>Refund Timeline</h2>
            <p>Refunds are processed within 5-7 business days after we receive and inspect the returned product. The amount will be credited to your original payment method.</p>
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>Exchange Policy</h2>
            <p>For size or colour exchanges, the process is similar to returns. We&apos;ll ship the replacement at no additional cost once the original product is picked up.</p>
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-text mb-3" style={{ fontWeight: 600 }}>Conditions</h2>
            <ul className="space-y-1.5 list-disc ml-4">
              <li>Products must be unused, unwashed, and in original packaging</li>
              <li>Gift boxes and personalised items are non-returnable</li>
              <li>Sale items marked as &ldquo;Final Sale&rdquo; cannot be returned</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
