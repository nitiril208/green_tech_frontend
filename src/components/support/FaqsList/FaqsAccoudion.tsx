import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionOption } from "@/types/accoudion";
import { Separator } from "../../ui/separator";

type AccordionsProps = {
  type?: "single" | "multiple";
  items: AccordionOption[];
  rounded?: boolean;
  separator?: boolean;
  padding?: boolean;
  background?: boolean;
  border?: boolean;
  contentClassName?: string;
  triggerClassName?: string;
};

const Accordions = ({
  items,
  type = "single",
  rounded = true,
  separator = false,
  padding = true,
  background = false,
  border = true,
  contentClassName,
  triggerClassName,
}: AccordionsProps) => {
  return (
    <Accordion type={type} collapsible>
      <div className="flex flex-col sm:gap-[19px] gap-[15px]">
        {items?.map((item, index) => {
          return (
            <AccordionItem
              className={`overflow-hidden  ${
                rounded ? "rounded-lg" : "rounded-none"
              } ${padding ? "p-5" : "p-0"} ${
                border ? "border" : "border-none p-0"
              }`}
              key={index}
              value={`item-${index + 1}`}
            >
              <AccordionTrigger
                className={`${
                  background ? "p-5 bg-[#F8F8F8]" : "p-0"
                } ${triggerClassName}`}
              >
                {item.question}
              </AccordionTrigger>
              {separator && (
                <Separator
                  className="bg-[#D9D9D9] mt-5"
                  orientation="horizontal"
                />
              )}
              <AccordionContent className={contentClassName}>
                {item.answer}
                {item?.hyperlink !== "" && (
                  <a
                    className="ml-2 text-[#2F80ED]"
                    href={item?.hyperlink}
                    target="_blank"
                  >
                    See More
                  </a>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </div>
    </Accordion>
  );
};

export default Accordions;
