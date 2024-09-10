import SelectMenu from "@/components/comman/SelectMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch } from "@/hooks/use-redux";
import { setPath } from "@/redux/reducer/PathReducer";
import { Image, Video } from "lucide-react";
import { useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const selectNameOption = [
  {
    label: "Select Name 1",
    value: "Select_Name_1",
  },
  {
    label: "Select Name 2",
    value: "Select_Name_2",
  },
  {
    label: "Select Name 3",
    value: "Select_Name_3",
  },
];

const ticketPriorityOption = [
  {
    label: "Ticket Priority 1",
    value: "Ticket_Priority_1",
  },
  {
    label: "Ticket Priority 2",
    value: "Ticket_Priority_2",
  },
  {
    label: "Ticket Priority 3",
    value: "Ticket_Priority_3",
  },
];

const AddNewTickets = () => {
  const dispatch = useAppDispatch();
  const Role = location.pathname.split("/")[1];
  const [selectName, setSelectName] = useState("");
  const [ticketPriority, setTicketPriority] = useState("");
  return (
    <div className="lg:bg-white bg-transparent rounded-xl">
      <div className="border-b-2 border-solid gray flex justify-between items-center p-[16px] ">
        <div>
          <h2 className="font-[700] text-[16px]">Add New Ticket</h2>
        </div>
        <div>
          <button
            onClick={() =>
              dispatch(
                setPath([
                  { label: "Support", link: null },
                  {
                    label: "Support Request",
                    link: `/${Role}/support-request`,
                  },
                ])
              )
            }
            className="text-[16px] font-[600] flex items-center gap-[15px] font-abhaya"
          >
            <HiOutlineArrowNarrowLeft />
            Back
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="p-5 border border-[#D9D9D9] rounded-xl">
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div className="col-span-1">
              <Label className="text-base text-black font-calibri block pb-2">
                Assign To
              </Label>
              <SelectMenu
                option={selectNameOption}
                setValue={(data: string) => setSelectName(data)}
                value={selectName}
                className="text-[#A3A3A3] text-base font-calibri border-[#D9D9D9] xl:h-12 h-10 xl:px-5 px-3"
                placeholder="Select Name"
              />
            </div>
            <div className="col-span-1">
              <Label className="text-base text-black font-calibri block pb-2">
                Ticket Priority
              </Label>
              <SelectMenu
                option={ticketPriorityOption}
                setValue={(data: string) => setTicketPriority(data)}
                value={ticketPriority}
                className="text-[#A3A3A3] text-base font-calibri border-[#D9D9D9] xl:h-12 h-10 xl:px-5 px-3"
                placeholder="High"
              />
            </div>
          </div>
          <div className="mb-5">
            <Label className="text-base text-black font-calibri block pb-2">
              Ticket Subject
            </Label>
            <Input
              className="border-[#D9D9D9] w-full  xl:h-12 h-10 placeholder:text-[#A3A3A3] text-[#A3A3A3] text-base font-calibri xl:px-5 px-3"
              placeholder="Enter ticket subject"
            />
          </div>
          <div className="mb-8">
            <Label className="text-base text-black font-calibri block pb-2">
              Description
            </Label>
            <Textarea
              className="w-full border-[#D9D9D9] text-[#A3A3A3] text-base font-calibri ! placeholder:text-[#A3A3A3] xl:px-5 px-3"
              placeholder="Enter details"
            />
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex items-center gap-8">
              <div className="flex items-center">
                <div className="w-[42px] h-[42px] rounded-full bg-[#E3E5F5] flex justify-center items-center me-4">
                  <Image />
                </div>
                <div className="text-base text-black font-calibri">
                  <h5 className="tetx-base text-black font-calibri">
                    Upload Document
                  </h5>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-[42px] h-[42px] rounded-full bg-[#E3E5F5] flex justify-center items-center me-4">
                  <Video />
                </div>
                <div className="text-base text-black font-calibri">
                  <h5 className="tetx-base text-black font-calibri">
                    Upload Video
                  </h5>
                </div>
              </div>
            </div>
            <div className="">
              <Button className="text-base bg-[#58BA66] px-6">SUBMIT</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewTickets;
