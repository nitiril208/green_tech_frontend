import employee_face_1 from "@/assets/images/face_1.jfif";
import employee_face_2 from "@/assets/images/face_2.jfif";
import employee_face_3 from "@/assets/images/face_3.jfif";
import employee_face_4 from "@/assets/images/face_4.jfif";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import SessionEmployeeItem from "./SessionEmployeeItem";

const SessionModalDetails = () => {
  const sessionEmpoyee = [
    {
      image: employee_face_1,
      empoyeeName: "Ankites Risher",
    },
    {
      image: employee_face_2,
      empoyeeName: "Liam Risher",
    },
    {
      image: employee_face_3,
      empoyeeName: "Honey Risher",
    },
    {
      image: employee_face_4,
      empoyeeName: "Honey Risher",
    },
    {
      image: employee_face_1,
      empoyeeName: "Ankites Risher",
    },
    {
      image: employee_face_2,
      empoyeeName: "Liam Risher",
    },
    {
      image: employee_face_3,
      empoyeeName: "Honey Risher",
    },
    {
      image: employee_face_4,
      empoyeeName: "Honey Risher",
    },
  ];
  return (
    <div>
      <div className="">
        <h3 className="text-2xl font-calibri font-bold pb-5">Live Session</h3>
        <h5 className="pb-2.5 font-calibri text-base font-bold">
          Live session title goes here
        </h5>
        <h6 className="pb-2.5 font-calibri text-base">
          Session subtitle goes here
        </h6>
        <h6 className="pb-2.5 font-calibri text-base">
          Trainer : Trainer Name Here
        </h6>
        <div className="flex pb-5">
          <h5 className="pe-5 text-[#606060] font-calibri text-base">
            Start Date: <span className="text-black">10/04/2024</span>
          </h5>
          <h5 className="pe-5 text-[#606060] font-calibri text-base">
            Start Time: <span className="text-black">11:00AM</span>
          </h5>
          <h5 className="font-calibri text-[#606060] text-base">
            Duration: <span className="text-black">1:30 Hours</span>
          </h5>
        </div>
        <h4 className="pb-3 font-calibri text-base font-bold">
          Employee Attendance
        </h4>
        <ScrollArea className="h-[300px]">
          {sessionEmpoyee.map((data, index) => {
            return <SessionEmployeeItem key={index} data={data} />;
          })}
        </ScrollArea>
        <div className="mt-5 text-right">
          <Button className=" text-base font-calibri text-white bg-[#58BA66] py-6 px-8">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionModalDetails;
