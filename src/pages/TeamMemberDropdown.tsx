import emillaAnderson from "@/assets/images/EmillaAnderson.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import {
  IoMdArrowDropdown,
  IoMdNotificationsOutline,
  IoMdPower,
} from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";

function TeamMemberDropdown() {
  return (
    <div className="lg:ml-[800px] mt-[20px] md:ml-[600px] md:ml-[400px] sm:ml-[200px] xs:ml-[50px]">
      <DropdownMenu>
        <DropdownMenuTrigger className="">
          <IoMdArrowDropdown className="text-[24px]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="h-[283px] w-[250px] lg:w-[200px] md:w-[180px] sm:w-[160px] xs:w-[140px]">
          <DropdownMenuLabel className="h-[62px] bg-[#00778B] rounded-sm">
            <div className="flex">
              <img
                src={emillaAnderson}
                alt="Employee Name"
                className="w-[32px] h-[32px] rounded-full mr-4 mt-[5px] border-[2px]"
              />
              <div className="flex flex-col">
                <span className="text-[16px] text-[#FFFFFF]">
                  Evergrow Green
                </span>
                <span className="text-[12px] font-sans text-[#FFFFFF]">
                  Team Member
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className="h-[42px] text-[#000000] text-[16px] bg-[#FFFFFF] mt-[10px] flex items-center">
            <IoPersonOutline className="h-[22px] w-[22px]" />
            <span className="ml-[10px]">Profile Setting</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="h-[42px] text-[#000000] text-[16px] bg-[#FFFFFF] mt-[10px] flex items-center">
            <HiAdjustmentsHorizontal className="h-[22px] w-[23.4px]" />
            <span className="ml-[10px]">Account Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="h-[42px] text-[#000000] text-[16px] bg-[#FFFFFF] mt-[10px] flex items-center">
            <IoMdNotificationsOutline className="h-[22px] w-[23.4px]" />
            <span className="ml-[10px]">Notification Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="h-[42px] text-[#000000] text-[16px] bg-[#FFFFFF] mt-[10px] flex items-center">
            <IoMdPower className="h-[22px] w-[19.4px]" />
            <span className="ml-[10px]">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TeamMemberDropdown;
