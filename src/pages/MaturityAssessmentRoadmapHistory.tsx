
import { Card, CardHeader,  CardDescription } from '@/components/ui/card';
import person from "@/assets/images/person.png";
import { IoCloseCircleOutline } from "react-icons/io5";


function MaturityAssessmentRoadmapHistory() {


    return (
        <div className="flex justify-center items-center h-screen">

            <Card className="w-[514px] h-[494px] ">
                <div className=''>
                    <div className='flex w-[514px] h-[30px] mt-[10px]'>
                        <div className=' text-[16px] w-[400px] font-semibold mt-[10px] ml-[25px]'>Action Item History</div>
                        <div className='ml-[55px]  '><IoCloseCircleOutline className='h-[24px] w-[24px]' /></div>
                    </div>

                    <CardHeader>
                        <CardDescription>

                            <div className='w-[450px] text-[20px] font-semibold text-[#000000]'>Lead in energy efficiency through continuous optimization and strategic energy management.</div>
                            <div className="flex mt-[20px] w-[350px] h-[55px]">
                                <img src={person} alt="person" className="w-[32px] h-[32px] rounded-full mr-2" />
                                <div className="flex flex-col">
                                    <span className="text-[16px] mt-[5px] text-[#000000]">Michel Johnsaon, <span className='text-[12px] text-[#A3A3A3]'>3 Min ago</span></span>
                                    <span className="text-[13px] mt-[5px] text-[#000000] ">Marked as completed (Previous state - in progress) </span>
                                </div>

                            </div>
                            <div className="flex mt-[20px] w-[350px] h-[55px]">
                                <img src={person} alt="person" className="w-[32px] h-[32px] rounded-full mr-2" />
                                <div className="flex flex-col">
                                    <span className="text-[16px] mt-[5px] text-[#000000]">Michel Johnsaon, <span className='text-[12px] text-[#A3A3A3]'>3 Min ago</span></span>
                                    <span className="text-[13px] mt-[5px] text-[#000000] ">Uploaded evidence </span>
                                </div>

                            </div>
                            <div className="flex mt-[20px] w-[370px] h-[55px]">
                                <img src={person} alt="person" className="w-[32px] h-[32px] rounded-full mr-2" />
                                <div className="flex flex-col">
                                    <span className="text-[16px] mt-[5px] text-[#000000]">Michel Johnsaon, <span className='text-[12px] text-[#A3A3A3]'>3 Min ago</span></span>
                                    <span className="text-[13px] mt-[5px] text-[#000000] ">Assigned to Michel Johnson (Original assignee - None) </span>
                                </div>

                            </div>
                            <div className="flex mt-[20px] w-[370px] h-[55px]">
                                <img src={person} alt="person" className="w-[32px] h-[32px] rounded-full mr-2" />
                                <div className="flex flex-col">
                                    <span className="text-[16px] mt-[5px] text-[#000000]">Michel Johnsaon, <span className='text-[12px] text-[#A3A3A3]'>30 Min ago</span></span>
                                    <span className="text-[13px] mt-[5px] text-[#000000] ">Assigned Start Date: 17/04/2024, End Date: 18/04/2024 </span>
                                </div>

                            </div>
                            <div className="flex mt-[20px] w-[370px] h-[55px]">
                                <img src={person} alt="person" className="w-[32px] h-[32px] rounded-full mr-2" />
                                <div className="flex flex-col">
                                    <span className="text-[16px] mt-[5px] text-[#000000]">Michel Johnsaon, <span className='text-[12px] text-[#A3A3A3]'>30 Min ago</span></span>
                                    <span className="text-[13px] mt-[5px] text-[#000000] ">Action Item Created </span>
                                </div>

                            </div>
                        </CardDescription>
                        



                    </CardHeader>
                    
                </div>


            </Card>
        </div>



    );
}

export default MaturityAssessmentRoadmapHistory;
