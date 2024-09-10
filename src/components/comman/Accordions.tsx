import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { AccordionOption } from "@/types";
import { Separator } from "../ui/separator";
import { useChatBotContext } from "@/context/chatBotContext";

type AccordionsProps = {
  type?: "single" | "multiple";
  items: AccordionOption[];
  rounded?: boolean;
  separator?: boolean;
  padding?: boolean;
  background?: boolean;
  border?: boolean;
  className?: string;
  triggerClassName?: string;
  itemsClass?: string;
  isPlusIcon?: boolean;
  customIconClassName?: string;
  contentClassName?: string;
  value?: string | undefined;
};

const Accordions = ({
  items,
  type = "single",
  rounded = true,
  separator = false,
  padding = true,
  background = false,
  border = true,
  className,
  itemsClass,
  triggerClassName,
  isPlusIcon,
  customIconClassName,
  contentClassName,
  value,
}: AccordionsProps) => {
  const { setOpen } = useChatBotContext();
  return (
    // <DragDropContext onDragEnd={onDragEnd}>
    // @ts-expect-error-next-line
    <Accordion type={type} value={value} collapsible>
      <div className={cn("space-y-[24px] relative mt-0", className)}>
        {items?.map((item, index) => {
          return (
            <AccordionItem
              className={
                (cn(
                  `overflow-hidden  ${
                    rounded ? "rounded-lg" : "rounded-none"
                  } ${padding ? "p-5" : "p-0"} ${
                    border ? "border" : "border-none p-0"
                  }`
                ),
                itemsClass)
              }
              key={index}
              value={value || `item-${index + 1}`}
            >
              <AccordionTrigger
                onClick={() => setOpen(false)}
                className={cn(
                  `${background ? "p-5 bg-[#F8F8F8]" : "p-0"} items-center`,
                  triggerClassName
                )}
                customIconClassName={customIconClassName}
                isPlusIcon={isPlusIcon}
              >
                {item.title}
              </AccordionTrigger>
              {separator && (
                <Separator
                  className="bg-[#D9D9D9] mt-5"
                  orientation="horizontal"
                />
              )}
              <AccordionContent className={contentClassName}>
                {item.content}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </div>
    </Accordion>
    // </DragDropContext>
  );
};

export default Accordions;
