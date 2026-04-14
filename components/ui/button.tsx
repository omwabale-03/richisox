import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#1A1A1A] text-white hover:bg-[#333]",
        destructive: "bg-[#B85450] text-white hover:bg-[#A04540]",
        outline: "border border-[#D8D3CC] bg-transparent text-[#1A1A1A] hover:border-[#1A1A1A]",
        secondary: "bg-[#F4F2EF] text-[#1A1A1A] hover:bg-[#E8E4DF]",
        ghost: "hover:bg-[#F4F2EF] text-[#5A5550] hover:text-[#1A1A1A]",
        link: "text-[#A8874A] underline-offset-4 hover:underline",
        gold: "bg-[#A8874A] text-white hover:bg-[#C9A96E]",
      },
      size: {
        default: "h-10 px-[44px] py-4",
        sm: "h-9 px-6 py-2",
        lg: "h-12 px-12 py-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
