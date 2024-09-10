import nature from "@/assets/images/nature.png";
import EmployeeListSidebar from "@/components/EmployeeListSidebar";
import HeaderCourse from "@/components/HeaderCourse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

function EnrolledCourses() {
  return (
    <div className="flex bg-[#f5f3ff] w-[1510px] h-[1608px] gap-1 overflow-x-hidden">
      <div className=" w-[235px] h-[1608px]">
        <EmployeeListSidebar />
      </div>
      <div className="flex flex-col">
        <div className="w-[1204px] h-[120px] ">
          <HeaderCourse />
        </div>

        <div className="bg-[#FFFFFF] w-[1250px] h-[1469px] m-[12px] rounded-t-[10px]">
          <div className=" pt-[16px] pl-[30px] w-[1250px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[50px]">
            <p className="text-[#000000] text-[Calibri]">Recommended Courses</p>
          </div>

          <div className="flex pl-[13px] w-[1250px] h-[70px] bg-[#FFFFFF] ">
            <div>
              <div className="flex mt-[9px] ml-0 items-center border border-[#D9D9D9] rounded-md px-4 py-2 w-[550px] h-[52px] text-[#A3A3A3]">
                <BsSearch className="text-[#D9D9D9] mr-2" />

                <input
                  type="text"
                  placeholder="Search by pilier, level, recommended, course name etc."
                  className="flex-1 mr-2 focus: placeholder-[#A3A3A3] text-sm"
                />
              </div>
            </div>

            <div className="flex mt-4  ml-[580px] gap-2">
              <AiOutlineAppstore className="text-[#A3A3A3] w-8 h-8" />

              <AiOutlineBars className="text-[#00778B] w-8 h-8" />
            </div>
          </div>

          <div className="p-[22px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex gap-[50px]">
                    <div className="   overflow-hidden rounded">
                      <img
                        className=" w-[152px] h-[133px] rounded object-cover object-center "
                        src={nature}
                        alt="nature"
                      />
                    </div>

                    <div className="flex flex-col ">
                      <div>
                        <div className="flex items-center">
                          <FaStar className="text-yellow-500" />
                          <span className="text-[#8C94A3] font-semibold text-sm mr-2 ml-1">
                            4.5
                          </span>
                          <span className="bg-[#FFD56A] text-[#3A3A3A] font-semibold text-xs py-1 px-2 rounded-full">
                            Technology & Innovation
                          </span>
                          <span className="bg-[#D6F5AC] text-[#000000] font-semibold text-xs py-1 px-2 rounded-full ml-2">
                            Social
                          </span>
                        </div>
                      </div>

                      <div className="flex ">
                        <div
                          className="h-[44px] w-[550px] mt-[16px]"
                          style={{
                            fontFamily: "Inter",
                            fontSize: "16px",
                            fontWeight: 700,
                            lineHeight: "22px",
                            textAlign: "left",
                          }}
                        >
                          <p>
                            Certificate in the Sustainable Development Goals,
                            Partnership, People, Planet and Prosperity
                          </p>
                        </div>
                      </div>

                      <div className="flex mt-[16px] leading-[19px]">
                        <p className="text-[16px]">
                          Trainer: Trainer Name, Trainer Name
                        </p>
                      </div>

                      <div className="flex mt-[5px]  ">
                        <p>Enrolled Companies : 05</p>
                        <p className="ml-4">Enrolled Employees : 25</p>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="w-full h-[auto] mt-[20px] border gray rounded-[10px]">
                    <div className="border-b gray h-[70px] flex  items-center pl-[20px]">
                      <h3 className="font-calibri text-[16px] font-[700]">
                        Prime Infotech
                      </h3>
                    </div>
                    <div className="border-b gray w-full h-[70px] flex justify-between items-center p-[20px]">
                      <div className="flex items-center gap-[5px]">
                        <Avatar className="">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h3>Ankites Risher</h3>
                        <Progress
                          className="ml-[78px]"
                          color="#58BA66"
                          value={33}
                        />
                      </div>

                      <div className="flex gap-[14px]">
                        <div className="flex gap-[8px]">
                          <img
                            className="w-[16px] h-[16px]"
                            src="../assets/img/Group 1000001820 (1).png"
                          />
                          <span className="text-[#58BA66]">Completed</span>
                        </div>
                        <div className="flex gap-[8px]">
                          <img
                            className="w-[16px] h-[16px]"
                            src="../assets/img/Group 1000001820 (1).png"
                          />
                          <span className="text-[#58BA66]">
                            Certificate Issued
                          </span>
                        </div>
                        <div className="flex gap-[8px]">
                          <p>Score: </p>
                          <span>10/50</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-b gray w-full h-[70px] flex justify-between items-center p-[20px]">
                      <div className="flex items-center gap-[5px]">
                        <Avatar className="">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h3>Ankites Risher</h3>
                        <Progress
                          className="ml-[78px]"
                          color="#58BA66"
                          value={33}
                        />
                      </div>

                      <div className="flex gap-[28px] items-center">
                        <div className="flex gap-[8px]">
                          <Switch />
                          <span className="text-[#A3A3A3]">Completed</span>
                        </div>
                        <div className="flex gap-[8px]">
                          <Button className="bg-[white] text-[#00778B] border border-[#00778B]">
                            Allocate Certificate
                          </Button>
                        </div>
                        <div className="flex gap-[8px]">
                          {/* <Button className="bg-[#00778B] text-[white] border border-[#00778B]">Evaluate</Button> */}

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="bg-[#00778B] text-[white] border border-[#00778B]">
                                Evaluate
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[800px]">
                              <DialogHeader>
                                <DialogTitle>Evaluate</DialogTitle>
                                <DialogDescription>
                                  Module: 1 season: 1
                                </DialogDescription>
                                <DialogDescription>
                                  Assessment : 1
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <div className="w-full h-[auto] border gray rounded-[10px] p-[15px]">
                                  <div className="flex gap-[15px]">
                                    <h3 className="text-[#606060] font-[700]">
                                      Question: 1
                                    </h3>
                                    <h3 className="text-[#606060] font-[700]">
                                      Points: 5
                                    </h3>
                                  </div>
                                  <h3 className="mt-[10px]">
                                    This is the second item's accordion body. It
                                    is hidden by default, until the collapse
                                    plugin adds the appropriate classes that we
                                    use to style each element.
                                  </h3>
                                  <h3 className="mt-[12px] text-[#606060] font-[700]">
                                    Answer
                                  </h3>
                                  <h3 className="mt-[10px]">
                                    This is the second item's accordion body. It
                                    is hidden by default.
                                  </h3>
                                  <h3 className="mt-[12px] text-[#606060] font-[700]">
                                    Keywords (Matched 40, Unmatched 10){" "}
                                  </h3>

                                  <div className="flex gap-[15px]">
                                    <a className="w-[104px] h-[32px] bg-[#D9D9D9] rounded-[30%]">
                                      Keyword one
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit">Save changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                    <div className="border-b gray w-full h-[70px] flex justify-between items-center p-[20px]">
                      <div className="flex items-center gap-[5px]">
                        <Avatar className="">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h3>Ankites Risher</h3>
                        <Progress
                          className="ml-[78px]"
                          color="#58BA66"
                          value={33}
                        />
                      </div>

                      <div className="flex gap-[28px] items-center">
                        <div className="flex gap-[8px]">
                          <Switch />
                          <span className="text-[#A3A3A3]">Completed</span>
                        </div>
                        <div className="flex gap-[8px]">
                          <Button
                            disabled
                            className="bg-[white] text-[#00778B] border border-[#00778B]"
                          >
                            Allocate Certificate
                          </Button>
                        </div>
                        <div className="flex gap-[8px]">
                          <Button
                            disabled
                            className="bg-[#00778B] text-[white] border border-[#00778B]"
                          >
                            Evaluate
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="border-b gray w-full h-[70px] flex justify-between items-center p-[20px]">
                      <div className="flex items-center gap-[5px]">
                        <Avatar className="">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h3>Ankites Risher</h3>
                        <Progress
                          className="ml-[78px]"
                          color="#58BA66"
                          value={33}
                        />
                      </div>

                      <div className="flex gap-[28px] items-center">
                        <div className="flex gap-[8px]">
                          <Switch />
                          <span className="text-[#A3A3A3]">Completed</span>
                        </div>
                        <div className="flex gap-[8px]">
                          <Button
                            disabled
                            className="bg-[white] text-[#00778B] border border-[#00778B]"
                          >
                            Allocate Certificate
                          </Button>
                        </div>
                        <div className="flex gap-[8px]">
                          <Button
                            disabled
                            className="bg-[#00778B] text-[white] border border-[#00778B]"
                          >
                            Evaluate
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="border-b gray w-full h-[70px] flex justify-between items-center p-[20px]">
                      <div className="flex items-center gap-[15px]">
                        <Button className="bg-[white] hover:bg-[#b0afaf]  w-[142px] h-[36px] text-[black] border border-black">
                          Live Season 1
                        </Button>
                        <Button className="bg-[white] hover:bg-[#b0afaf]  w-[142px] h-[36px] text-[black] border border-black">
                          Live Season 2
                        </Button>
                        <Button className="bg-[white] hover:bg-[#b0afaf] w-[142px] h-[36px] text-[black] border border-black">
                          Live Season 3
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrolledCourses;
