import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    color: string;
    isShow?: boolean;
  }
>(({ className, value, color, isShow = false, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-[140px] overflow-hidden bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 transition-all "
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
        backgroundColor: color,
      }}
    />
    {isShow && (
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">
        {value}%
      </span>
    )}
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
