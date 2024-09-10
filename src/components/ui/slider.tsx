import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  classNameThumb?: string;
  classNameRange?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, classNameThumb, classNameRange, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[3px] w-full grow overflow-hidden rounded-full bg-[#D9D9D9]">
      <SliderPrimitive.Range
        className={`absolute h-full bg-primary ${classNameRange}`}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={`block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible: focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${classNameThumb}`}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
