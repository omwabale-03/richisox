"use client";

import { motion, useReducedMotion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductRevealCardProps {
  name?: string;
  price?: string;
  originalPrice?: string;
  image?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  onAdd?: () => void;
  onFavorite?: () => void;
  enableAnimations?: boolean;
  className?: string;
}

export function ProductRevealCard({
  name = "Premium Crew Socks",
  price = "₹299",
  originalPrice = "₹499",
  image = "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&h=600&fit=crop",
  description = "Experience premium cotton comfort with our luxury crew socks. Perfect for everyday wear with reinforced heel and toe.",
  rating = 4.8,
  reviewCount = 124,
  onAdd,
  onFavorite,
  enableAnimations = true,
  className,
}: ProductRevealCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite?.();
  };

  const containerVariants = {
    rest: { scale: 1, y: 0, filter: "blur(0px)" },
    hover: shouldAnimate
      ? {
          scale: 1.03,
          y: -8,
          filter: "blur(0px)",
          transition: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
        }
      : {},
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
  };

  const overlayVariants = {
    rest: { y: "100%", opacity: 0, filter: "blur(4px)" },
    hover: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 28,
        mass: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const contentVariants = {
    rest: { opacity: 0, y: 20, scale: 0.95 },
    hover: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 25, mass: 0.5 },
    },
  };

  const buttonVariants_motion = {
    rest: { scale: 1, y: 0 },
    hover: shouldAnimate
      ? { scale: 1.05, y: -2, transition: { type: "spring", stiffness: 400, damping: 25 } }
      : {},
    tap: shouldAnimate ? { scale: 0.95 } : {},
  };

  const favoriteVariants = {
    rest: { scale: 1, rotate: 0 },
    favorite: {
      scale: [1, 1.3, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
  };

  const priceNum = parseFloat(price.replace("₹", "").replace("$", ""));
  const origPriceNum = parseFloat((originalPrice || "0").replace("₹", "").replace("$", ""));
  const discountPct = originalPrice ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100) : 0;

  return (
    <motion.div
      data-slot="product-reveal-card"
      initial="rest"
      whileHover="hover"
      variants={containerVariants}
      className={cn(
        "relative w-80 rounded-2xl border border-border/50 bg-card text-card-foreground overflow-hidden",
        "shadow-lg shadow-black/5 cursor-pointer group",
        className
      )}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="h-56 w-full object-cover"
          variants={imageVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <motion.button
          onClick={handleFavorite}
          variants={favoriteVariants}
          animate={isFavorite ? "favorite" : "rest"}
          className={cn(
            "absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm border border-white/20",
            isFavorite ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30"
          )}
        >
          <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
        </motion.button>

        {originalPrice && discountPct > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold"
          >
            {discountPct}% OFF
          </motion.div>
        )}
      </div>

      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-current"
                    : "text-muted-foreground"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {rating} ({reviewCount} reviews)
          </span>
        </div>

        <div className="space-y-1">
          <motion.h3
            className="text-xl font-bold leading-tight tracking-tight"
            initial={{ opacity: 0.9 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.h3>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#c9a84c]">{price}</span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">{originalPrice}</span>
            )}
          </div>
        </div>
      </div>

      <motion.div
        variants={overlayVariants}
        className="absolute inset-0 bg-background/96 backdrop-blur-xl flex flex-col justify-end"
      >
        <div className="p-6 space-y-4">
          <motion.div variants={contentVariants}>
            <h4 className="font-semibold mb-2">Product Details</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </motion.div>

          <motion.div variants={contentVariants}>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <div className="font-semibold">Premium Cotton</div>
                <div className="text-muted-foreground">100% comfort</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <div className="font-semibold">Free Returns</div>
                <div className="text-muted-foreground">7-day policy</div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={contentVariants} className="space-y-3">
            <motion.button
              onClick={onAdd}
              variants={buttonVariants_motion}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full h-12 font-medium",
                "bg-[#0a0a0a] hover:bg-[#c9a84c]",
                "text-white"
              )}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </motion.button>

            <motion.button
              variants={buttonVariants_motion}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className={cn(buttonVariants({ variant: "outline" }), "w-full h-10 font-medium")}
            >
              View Details
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
