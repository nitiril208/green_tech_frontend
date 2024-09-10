import EllipseImage from "@/assets/images/Ellipse1.png";
import EllipseImage2 from "@/assets/images/Ellipse2.png";
import EllipseImage3 from "@/assets/images/Ellipse3.png";
import { Headset, MailCheck, NotebookTabs } from "lucide-react";
import { Link } from "react-router-dom";
import HomeFooter from "./homePage/HomeFooter";
import HomeHeader from "./homePage/HomeHeader";
import GradientHeading from "./ourServices/GradientHeading";

const Contact = () => {
  return (
    <>
      <HomeHeader />
      <div className="lg:my-10 sm:my-5 my-0 xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-4 py-7 lg:h-[calc(100vh-436px)]">
        <div className="relative">
          <GradientHeading blacktext="Get in" pinktext="Touch" />
        </div>
        <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-3 sm:grid-cols-2">
          <div className="card p-3 text-center mb-2 flex flex-col justify-center items-center h-[160px] shadow-lg relative">
            <NotebookTabs />
            <h1 className="text-xl text-center leading-[19px] font-[700] font-calibri mb-[5px] pt-3 text-primary-button">
              Address
            </h1>
            <p className="text-[15px] font-nunito text-center leading-[21px] font-medium mt-[5px]">
              Main St Rush, County Dublin Rush County Dublin Ireland
            </p>
            <img
              src={EllipseImage}
              alt="ellipse"
              className="absolute bottom-0 left-0"
            />
            <img
              src={EllipseImage2}
              alt="ellipse"
              className="absolute top-0 right-0"
            />
            <img
              src={EllipseImage3}
              alt="ellipse"
              className="absolute top-0 right-0"
            />
          </div>

          <div className="card p-3 text-center mb-2 flex flex-col justify-center items-center h-[160px] shadow-lg relative">
            <Headset />
            <h1 className="text-xl text-center leading-[19px] font-[700] font-calibri mb-[5px] pt-3 text-primary-button">
              Telephone
            </h1>
            <Link
              to="tel:+353 8439314"
              className="text-[15px] font-nunito text-center leading-[21px] font-medium mt-[5px]"
            >
              +353 8439314
            </Link>
            <img
              src={EllipseImage}
              alt="ellipse"
              className="absolute bottom-0 left-0"
            />
            <img
              src={EllipseImage2}
              alt="ellipse"
              className="absolute top-0 right-0"
            />
            <img
              src={EllipseImage3}
              alt="ellipse"
              className="absolute top-0 right-0"
            />
          </div>

          <div className="card p-3 text-center mb-2 flex flex-col justify-center items-center h-[160px] shadow-lg relative">
            <MailCheck />
            <h1 className="text-xl text-center leading-[19px] font-[700] font-calibri mb-[5px] pt-3 text-primary-button">
              Email Id
            </h1>
            <Link
              to="mailto:info@goinggreen.ie"
              className="text-[15px] font-nunito text-center leading-[21px] font-medium mt-[5px]"
            >
              info@goinggreen.ie
            </Link>
            <img
              src={EllipseImage}
              alt="ellipse"
              className="absolute bottom-0 left-0"
            />
            <img
              src={EllipseImage2}
              alt="ellipse"
              className="absolute top-0 right-0"
            />
            <img
              src={EllipseImage3}
              alt="ellipse"
              className="absolute top-0 right-0"
            />
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default Contact;
