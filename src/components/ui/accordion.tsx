import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border p-[20px]", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    isPlusIcon?: boolean;
    customIconClassName?: string;
  }
>(
  (
    { className, children, isPlusIcon = false, customIconClassName, ...props },
    ref
  ) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-0 font-medium transition-all group [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        {isPlusIcon ? (
          <>
            <Plus className="xl:w-8 xl:h-8 h-6 w-6 shrink-0 transition-transform duration-200 group-data-[state=open]:hidden" />
            <Minus className="xl:w-8 xl:h-8 h-6 w-6 hidden shrink-0 transition-transform duration-200 group-data-[state=open]:block" />
          </>
        ) : (
          <ChevronDown
            className={`2xl:h-7 2xl:w-7 sm:w-6 sm:h-6 w-5 h-5 shrink-0 transition-transform duration-200 ${customIconClassName}`}
          />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pt-4 pb-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
