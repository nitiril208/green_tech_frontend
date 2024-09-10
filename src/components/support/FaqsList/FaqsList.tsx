import Loader from "@/components/comman/Loader";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchFaqs } from "@/services/apiServices/faqs";
import { UserRole } from "@/types/UserRole";
import { useQuery } from "@tanstack/react-query";
import Accordions from "./FaqsAccoudion";

const FaqsList = () => {
  const userData = localStorage.getItem("user");
  const userRole = userData ? JSON.parse(userData)?.query?.role : null;

  const Role =
    UserRole.Trainer === +userRole
      ? 1
      : UserRole?.Trainee === +userRole
      ? 2
      : UserRole?.Company === +userRole
      ? 3
      : 4;

  // const accordionItems: AccordionOption[] = List.map((item) => {
  //   return {
  //     title: <FaqsListItems data={item} />,
  //     content: <FaqsListAnswer />,
  //   };
  // });
  const { data: faqs_list, isPending } = useQuery({
    queryKey: [QUERY_KEYS.faqsList],
    queryFn: () => fetchFaqs(Role),
  });

  return (
    <div className="bg-white rounded-xl">
      <div className="border-b border-[#D9D9D9] p-5">
        <h6 className="font-calibri text-base font-bold sm:pb-1 pb-2">FAQ’s</h6>
        <p className="text-[#606060] text-[15px] font-abhaya leading-[16px] font-bold">
          {userRole === 2
            ? "Here’s the full list of FAQs related to all your courses"
            : "Find answers to common questions below"}
        </p>
      </div>
      <div className="p-5">
        <div>
          {isPending ? (
            <Loader />
          ) : (
            <Accordions
              items={faqs_list?.data?.data}
              rounded={false}
              border={false}
              triggerClassName="border w-full group hover:no-underline text-left sm:text-base text-sm font-semibold sm:p-5 p-3"
              contentClassName="border w-full sm:p-5 p-3 text-[16px] leading-[22px]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqsList;
