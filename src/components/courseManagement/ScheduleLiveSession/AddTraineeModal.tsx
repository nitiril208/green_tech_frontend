/* eslint-disable no-unsafe-optional-chaining */
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { getTrainee } from "@/services/apiServices/trainer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, Loader2, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Input } from "../../ui/input";
import { ScrollArea } from "../../ui/scroll-area";
import TraineeItems from "./TraineeItems";

interface TraineeModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  watch: any;
  control: any;
  setTraineeList: React.Dispatch<React.SetStateAction<any>>;
  traineeList: any;
  fetchTraineeCompany: any;
  sessionId: string;
}

interface TraineeEmployee {
  name: string;
  email: string;
  companyName: string;
  id: number;
  company?: any;
}

const AddTraineeModal = ({
  setIsOpen,
  control,
  setTraineeList,
  traineeList,
  fetchTraineeCompany,
  sessionId
}: TraineeModalProps) => {
  const { CompanyId } = useSelector((state: RootState) => state?.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectCompany, setSelectCompany] = useState<string>("");
  const queryclient = useQueryClient();

  const {
    data: fetchTrainee,
    isPending,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.fetchTrainee],
    queryFn: () => getTrainee(+CompanyId, +selectCompany, searchQuery, sessionId),
  });

  useEffect(() => {
    if(sessionId){
      queryclient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchTrainee]
      })
    }
  }, [sessionId])
  

  const traineeEmployee =
    fetchTrainee?.data?.map((i: TraineeEmployee) => ({
      name: i?.name,
      email: i?.email,
      companyName: i?.company?.name || "",
      id: i?.id,
    })) || [];

  useEffect(() => {
    refetch();
  }, [searchQuery, selectCompany]);

  const handleChanges = (e: boolean, data: TraineeEmployee[]) => {
    if (e) {
      setTraineeList((prev: any) => {
        return [
          ...prev,
          ...data?.map((item) => ({ name: item.name, id: item.id })),
        ];
      });
    } else {
      setTraineeList([]);
    }
  };

  return (
    <div className="">
      <h5 className="text-[20px] text-black font-abhaya font-semibold">
        Add Trainee
      </h5>
      <h6 className="text-[#606060] text-base font-abhaya">
        Add a trainee to the upcoming Live Session
      </h6>
      <div className="sm:flex block items-center justify-between mt-3">
        <div className="">
          <div className="flex items-center border border-[#D9D9D9] rounded-md px-4 sm:w-[350px] w-[280px] sm:h-[52px] h-[48px] sm:mb-0 mb-3">
            <Search className="text-[#A3A3A3]" />
            <Input
              placeholder="Search by name, company"
              className="text-[#A3A3A3] placeholder:text-[#A3A3A3] border-none text-[15px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="relative">
          <Controller
            control={control}
            name="selectTrainee"
            defaultValue={[""]}
            render={({ field: { onChange, value } }) => {
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="">
                    <Button className="flex" variant="outline">
                      <SlidersHorizontal
                        width={18}
                        className="text-[#A3A3A3]"
                      />
                      Company
                      <ChevronDown className="text-[#A3A3A3]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <div className="overflow-auto max-h-[300px]">
                      {fetchTraineeCompany?.data?.map(
                        (i: { id: string; name: string }) => (
                          <DropdownMenuCheckboxItem
                            key={i.id}
                            checked={value === i.id}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                onChange(i.id);
                                setSelectCompany(i.id);
                              } else {
                                onChange("");
                                setSelectCompany("");
                              }
                            }}
                            // onCheckedChange={(checked) => {
                            //   onChange(
                            //     checked
                            //       ? [...value, i.value].filter((item) => item)
                            //       : value.filter(
                            //           (item: string) => item !== i.value
                            //         )
                            //   );
                            // }}
                          >
                            {i.name}
                          </DropdownMenuCheckboxItem>
                        )
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }}
          />
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between mb-5">
          <h5 className="text-base text-black font-abhaya font-semibold">
            Trainees
          </h5>
          <span className="text-base text-black font-abhaya flex items-center font-semibold">
            Select All
            <Checkbox
              className="ms-3 border-[#D9D9D9] w-6 h-6"
              onCheckedChange={(e) => handleChanges(!!e, traineeEmployee)}
              checked={traineeEmployee?.length > 0 && traineeList?.length === traineeEmployee?.length}
            />
          </span>
        </div>
        <div className="">
          <ScrollArea className="h-[300px]">
            {isPending || isFetching ? (
              <span className="flex justify-center items-center py-10">
                <Loader2 className="w-5 h-5 animate-spin" />
              </span>
            ) : traineeEmployee?.length > 0 ? (
              traineeEmployee?.map((data: any, index: number) => {
                return (
                  <TraineeItems
                    key={index}
                    data={data}
                    traineeList={traineeList}
                    setTraineeList={setTraineeList}
                  />
                );
              })
            ) : (
              <span className="flex justify-center items-center py-10">
                No data found
              </span>
            )}
          </ScrollArea>
        </div>
      </div>
      <div className="text-right mt-5">
        <Button
          className="uppercase xl:text-base text-sm font-nunito bg-[#58BA66] xl:h-12 h-10 xl:px-6 px-5"
          type="button"
          onClick={() => {
            traineeList?.length > 0
              ? setIsOpen(false)
              : toast({
                  title: "Select Atleast one trainee",
                  variant: "destructive",
                });
          }}
        >
          Add Trainee
        </Button>
      </div>
    </div>
  );
};

export default AddTraineeModal;
