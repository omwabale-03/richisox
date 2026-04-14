export interface SubCategory {
  label: string;
  image: string;
  route: string;
}

export interface NavTab {
  id: string;
  label: string;
  subcategories: SubCategory[];
}

const IMG = {
  office: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
  sports: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop",
  casual: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=300&h=200&fit=crop",
  formal: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=300&h=200&fit=crop",
  ankle: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=200&fit=crop",
  crew: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=200&fit=crop",
  bamboo: "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=300&h=200&fit=crop",
  gift: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&h=200&fit=crop",
  fallback: "https://images.unsplash.com/photo-1600185365778-d6b8e0afe8d0?w=300&h=200&fit=crop",
};

function sub(label: string, category: string, type: string, image?: string): SubCategory {
  return {
    label,
    image: image || IMG.fallback,
    route: `/products?category=${category}&type=${type.toLowerCase().replace(/\s+/g, "-")}`,
  };
}

export const MOBILE_NAV_TABS: NavTab[] = [
  {
    id: "men",
    label: "MEN",
    subcategories: [
      sub("Office", "men", "office", IMG.office),
      sub("Bamboo", "men", "bamboo", IMG.bamboo),
      sub("Formal", "men", "formal", IMG.formal),
      sub("Casual", "men", "casual", IMG.casual),
      sub("Sports", "men", "sports", IMG.sports),
      sub("Funky", "men", "funky", IMG.fallback),
      sub("Premium", "men", "premium", IMG.formal),
      sub("Specials", "men", "specials", IMG.fallback),
      sub("Ankle", "men", "ankle", IMG.ankle),
      sub("Crew", "men", "crew", IMG.crew),
    ],
  },
  {
    id: "women",
    label: "WOMEN",
    subcategories: [
      sub("Ankle", "women", "ankle", IMG.ankle),
      sub("No-Show", "women", "no-show", IMG.fallback),
      sub("Knee-High", "women", "knee-high", IMG.fallback),
      sub("Sports", "women", "sports", IMG.sports),
      sub("Casual", "women", "casual", IMG.casual),
      sub("Formal", "women", "formal", IMG.formal),
      sub("Bamboo", "women", "bamboo", IMG.bamboo),
      sub("Yoga", "women", "yoga", IMG.fallback),
      sub("Fuzzy", "women", "fuzzy", IMG.fallback),
      sub("Sheer", "women", "sheer", IMG.fallback),
    ],
  },
  {
    id: "kids",
    label: "KIDS",
    subcategories: [
      sub("Boys Ankle", "kids", "boys-ankle", IMG.ankle),
      sub("Girls Ankle", "kids", "girls-ankle", IMG.ankle),
      sub("Boys Crew", "kids", "boys-crew", IMG.crew),
      sub("Girls Crew", "kids", "girls-crew", IMG.crew),
      sub("Sports Kids", "kids", "sports-kids", IMG.sports),
      sub("Fun Prints", "kids", "fun-prints", IMG.fallback),
      sub("School", "kids", "school", IMG.office),
      sub("Infant", "kids", "infant", IMG.fallback),
    ],
  },
  {
    id: "gifting",
    label: "GIFTING",
    subcategories: [
      sub("Gift Box 3-Pack", "unisex", "gift-box-3", IMG.gift),
      sub("Gift Box 5-Pack", "unisex", "gift-box-5", IMG.gift),
      sub("Gift Box 9-Pack", "unisex", "gift-box-9", IMG.gift),
      sub("Premium Gift Set", "unisex", "premium-gift", IMG.gift),
      sub("Corporate Gifting", "unisex", "corporate-gifting", IMG.gift),
      sub("Personalised", "unisex", "personalised", IMG.gift),
      sub("Couple Set", "unisex", "couple-set", IMG.gift),
      sub("Family Pack", "unisex", "family-pack", IMG.gift),
    ],
  },
  {
    id: "super-saver",
    label: "Super Saver",
    subcategories: [
      sub("Buy 3 Get 1", "unisex", "buy-3-get-1", IMG.fallback),
      sub("Buy 5 Get 2", "unisex", "buy-5-get-2", IMG.fallback),
      sub("Value Packs", "unisex", "value-packs", IMG.fallback),
      sub("Combo Deals", "unisex", "combo-deals", IMG.fallback),
      sub("Clearance", "unisex", "clearance", IMG.fallback),
      sub("Season Sale", "unisex", "season-sale", IMG.fallback),
      sub("Bundle Offers", "unisex", "bundle-offers", IMG.fallback),
      sub("Flash Deals", "unisex", "flash-deals", IMG.fallback),
    ],
  },
  {
    id: "genz",
    label: "GenZ",
    subcategories: [
      sub("Tie-Dye", "unisex", "tie-dye", IMG.fallback),
      sub("Smiley Face", "unisex", "smiley-face", IMG.fallback),
      sub("Y2K", "unisex", "y2k", IMG.fallback),
      sub("Retro Stripe", "unisex", "retro-stripe", IMG.fallback),
      sub("Bold Prints", "unisex", "bold-prints", IMG.fallback),
      sub("Anime", "unisex", "anime", IMG.fallback),
      sub("Streetwear", "unisex", "streetwear", IMG.fallback),
      sub("Trippy", "unisex", "trippy", IMG.fallback),
    ],
  },
];
