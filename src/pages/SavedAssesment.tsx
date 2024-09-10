import RegisterSideImage from "@/assets/images/LandingapageCompany.png";
import RunnerIcon from "@/assets/images/RunnerIcon.svg";
import Loader from "@/components/comman/Loader";
import HomeFooter from "@/components/homePage/HomeFooter";
import HomeHeader from "@/components/homePage/HomeHeader";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getImages } from "@/lib/utils";
import { enumApi } from "@/services/apiServices/enum";
import { getPillerWiseProgress } from "@/services/apiServices/pillar";
import { PillerWiseProgressResponse } from "@/types/Pillar";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SavedAssesment() {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  const { UserId, clientId } = useAppSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);

  const userID = UserId
    ? UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;
  const { data, isPending } = useQuery<PillerWiseProgressResponse>({
    queryKey: [QUERY_KEYS.clientwisePillarList],
    queryFn: () => getPillerWiseProgress(clientId, userID),
  });

  // const { data: pillarList } = useQuery({
  //   queryKey: [QUERY_KEYS.pillarList],
  //   queryFn: () => fetchClientwisePillarList(clientId),
  // });

  // useEffect(() => {
  //   const pillarName = pillarList?.data?.data?.map((i: any) => i?.pillarName);

  //   if (allPillar?.length) {
  //     dispatch(setPillarName(pillarName));
  //   }
  // }, [allPillar, dispatch, pillarList?.data?.data]);

  const { data: enums } = useQuery({
    queryKey: [QUERY_KEYS.authenums],
    queryFn: () => enumApi(UserId),
  });

  const handleAssesment = () => {
    const pathStatus = enums?.data.data.pathStatus;

    switch (pathStatus) {
      case 1:
        navigate("/question");
        break;
      case 2:
        navigate("/score");
        break;
      case 3:
        navigate("/companyregister");
        break;
      case 4:
        navigate("/maturelevel");
        break;
      case 5:
        navigate("/selectlevel");
        break;
      case 6:
        navigate("/maturitylevelactionitem");
        break;
      default:
        navigate("/savedassesment");
        break;
    }
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
      <div className="mainContailner w-full m-auto !my-4">
        <div className="flex flex-row xl:gap-[48px] gap-5">
          <div>
            <img
              src={RegisterSideImage}
              className="xl:min-w-[590px] min-w-[490px] w-full h-auto"
              alt="RegisterSideImage"
              loading="lazy"
            />
          </div>
          <div className="w-full xl:mb-[40px] mb-0">
            <div className="xl:mt-[40px] xl:mb-0 mb-[30px]">
              <div className=" w-[430px] ">
                <div className="flex items-end justify-between gap-x-[14px]">
                  <h3 className="font-abhaya text-[24px] font-[400]">
                    Why, nice to have you back
                  </h3>
                  <img className="mb-[7px]" src={RunnerIcon} alt="RunnerIcon" />
                </div>
                <img src="../assets/img/Line 23.png" />
              </div>

              <p className="mt-[20px] w-[430px]">
                There's just some quenstions lefts to get your Sustainability
                Score. but you're merrily on the way there...
              </p>
              <p className="text-[Calibri] font-abhaya text-[#3A3A3A xl:mt-[50px] mt-[20px] text-[24px]">
                {" "}
                What's left for you to complete:
              </p>
              <div className="xl:pt-8 pt-4 pl-[px] pb-5 flex flex-wrap gap-5">
                {isPending ? (
                  <Loader />
                ) : (
                  data?.data &&
                  data?.data?.length > 0 &&
                  data?.data
                    .sort((a, b) => {
                      if (a.pillarName < b.pillarName) return -1;
                      if (a.pillarName > b.pillarName) return 1;
                      return 0;
                    })
                    .map((category, index: number) => {
                      return (
                        <div className="">
                          <div
                            key={index}
                            className="border border-solid border-[#D9D9D9] xl:w-[223.4px] w-[150px] h-[150px] rounded-[14.06px] flex flex-col  items-center p-3"
                          >
                            <div>
                              <img
                                src={getImages(category.pillarName)}
                                alt="img"
                                className="xl:w-[52px] xl:h-[52px] w-[30px] h-[30px]"
                              />
                            </div>
                            <h4 className="xl:text-[16px] text-[14px] mt-3 text-center xl:min-h-[auto] min-h-[42px]">
                              {category.pillarName}
                            </h4>

                            <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold ">
                              {category?.progress.toFixed()} %
                            </span>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>

              <Button
                onClick={handleAssesment}
                className="bg-[#64A70B] w-[266px] h-[50px]  text-[20px] mt-[20px]"
              >
                Continue My Assessment
              </Button>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
}

export default SavedAssesment;
