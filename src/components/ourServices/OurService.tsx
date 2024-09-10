import eco from "@/assets/images/eco.jpg";
import route from "@/assets/images/route.jpg";
import trackingnew from "@/assets/images/trackingnew.jpg";
import ImageCard from "./ImageCard";
import WhiteIconCard from "./WhiteIconCard";
import GradientHeading from "./GradientHeading";
import HomeHeader from "../homePage/HomeHeader";
import HomeFooter from "../homePage/HomeFooter";
import { Boxes, Component, Group, Users } from "lucide-react";

const OurService = () => {
  return (
    <>
      <HomeHeader />
      <div className="lg:my-10 sm:my-5 my-0 xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-4 py-7">
        <div className="relative">
          <GradientHeading
            headings="Services"
            blacktext="My Customer"
            pinktext="Services"
          />
        </div>

        <div>
          <h1 className="mb-3 text-left text-headingtext text-[24px] font-primary leading-[29px] font-[700]">
            Self Care
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-[20px] md:mb-12 mb-7">
            <WhiteIconCard
              imgsrc={<Boxes className="w-[40px] h-[40px]" />}
              headone="SME Company"
              textone="The company description of your business plan describes the vision and direction of the company."
            />
            <WhiteIconCard
              imgsrc={<Users className="w-[40px] h-[40px]" />}
              headone="Employee"
              textone="Employees who exhibit positive and desirable traits usually get more career growth and success. "
            />
            <WhiteIconCard
              imgsrc={<Component className="w-[40px] h-[40px]" />}
              headone="Trainer Company"
              textone="A Corporate Trainer, or Development Educator, is responsible for maintaining the standards."
            />
            <WhiteIconCard
              imgsrc={<Group className="w-[40px] h-[40px]" />}
              headone="Trainer"
              textone="Trainers are highly required in every business setting."
            />
          </div>
          <h1 className="mb-3 text-left text-headingtext text-[24px] font-primary leading-[29px] font-[700]">
            Most viewed questions
          </h1>
          <ul className="flex flex-col gap-[10px] md:mb-12 mb-7">
            <li className="text-primary text-[16px] font-[500] leading-[24px] flex gap-[5px] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clipRule="evenodd"
                />
              </svg>
              How to create an account?
            </li>
            <li className="text-primary text-[16px] font-[500] leading-[24px] flex gap-[5px] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clipRule="evenodd"
                />
              </svg>
              How to approve my BL?
            </li>
            <li className="text-primary text-[16px] font-[500] leading-[24px] flex gap-[5px] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clipRule="evenodd"
                />
              </svg>
              How to request a booking?
            </li>
            <li className="text-primary text-[16px] font-[500] leading-[24px] flex gap-[5px] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clipRule="evenodd"
                />
              </svg>
              How to modify a draft BL?
            </li>
            <li className="text-primary text-[16px] font-[500] leading-[24px] flex gap-[5px] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clipRule="evenodd"
                />
              </svg>
              How to submit my SI?
            </li>
          </ul>
          <h1 className="mb-3 text-left text-[24px] font-primary leading-[29px] font-[700]">
            Online tools
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
            <ImageCard
              imgsrc={trackingnew}
              headone="Shipment Tracking"
              textone={`all you need to do is to enter the shipment reference number to track the shipment live on a map!`}
            />
            <ImageCard
              imgsrc={eco}
              headone="Eco Calculator"
              textone="Estimate the emissions for each ones of your shipment made with OENA."
            />
            <ImageCard
              imgsrc={route}
              headone="Routing Finder"
              textone="Start preparing your shipment by checking port-to-port schedules either based on a departure or on an arrival date."
            />
          </div>
        </div>
      </div>

      <HomeFooter />
    </>
  );
};

export default OurService;
