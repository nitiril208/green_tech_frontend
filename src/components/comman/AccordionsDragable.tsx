import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionOption } from "@/types";
import { Separator } from "../ui/separator";

type AccordionsProps = {
  type?: "single" | "multiple";
  items: AccordionOption[];
  rounded?: boolean;
  separator?: boolean;
  padding?: boolean;
  background?: boolean;
};

const AccordionsDragable = ({
  items,
  type = "single",
  rounded = true,
  separator = false,
  padding = true,
  background = false,
}: AccordionsProps) => {
  return (
    // <DragDropContext onDragEnd={onDragEnd}>
    <Accordion type={type} collapsible>
      <div className="space-y-[24px]">
        {items.map((item, index) => {
          return (
            <AccordionItem
              className={`overflow-hidden  ${rounded ? "rounded-lg" : "rounded-none"
                } ${padding ? "p-5" : "p-0"}`}
              key={index}
              value={`item-${index + 1}`}
            >
              <AccordionTrigger
                className={`${background ? "p-5 bg-[#F8F8F8]" : "p-0"}`}
              >
                {item.title}
              </AccordionTrigger>
              {separator && (
                <Separator
                  className="bg-[#D9D9D9] mt-5"
                  orientation="horizontal"
                />
              )}
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          );
        })}
      </div>
    </Accordion>
    // </DragDropContext>
  );
};

export default AccordionsDragable;
