import titleCircle from "@/assets/images/title_de.svg";
import Accordions from "@/components/comman/Accordions";
// import { AccordionOption} from "@/types";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchfaqdata } from "@/services/apiServices/faq";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import AccordionAnswer from "./AccordionAnswer";
import AccordionQuestion from "./AccordionQuestion";

const AccordionHome = () => {
  const { data: getallfaq, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.fetchfaqquestion],
    queryFn: () => fetchfaqdata(),
  });

  const accordionItems: any =
    getallfaq &&
    getallfaq?.data?.map((item) => {
      return {
        title: <AccordionQuestion data={item} />,
        content: <AccordionAnswer data={item} />,
      };
    });

  return (
    <div className="bg-[#F7F8FC] sm:pt-[40px] pt-0 pb-[40px]">
      <div className="xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-[35px]">
        <h3 className="xl:text-[32px] text-2xl font-UniNeue leading-9 font-bold relative pb-3 inline-block pe-[50px] tracking-tighter">
          Frequently asked Questions
          <img
            src={titleCircle}
            alt=""
            className="absolute right-0 top-0 bottom-0"
          />
          <span className="h-[4px] bg-[#64A70B] w-full absolute bottom-0 left-0"></span>
        </h3>

        {isLoading ? (
          <Loader className="h-10 w-10" />
        ) : (
          <div className="md:flex block xl:gap-[60px] gap-[40px] xl:mt-[40px] mt-[25px]">
            <div className="w-full">
              <Accordions
                items={accordionItems?.slice(0, 3)}
                rounded={false}
                padding={false}
                className="sm:space-y-[24px] space-y-[9px]"
                triggerClassName={`data-[state=open]:bg-[#002A3A] p-4 data-[state=open]:text-white  text-[#002A3A]`}
                isPlusIcon
                itemsClass="p-0"
              />
            </div>
            <div className="w-full">
              <Accordions
                items={accordionItems?.slice(3)}
                rounded={false}
                padding={false}
                className="sm:space-y-[24px] space-y-[9px] md:mt-0 mt-[25px]"
                triggerClassName="data-[state=open]:bg-[#002A3A] p-4 data-[state=open]:text-white  text-[#002A3A]"
                isPlusIcon
                itemsClass="p-0"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccordionHome;
