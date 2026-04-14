export interface MegaMenuLink {
  label: string;
  href: string;
  bold?: boolean;
}

export interface MegaMenuColumn {
  heading: string;
  links: MegaMenuLink[];
}

export interface FeaturedCard {
  image: string;
  topLabel: string;
  bottomLabel: string;
  href: string;
}

export interface MegaMenuTab {
  columns: MegaMenuColumn[];
  featuredCards: FeaturedCard[];
}

export const megaMenuData: Record<string, MegaMenuTab> = {
  MEN: {
    columns: [
      {
        heading: "SHOP BY COLLECTION",
        links: [
          { label: "Basics", href: "/products?category=men&type=basics" },
          { label: "Casual", href: "/products?category=men&type=casual" },
          { label: "Sports", href: "/products?category=men&type=sports" },
          { label: "Premium", href: "/products?category=men&type=premium" },
          { label: "Funky", href: "/products?category=men&type=funky" },
          { label: "VIEW ALL", href: "/products?category=men", bold: true },
        ],
      },
      {
        heading: "SHOP BY OCCASION",
        links: [
          { label: "Office", href: "/products?category=men&type=office" },
          { label: "Formal", href: "/products?category=men&type=formal" },
          { label: "Bamboo", href: "/products?category=men&type=bamboo" },
          { label: "Specials", href: "/products?category=men&type=specials" },
          { label: "Travel", href: "/products?category=men&type=travel" },
          { label: "VIEW ALL", href: "/products?category=men", bold: true },
        ],
      },
      {
        heading: "SHOP BY LENGTH",
        links: [
          { label: "No-Show", href: "/products?category=men&length=noshow" },
          { label: "Ankle", href: "/products?category=men&length=ankle" },
          { label: "Crew", href: "/products?category=men&length=crew" },
          { label: "Knee-High", href: "/products?category=men&length=kneehigh" },
          { label: "VIEW ALL", href: "/products?category=men", bold: true },
        ],
      },
    ],
    featuredCards: [
      {
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
        topLabel: "STEP UP YOUR GAME",
        bottomLabel: "SPORTS SOCKS",
        href: "/products?category=men&type=sports",
      },
      {
        image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400&h=500&fit=crop",
        topLabel: "OFFICE READY",
        bottomLabel: "FORMAL SOCKS",
        href: "/products?category=men&type=formal",
      },
    ],
  },
  WOMEN: {
    columns: [
      {
        heading: "SHOP BY COLLECTION",
        links: [
          { label: "Basics", href: "/products?category=women&type=basics" },
          { label: "Casual", href: "/products?category=women&type=casual" },
          { label: "Yoga", href: "/products?category=women&type=yoga" },
          { label: "Sports", href: "/products?category=women&type=sports" },
          { label: "Fuzzy", href: "/products?category=women&type=fuzzy" },
          { label: "VIEW ALL", href: "/products?category=women", bold: true },
        ],
      },
      {
        heading: "SUPERSOX SPECIALS",
        links: [
          { label: "Bamboo", href: "/products?category=women&type=bamboo" },
          { label: "Carnival", href: "/products?category=women&type=carnival" },
          { label: "Travel", href: "/products?category=women&type=travel" },
          { label: "Sheer", href: "/products?category=women&type=sheer" },
          { label: "VIEW ALL", href: "/products?category=women", bold: true },
        ],
      },
      {
        heading: "SHOP BY LENGTH",
        links: [
          { label: "No-Show", href: "/products?category=women&length=noshow" },
          { label: "Sneaker", href: "/products?category=women&length=sneaker" },
          { label: "Ankle", href: "/products?category=women&length=ankle" },
          { label: "Knee-High", href: "/products?category=women&length=kneehigh" },
          { label: "VIEW ALL", href: "/products?category=women", bold: true },
        ],
      },
    ],
    featuredCards: [
      {
        image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=500&fit=crop",
        topLabel: "ELEVATE YOUR POSE",
        bottomLabel: "YOGA SOCKS",
        href: "/products?category=women&type=yoga",
      },
      {
        image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=500&fit=crop",
        topLabel: "STAY FRESH ALL DAY",
        bottomLabel: "BAMBOO SOCKS",
        href: "/products?category=women&type=bamboo",
      },
    ],
  },
  KIDS: {
    columns: [
      {
        heading: "SHOP BY GENDER",
        links: [
          { label: "Boys", href: "/products?category=kids&gender=boys" },
          { label: "Girls", href: "/products?category=kids&gender=girls" },
          { label: "Unisex", href: "/products?category=kids&gender=unisex" },
          { label: "Infant", href: "/products?category=kids&type=infant" },
          { label: "VIEW ALL", href: "/products?category=kids", bold: true },
        ],
      },
      {
        heading: "SHOP BY TYPE",
        links: [
          { label: "Ankle", href: "/products?category=kids&length=ankle" },
          { label: "Crew", href: "/products?category=kids&length=crew" },
          { label: "Sports", href: "/products?category=kids&type=sports" },
          { label: "Fun Prints", href: "/products?category=kids&type=funprints" },
          { label: "VIEW ALL", href: "/products?category=kids", bold: true },
        ],
      },
      {
        heading: "COLLECTIONS",
        links: [
          { label: "Disney", href: "/products?category=kids&type=disney" },
          { label: "Marvel", href: "/products?category=kids&type=marvel" },
          { label: "School Pack", href: "/products?category=kids&type=school" },
          { label: "Gift Sets", href: "/products?category=kids&type=gift" },
          { label: "VIEW ALL", href: "/products?category=kids", bold: true },
        ],
      },
    ],
    featuredCards: [
      {
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop",
        topLabel: "FUN FOR LITTLE FEET",
        bottomLabel: "KIDS COLLECTION",
        href: "/products?category=kids",
      },
      {
        image: "https://images.unsplash.com/photo-1600185365778-d6b8e0afe8d0?w=400&h=500&fit=crop",
        topLabel: "GIFT A SMILE",
        bottomLabel: "GIFT SETS",
        href: "/products?category=kids&type=gift",
      },
    ],
  },
};

// Tabs that trigger the mega menu on desktop
export const MEGA_MENU_TRIGGERS = ["Men", "Women", "Kids"] as const;
