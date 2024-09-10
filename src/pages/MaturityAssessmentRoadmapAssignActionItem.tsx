
import { Card } from '@/components/ui/card';

import { IoCloseCircleOutline } from "react-icons/io5";
import { GoChevronDown } from "react-icons/go";

function MaturityAssessmentRoadmapAssignActionItem() {


    return (
        <div className="flex justify-center items-center h-screen">

            <Card className="w-[417px] h-[410px] ">
                <div className=''>
                    <div className='flex w-[417px] h-[30px] mt-[10px] '>
                        <div className=' text-[16px] w-[240px] font-semibold mt-[10px] ml-[25px]'>Assign Action Item</div>
                        <div className='ml-[120px]  '><IoCloseCircleOutline className='h-[24px] w-[24px]' /></div>
                    </div>
                    <div className='mt-[20px] ml-[25px] h-[83px] w-[363px]'>
                        <div>
                            <div className="container mx-auto p-4">
                                <div className="mb-4">
                                    <label className="block mb-1">Select Team member</label>
                                    <div className="relative">
                                        <select className="p-2 border border-[#D9D9D9] rounded w-full text-[#D9D9D9] appearance-none">
                                            <option value="" >Select Team member</option>
                                            <option value="">Select Team 2</option>
                                            <option value="">Select Team 3</option>
                                            {/* Add options here */}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <GoChevronDown className="h-4 w-4 text-balck-400" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Start Date</label>
                                    <input type="date" className="p-2 border border-[#D9D9D9] rounded w-full  text-[#D9D9D9] " placeholder="Enter Start Date" />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">End Date</label>
                                    <input type="date" className="p-2 border border-[#D9D9D9] rounded w-full  text-[#D9D9D9]" placeholder="Enter Start Date" />
                                </div>
                                <button className="bg-[#58BA66] text-white font-semibold py-3 px-5 rounded  ml-[240px]">

                                    Assign
                                </button>
                            </div>

                        </div>

                    </div>

                </div>

            </Card >
        </div >



    );
}

export default MaturityAssessmentRoadmapAssignActionItem;

