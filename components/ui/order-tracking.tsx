"use client";

import * as React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OrderTrackingProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: {
    name: string;
    timestamp: string;
    isCompleted: boolean;
  }[];
}

const OrderTracking = React.forwardRef<HTMLDivElement, OrderTrackingProps>(
  ({ steps = [], className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full max-w-md", className)} {...props}>
        {steps.length > 0 ? (
          <div>
            {steps.map((step, index) => (
              <div key={index} className="flex">
                <div className="flex flex-col items-center">
                  {step.isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-luxe-gold" />
                  ) : (
                    <Circle className="h-5 w-5 shrink-0 text-luxe-muted" />
                  )}
                  {index < steps.length - 1 && (
                    <div
                      className={cn("w-px grow", {
                        "bg-luxe-gold": steps[index + 1].isCompleted,
                        "bg-luxe-border": !steps[index + 1].isCompleted,
                      })}
                    />
                  )}
                </div>
                <div className="ml-3 pb-6">
                  <p className="text-[12px] text-luxe-text" style={{ fontWeight: 500 }}>{step.name}</p>
                  <p className="text-[11px] text-luxe-muted">{step.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[13px] text-luxe-muted">This order has no tracking information.</p>
        )}
      </div>
    );
  }
);
OrderTracking.displayName = "OrderTracking";

export { OrderTracking };
