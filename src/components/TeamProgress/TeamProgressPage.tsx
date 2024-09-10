import { QUERY_KEYS } from "@/lib/constants";
import { getEmployeeProgress } from "@/services/apiServices/member";
import { AccordionOption } from "@/types";
import { EmployeeProgreeResponse } from "@/types/Invition";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import Accordions from "../comman/Accordions";
import Loader from "../comman/Loader";
import { Input } from "../ui/input";
import TeamProgresslist from "./TeamProgresslist";
import TeamProgresslistInner from "./TeamProgresslistInner";

const TeamProgressPage = () => {
  const [search, setSearch] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const companyId = userData?.query?.detailsid;
  const { data, isFetching } = useQuery<EmployeeProgreeResponse>({
    queryKey: [QUERY_KEYS.getEmployeeProgress, { search }],
    queryFn: () =>
      getEmployeeProgress({ id: companyId, keyword: search, status: "" }),
  });

  const accordionItems: AccordionOption[] =
    (data?.data?.employee &&
      data?.data?.employee.map((item) => {
        return {
          title: <TeamProgresslist data={item} />,
          content: <TeamProgresslistInner data={item} />,
        };
      })) ||
    [];
  return (
    <div className="bg-white rounded-xl sm:mt-5 mt-0">
      <div className="p-4 border-b border-[#D9D9D9]">
        <h4 className="text-[16px] text-[#000000] font-calibri font-semibold">
          Team Progress
        </h4>
      </div>
      <div className="flex flex-col p-5 gap-5">
        <div className="relative flex items-center gap-2 md:w-[550px] sm:w-[450px] w-[290px] rounded-lg sm:h-[52px] h-[46px]">
          <Search className="text-[#A3A3A3] absolute left-4" />
          <Input
            className="pr-4 pl-12 py-2 text-[#A3A3A3] placeholder:text-[#A3A3A3] font-abhaya font-semibold h-full"
            placeholder="Search by name, email etc."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {isFetching ? (
          <Loader />
        ) : accordionItems?.length > 0 ? (
          <Accordions items={accordionItems} rounded={false} />
        ) : (
          <span className="block py-10 text-center">No data found</span>
        )}
      </div>
    </div>
  );
};

export default TeamProgressPage;
