import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function AllCourses() {
  // State to track which comment is in reply mode
  const navigate = useNavigate();
  const [replyMode, setReplyMode] = useState(null);

  // Handler to toggle reply mode for a comment
  const handleReplyClick = (commentId: any) => {
    setReplyMode(replyMode === commentId ? null : commentId);
  };

  return (
    <div className="bg-[#FFFFFF] rounded-t-[10px]">
      <div className="px-[14px] py-[10px] flex items-center justify-between border-b">
        <div>
          <h3 className="text-[16px] font-[700] font-nunito mb-1">
            Certificate in the Sustainable Development Goals, Partnership,
            People, Planet and Prosperity
          </h3>
        </div>
        <Button
          type="button"
          onClick={() => navigate("")}
          className="bg-transparent text-black font-nunito px-5 text-[16px]"
        >
          <IoIosArrowRoundBack size={26} className="mr-4" />
          Back
        </Button>
      </div>
      <Tabs defaultValue="Information">
        <TabsList className="border-b rounded-none p-0 w-full justify-start">
          <TabsTrigger
            value="Information"
            className="h-full data-[state=active]:text-[#00778B] border-b-2 border-white rounded-none data-[state=active]:border-b-[#00778B]"
          >
            Information
          </TabsTrigger>
          <TabsTrigger
            value="Module"
            className="h-full data-[state=active]:text-[#00778B] border-b-2 border-white rounded-none data-[state=active]:border-b-[#00778B]"
          >
            Module
          </TabsTrigger>
          <TabsTrigger
            value="Feedback"
            className="h-full data-[state=active]:text-[#00778B] border-b-2 border-white rounded-none data-[state=active]:border-b-[#00778B]"
          >
            Feedback
          </TabsTrigger>
          <TabsTrigger
            value="Forum"
            className="h-full data-[state=active]:text-[#00778B] border-b-2 border-white rounded-none data-[state=active]:border-b-[#00778B]"
          >
            Forum
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Information" className="p-4">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="Module" className="p-4">
          Change your password here.
        </TabsContent>
        <TabsContent value="Feedback" className="p-4">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="Forum" className="p-4">
          <p className="text-[#606060] text-[15px] mb-5">
            Want to get involved in a forum discussion? Post your question or
            reply to one below
          </p>
          <div className="border border-[#D9D9D9] rounded-[5px] p-[23px] mb-5">
            <div className=" flex gap-[10px]">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-calibri ">User Name Here</h3>
                <p className="font-inter text-[12px] text-[#5B5B5B]">
                  Trainer Admin
                </p>
              </div>
            </div>

            <div className=" mt-[18px] text-[#A3A3A3]  h-[150px] ">
              <Textarea
                rows={5}
                className="p-[20px] w-full border gray resize-none"
              />
            </div>
            <div className="w-full mt-[20px] flex justify-end">
              <Button className="bg-[#42A7C3]">Post Question</Button>
            </div>
          </div>

          <div className="border border-[#D9D9D9] rounded-[5px] p-[23px]">
            <div className=" flex gap-[10px]">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-calibri ">User Name Here</h3>
                <p className="font-inter text-[12px] text-[#5B5B5B]">
                  Trainer Admin 2 Day's ago
                </p>
              </div>
            </div>

            <h3 className="mt-[18px]">
              {" "}
              How long does it take for a wind turbine to balance out the carbon
              emissions caused by its production?
            </h3>

            <div className="h-[48px] w-full mt-[12px] border-t border-b gray flex items-center gap-[29px]">
              <div className="flex gap-[10px] items-center">
                <BsFillHandThumbsUpFill className="text-[gray] text-[20px] cursor-pointer" />
                <p>Like (20)</p>
              </div>

              <div className="flex gap-[10px] items-center">
                <BsFillHandThumbsDownFill className="text-[gray]  text-[20px] cursor-pointer" />
                <p>Deslike (0)</p>
              </div>

              <div className="flex gap-[10px] items-center">
                <FaRegComment className="text-[gray]  text-[20px] cursor-pointer" />
                <p>Comments (10)</p>
              </div>
            </div>

            <div className="flex gap-[16px] mt-[21px]">
              <Avatar className="w-[30px] h-[30px] mt-[10px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="w-full h-[auto] bg-[#F5F7FF] p-[15px] rounded-[15px]">
                <h3 className="font-inter text-[14px] font-[600]">
                  Comment Person Name
                </h3>
                <p className="font-inter text-[12px] mt-[6px]">
                  Compared to other energy sources, the installation and running
                  costs of wind power facilities are very low. However, building
                  a wind farm does produce a certain amount of carbon emissions
                  as well as other greenhouse gases. Research has shown that an
                  average wind turbine balances out its carbon footprint within
                  the first 5-7 months and generates zero-emission electricity
                  for the rest of its 30 year lifespan. With technological
                  improvements and the electrification of transport, CO2
                  emissions are expected to be reduced even further.
                </p>
              </div>
            </div>
            <div className="flex gap-[23px] ml-[60px] mt-[10px]">
              <p className="text-[#606060] font-inter text-[12px]">
                Few minutes ago
              </p>
              <a
                className="font-inter text-[12px] cursor-pointer"
                onClick={() => handleReplyClick(1)}
              >
                Reply
              </a>
            </div>

            {replyMode === 1 && (
              <div className="flex gap-[16px] mt-[21px] ml-[60px]">
                <Avatar className="w-[30px] h-[30px] mt-[10px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="w-full flex p-3 relative items-end bg-[#F5F7FF] rounded-[15px]">
                  <Textarea
                    rows={4}
                    className="w-full p-0 bg-[#F5F7FF] border-0 mb-3 mr-3 resize-none !ring-0 !ring-transparent !ring-offset-0"
                    placeholder="Reply to Comment Person Name..."
                  />
                  <div className="flex justify-end">
                    <Button className=" bottom-[30px] right-8 w-[70px] h-[38px] bg-[#42A7C3]">
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AllCourses;
