import lightOn from "@/assets/images/LightOn.png";
import nature from "@/assets/images/nature.png";
import neighbour from "@/assets/images/Neighbour.png";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineGroup } from "react-icons/md";

function CoursesEmrolledToEmployeeInvitePopup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    details: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      details: "",
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Card className="bg-white rounded-lg p-6 h-[640px] w-[800px] ">
        <div className=" border-b-2 pb-[10px]">
          <div className="flex overflow-hidden rounded">
            <img
              className="w-[204px] h-[189px] rounded object-cover object-center"
              src={nature}
              alt="Course"
            />

            <div className="flex flex-col ml-[15px]">
              <div className="flex items-center justify-between">
                <span className="text-[#1D2026] text-xl font-bold">
                  Certificate in the Sustainable Development Goals, Partnership,
                  People, Planet and Prosperit
                </span>
                <IoCloseCircleOutline className=" cursor-pointer h-[50px] w-[50px] pb-[20px] ml-[15px]" />
              </div>

              <div className="flex items-center mt-[10px] ml-[2px]">
                <FaStar className="text-[#FD8E1F]" />
                <span className="text-[#8C94A3] font-semibold text-sm mr-2 ml-1">
                  RECOMMENDED
                </span>
                <p className="ml-[10px]">
                  <img
                    className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]"
                    src={neighbour}
                    alt="Image Alt Text"
                  />
                  Social
                </p>
                <p className="ml-[10px]">
                  <img
                    className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]"
                    src={lightOn}
                    alt="Image Alt Text"
                  />
                  Technology & Innovation
                </p>
              </div>

              <div className="flex items-center mt-[10px] ml-[2px]">
                <FaStar className="text-[#FBBC04] w-[12px] h-[11px]" />
                <span className="text-[black] font-bold text-sm mr-2 ml-1">
                  4.5
                </span>
                <MdOutlineGroup className="w-[12px] h-[11px] ml-[20px]" />
                <p className="ml-[10px] text-[#A3A3A3] text-[13px]">
                  15 Employee
                </p>
              </div>

              <div className="flex mt-[15px]">
                <div className="h-[22px] w-[129px] flex items-center gap-1">
                  <img
                    className=" h-[16] w-[18px]"
                    src="public/assets/img/timer.png"
                    alt="Course"
                  />
                  <p className="text-xs">Level- Advanced</p>
                </div>

                <div className="h-[22px] w-[160px] flex items-center gap-1">
                  <img
                    className=" h-[16] w-[18px] text-black"
                    src="public/assets/img/diploma.png"
                    alt="Course"
                  />
                  <p className="text-xs">Post Graduate Diploma</p>
                </div>

                <div className="h-[22px] w-[80px] flex items-center gap-1">
                  <img
                    className=" h-[16] w-[18px]"
                    src="public/assets/img/fulltime.png"
                    alt="Course"
                  />
                  <p className="text-xs">Full Time</p>
                </div>

                <div className="h-[22px] w-[75px] flex items-center gap-1">
                  <img
                    className=" h-[16] w-[18px]"
                    src="public/assets/img/online.png"
                    alt="Course"
                  />
                  <p className="text-xs">Online</p>
                </div>

                <div className="h-[22px] w-[80px] flex items-center gap-1">
                  <img
                    className=" h-[16] w-[18px]"
                    src="public/assets/img/time.png"
                    alt="Course"
                  />
                  <p className="text-xs">2 Years</p>
                </div>
              </div>

              <div className=" mt-[15px]">
                <div className="h-[22px] w-[200px] flex items-center gap-1">
                  <img
                    className=" h-[16] w-[18px]"
                    src="public/assets/img/unversity.png"
                    alt="Course"
                  />
                  <p className="text-xs">Atlantic Technological University</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-[10px]">
          <h2 className="text-[15px] mb-2 ml-[px] font-bold">
            Invite Team Member
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex">
            <div className="mr-4">
              <label htmlFor="lastName" className="block mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="border border-[#D9D9D9] rounded px-3 py-2 w-[370px] placeholder-[#A3A3A3] focus:border focus:border-[#4b4b4b] shadow-none outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="firstName" className="block mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="border border-[#D9D9D9] rounded px-3 py-2 w-[370px] placeholder-[#A3A3A3] focus:border focus:border-[#4b4b4b] shadow-none outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block mb-1">
              Team Member Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email id"
              className="border border-[#D9D9D9] rounded px-3 py-2 w-full placeholder-[#A3A3A3] focus:border focus:border-[#4b4b4b] shadow-none outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="details" className="block mb-1">
              Invitation Details
            </label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Enter Details"
              className="border border-[#D9D9D9] rounded px-3 py-2 w-full h-[100px] placeholder-[#A3A3A3]"
              rows={4}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ml-[630px] font-abhaya"
          >
            Send Invite
          </button>
        </form>
      </Card>
    </div>
  );
}

export default CoursesEmrolledToEmployeeInvitePopup;
