export default function SizeGuidePage() {
  const charts = [
    { label: "Men", sizes: [
      { size: "S (5-8)", uk: "5-8", us: "6-9", eu: "38-41", cm: "24-26" },
      { size: "M (6-9)", uk: "6-9", us: "7-10", eu: "39-42", cm: "25-27" },
      { size: "L (7-10)", uk: "7-10", us: "8-11", eu: "40-44", cm: "26-29" },
      { size: "XL (8-11)", uk: "8-11", us: "9-12", eu: "42-46", cm: "28-30" },
    ]},
    { label: "Women", sizes: [
      { size: "S (4-6)", uk: "4-6", us: "5-7", eu: "36-39", cm: "22-24" },
      { size: "M (6-8)", uk: "6-8", us: "7-9", eu: "39-41", cm: "24-26" },
      { size: "L (8-10)", uk: "8-10", us: "9-11", eu: "41-44", cm: "26-28" },
    ]},
    { label: "Kids", sizes: [
      { size: "XS (1-3)", uk: "1-3", us: "2-4", eu: "26-30", cm: "14-18" },
      { size: "S (4-6)", uk: "4-6", us: "5-7", eu: "30-34", cm: "18-22" },
      { size: "M (7-9)", uk: "7-9", us: "8-10", eu: "34-38", cm: "22-24" },
    ]},
  ];

  return (
    <div className="min-h-screen bg-luxe-bg">
      <div className="max-w-[800px] mx-auto px-[4%] py-16">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">Find Your Fit</p>
          <h1 className="font-playfair text-luxe-text" style={{ fontWeight: 400, fontSize: "clamp(28px, 3vw, 40px)" }}>
            Size <em className="font-playfair italic">Guide</em>
          </h1>
        </div>

        {charts.map((chart) => (
          <div key={chart.label} className="mb-10">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-luxe-gold mb-4" style={{ fontWeight: 600 }}>{chart.label}</h2>
            <div className="bg-white border border-luxe-border overflow-hidden">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="bg-luxe-surface">
                    {["Size", "UK", "US", "EU", "Foot Length (cm)"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[9px] uppercase tracking-[0.15em] text-luxe-muted" style={{ fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {chart.sizes.map((row) => (
                    <tr key={row.size} className="border-t border-luxe-border">
                      <td className="px-5 py-3 text-luxe-text" style={{ fontWeight: 500 }}>{row.size}</td>
                      <td className="px-5 py-3 text-luxe-text-secondary">{row.uk}</td>
                      <td className="px-5 py-3 text-luxe-text-secondary">{row.us}</td>
                      <td className="px-5 py-3 text-luxe-text-secondary">{row.eu}</td>
                      <td className="px-5 py-3 text-luxe-text-secondary">{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="bg-luxe-surface border border-luxe-border p-6">
          <p className="text-[10px] uppercase tracking-[0.15em] text-luxe-gold mb-2" style={{ fontWeight: 500 }}>How to Measure</p>
          <p className="text-[13px] text-luxe-text-secondary" style={{ fontWeight: 300, lineHeight: 1.85 }}>
            Stand on a piece of paper and trace the outline of your foot. Measure the distance from the heel to the longest toe in centimeters. Compare with the chart above. If you&apos;re between sizes, we recommend going one size up.
          </p>
        </div>
      </div>
    </div>
  );
}
