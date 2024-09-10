import RegisterSideImage from "@/assets/images/LandingapageCompany.png";
import RunnerIcon from "@/assets/images/RunnerIcon.svg";
import { PrimaryButton } from "@/components/comman/Button/CustomButton";
import HomeFooter from "@/components/homePage/HomeFooter";
import HomeHeader from "@/components/homePage/HomeHeader";
import { QUERY_KEYS } from "@/lib/constants";
import { getImages } from "@/lib/utils";
import { enumUpadate } from "@/services/apiServices/enum";
import { UserData } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Assessment() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const UserId = useSelector((state: UserData) => state.user.UserId);

  const userId = UserId ? UserId : userData?.query?.id;

  const { mutate: EnumUpadate } = useMutation({
    mutationFn: () => enumUpadate({ path: "1" }, userId),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });

      localStorage.setItem("path", JSON.stringify(data.data.data?.pathStatus));
    },
  });

  const handleAssesment = () => {
    EnumUpadate();
    navigate("/question");
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <HomeHeader />
      <div className="mainContailner w-full m-auto !mt-4">
        <div className="grid grid-cols-2 lg:gap-[48px] gap-0 lg:px-0 px-5 sm:pb-[60px] pb-[30px]">
          {/* <div className="flex flex-row lg:gap-[48px] gap-0 lg:px-0 px-5 sm:pb-[60px] pb-[30px]"> */}
          <div className="col-span-1">
            <img
              src={RegisterSideImage}
              className="xl:min-w-[590px] min-w-full w-full h-full object-cover lg:block hidden"
              alt="RegisterSideImage"
              loading="lazy"
            />
          </div>

          <div className="w-full lg:col-span-1 col-span-full lg:block flex items-center justify-center">
            <div className="lg:my-[100px] sm:my-[60px] my-[30px] xl:mb-0">
              <div className="flex items-end gap-x-[14px]">
                <h3 className="font-abhaya sm:text-[24px] text-[22px] font-[400]">
                  Perfect. Now to jump right in…
                </h3>
                <img className="mb-[7px]" src={RunnerIcon} alt="RunnerIcon" />
              </div>

              <img className="w-[380px]" src="../assets/img/Line 23.png" />

              <p className="sm:max-w-[525px] w-full text-[16px] font-[400] font-abhaya text-[#332626] leading-[17px] mt-[22px]">
                Find how you score across 6 sustainability pillars with 30
                questions.
              </p>

              <h2 className="font-[700] sm:text-[24px] text-[22px] font-abhaya lg:mt-[63px] sm:mt-[40px] mt-[25px]">
                The 6 sustainability pillars you’ll be assessed by:
              </h2>
              {/* flex-col 2xl:flex-row gap-8 2xl: */}
              <div className="font-calibri flex items-center justify-between">
                <div>
                  <div className="flex 2xl:gap-x-[42px] gap-x-[24px] items-center mt-[24px]">
                    <div className="flex flex-col gap-y-[16px]">
                      <div className="flex gap-x-[10px] items-center font-abhaya">
                        <img
                          src={getImages("Environment", false)}
                          className=""
                          alt="Environment"
                        />
                        <p className="sm:text-base text-sm">Environment</p>
                      </div>

                      <div className="flex gap-x-[10px] items-center font-abhaya">
                        <img
                          className=""
                          src={getImages("Social", false)}
                          alt="Social"
                        />
                        <p className="sm:text-base text-sm">Social</p>
                      </div>

                      <div className="flex gap-x-[10px] items-center font-abhaya">
                        <img
                          className=""
                          src={getImages("Governance", false)}
                          alt="Governance"
                        />
                        <p className="sm:text-base text-sm">Governance</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-y-[16px]">
                      <div className="flex gap-x-[10px] items-center font-abhaya">
                        <img
                          className=""
                          src={getImages("Strategic Intergration", false)}
                          alt="Strategy"
                        />
                        <p className="sm:text-base text-sm">Strategy</p>
                      </div>

                      <div className="flex gap-x-[10px] items-center font-abhaya">
                        <img
                          className=""
                          src={getImages("Technology & Innovation", false)}
                          alt="Technology & Innovation"
                        />
                        <p className="sm:text-base text-sm">
                          Technology & Innovation
                        </p>
                      </div>
                      <div className="flex gap-x-[10px] items-center font-abhaya">
                        <img
                          className=""
                          src={getImages("Economic", false)}
                          alt="Economic"
                        />
                        <p className="sm:text-base text-sm">Economic</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div>
                <img
                  src="../assets/img/Group 60.png"
                  className="w-full"
                  alt="img"
                  loading="lazy"
                />
              </div> */}
              </div>

              <PrimaryButton
                onClick={handleAssesment}
                name="Start Now"
                className="sm:w-[266px] w-[200px] primary-background  sm:h-[55px] h-[50px] md:mt-[57px] sm:mt-[45px] mt-[35px] sm:text-[20px] text-lg !font-calibri"
              />
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
}

export default Assessment;
