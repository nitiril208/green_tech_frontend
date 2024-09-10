import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const TrainingProviders = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#F7F8FC] py-10">
      <div
        id="trainer"
        className="xl:max-w-[1172px] max-w-full w-full mx-auto xl:px-0 px-5"
      >
        <h6 className="md:text-4xl sm:text-3xl text-2xl font-UniNeue font-semibold text-center sm:pb-14 pb-[30px]">
          Get your training to those it’ll help
        </h6>
        {/* <div className="w-[250px] h-[47px] button-color rounded-[6px] flex justify-center items-center mb-[44px]">
          <p className="font-extrabold xl:text-2xl text-xl leading-5 traking-[-4%] text-color font-abhaya">
            For Training Providers
          </p>
        </div>
        <h3 className="font-bold md:text-2xl sm:text-xl text-lg font-abhaya sm:leading-7 leading-5">
          Get your training to those it’ll help
        </h3> */}
        <div className="gap-10 flex items-center justify-center flex-wrap xl:gap-y-14 md:gap-y-10 sm:gap-y-5 gap-y-3">
          <div className="flex sm:gap-[20px] gap-2 relative text-start w-[360px]">
            <div className="min-w-[56px] w-[56px] min-h-[56px] h-[56px] bg-[#00778B] rounded-full flex justify-center items-center">
              <img className="w-9 h-9" src="../assets/img/Satellites.png" />
            </div>

            <div className="">
              <h3 className="text-lg font-d-din-pro font-semibold leading-5">
                Reach An Ireland-Wide Audience
              </h3>
              <p className="mt-[8px] leading-[18px] text-base font-bold traking-[-4%] font-Droid-Regular text-[#4E5566] line-clamp-3">
                You’re never limited by your geography, reach a national
                sustainability-ready audience.
              </p>
            </div>
          </div>
          <div className="flex sm:gap-[20px] gap-2 relative  text-start w-[360px]">
            <div className="min-w-[56px] w-[56px] min-h-[56px] h-[56px] bg-[#00778B] rounded-full flex justify-center items-center">
              <img className="w-9 h-9" src="../assets/img/Class (1).png" />
            </div>
            <div className="">
              <h3 className="text-lg font-d-din-pro font-semibold leading-5">
                Deliver Your Courses With Ease
              </h3>
              <p className="mt-[8px] leading-[18px] text-base font-bold traking-[-4%] font-Droid-Regular text-[#4E5566] line-clamp-3">
                The built-in learning management system enables you to focus on
                your content, and we’ll take care of the delivery and
                route-to-market
              </p>
            </div>
          </div>
          <div className="flex sm:gap-[20px] gap-2 relative  text-start w-[360px]">
            <div className="min-w-[56px] w-[56px] min-h-[56px] h-[56px] bg-[#00778B] rounded-full flex justify-center items-center">
              <img
                className="w-9 h-9"
                src="../assets/img/People Working Together (1).png"
              />
            </div>
            <div className="">
              <h3 className="text-lg font-d-din-pro font-semibold leading-5">
                Engage & Collaborate With Trainers
              </h3>
              <p className="mt-[8px] leading-[18px] text-base font-bold traking-[-4%] font-Droid-Regular text-[#4E5566] line-clamp-3">
                On our marketplace-oriented platform.
              </p>
            </div>
          </div>
          <div className="flex sm:gap-[20px] gap-2 relative  text-start w-[360px]">
            <div className="min-w-[56px] w-[56px] min-h-[56px] h-[56px] bg-[#00778B] rounded-full flex justify-center items-center">
              <img
                className="w-9 h-9"
                src="../assets/img/Website Analytics (1).png"
              />
            </div>
            <div className="">
              <h3 className="text-lg font-d-din-pro font-semibold leading-5">
                Gain Strategic Insights Via Analytics
              </h3>
              <p className="mt-[8px] leading-[18px] text-base font-bold traking-[-4%] font-Droid-Regular text-[#4E5566] line-clamp-3">
                Hone your training using our targeted analytics that reports on
                learner performance and market demand.
              </p>
            </div>
          </div>
        </div>
        <Button
          type="button"
          variant={"default"}
          onClick={() => navigate("/trainer-regestration")}
          className="rounded-[4px] flex justify-center items-center text-left gap-[10px] text-lg font-extrabold font-abhaya m-auto w-[278px] sm:h-[59px] h-[44px] bg-[#75BD43] secondary-text md:mt-8 mt-6"
        >
          <div>Register As A Trainer Now</div>
          <div>
            <img className="" src="../assets/img/Move Right.png" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default TrainingProviders;
