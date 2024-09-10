import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import EnrollmentCourseList from "./EnrollmentCourseList";

const EnrollmentRequestPage = () => {
  const [statusFilter, setStatusFilter] = useState("0");

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center py-3 px-5 border-b border-[#D9D9D9] md:mb-7 mb-[15px]">
        <div>
          <h6 className="text-[16px] font-semibold font-calibri pb-1">
            Enrollment Requests
          </h6>
          <p className="text-[#606060] text-[15px] font-abhaya leading-[15px]">
            Here are all the company requests to enroll in your courses
          </p>
        </div>
        <div className="flex items-center">
          <div className="md:flex hidden">
            <Select
              value={statusFilter}
              onValueChange={(e) => setStatusFilter(e)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pending" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">All</SelectItem>
                <SelectItem value="3">Pending</SelectItem>
                <SelectItem value="1">Accepted</SelectItem>
                <SelectItem value="2">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="md:hidden flex justify-end px-[15px]">
        <Select value={statusFilter} onValueChange={(e) => setStatusFilter(e)}>
          <SelectTrigger className="w-[305px]">
            <SelectValue placeholder="Pending" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">All</SelectItem>
            <SelectItem value="3">Pending</SelectItem>
            <SelectItem value="1">Accepted</SelectItem>
            <SelectItem value="2">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <EnrollmentCourseList status={statusFilter} />
    </div>
  );
};

export default EnrollmentRequestPage;
