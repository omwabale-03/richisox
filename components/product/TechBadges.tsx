"use client";

import { Droplets, Wind, Shield, Leaf, Award, Sparkles } from "lucide-react";

const TECH_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Silver Frost Anti-Odour": Droplets,
  "Anti-Odour": Droplets,
  "Zero Odour Modal": Droplets,
  "Zero Odour Bamboo": Droplets,
  "Anti-Bacterial": Shield,
  "Moisture Wicking": Wind,
  "Breathable Mesh": Wind,
  "Arch Support": Shield,
  "Cushioned Sole": Shield,
  "Extra Cushioned": Shield,
  "OEKO-TEX Certified": Award,
  "Eco-Friendly": Leaf,
  "Combed Cotton": Sparkles,
  "Spandex Stretch": Sparkles,
  "Non-Slip Grip": Shield,
  "Temperature Regulating": Wind,
  "Odour Resistant": Droplets,
  "Compression Zones": Shield,
  "Mesh Ventilation": Wind,
  "Deep Heel Pocket": Shield,
  "Silicone Heel Grip": Shield,
  "Seamless Toe": Sparkles,
  "Graduated Compression": Shield,
  "Circulation Support": Shield,
  "Silk Blend Comfort": Sparkles,
  "Hand-Finished Details": Award,
  "Luxury Cashmere": Sparkles,
  "Soft Combed Cotton": Sparkles,
  "Bamboo Fibre": Leaf,
};

interface TechBadgesProps {
  technologies: string[];
  compact?: boolean;
}

export function TechBadges({ technologies, compact = false }: TechBadgesProps) {
  if (!technologies || technologies.length === 0) return null;

  if (compact) {
    return (
      <div className="flex flex-wrap gap-1">
        {technologies.slice(0, 2).map((tech) => (
          <span key={tech} className="text-[8px] uppercase tracking-[0.1em] text-luxe-muted border border-luxe-border px-1.5 py-0.5">
            {tech}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {technologies.map((tech) => {
        const Icon = TECH_ICONS[tech] || Sparkles;
        return (
          <div
            key={tech}
            className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-luxe-gold border border-luxe-gold/30 px-2.5 py-1.5"
            style={{ fontWeight: 500 }}
          >
            <Icon className="w-3 h-3" />
            {tech}
          </div>
        );
      })}
    </div>
  );
}
