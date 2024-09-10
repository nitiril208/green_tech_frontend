import HomeBannerImage from "@/assets/images/HomeBanner.png";
import HomeBg from "@/assets/images/homeBgsocial.png";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getHomeBanner } from "@/services/apiServices/bannerSlider";
import { GetHomeBannerResponse } from "@/types/banner";
import { useQuery } from "@tanstack/react-query";
import { SecondaryButton } from "../comman/Button/CustomButton";
import Loader from "../comman/Loader";

const HomeBanner = () => {
  const { clientId } = useAppSelector((state) => state.user);
  const { data: clientwiseBannerList, isPending: clientwiseBannerListPending } =
    useQuery<GetHomeBannerResponse>({
      queryKey: [QUERY_KEYS.clientwiseBannerSlider],
      queryFn: () => getHomeBanner(clientId?.toString(), "Active"),
      enabled: !!clientId,
    });

  return (
    <>
      <div>
        {clientwiseBannerListPending ? (
          <Loader />
        ) : (
          clientwiseBannerList?.data?.map((item) => {
            return (
              <div className="relative">
                {/* <div
                    style={{
                      backgroundImage: `url(${item.banner})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right",
                    }}
                    className=" md:block hidden w-full xl:h-[610px] md:h-[480px] h-[810px]"
                  ></div> */}
                <img
                  className="w-full xl:h-[610px] md:h-[480px] h-[810px] object-cover"
                  src={HomeBg}
                />
                {/* <img
                  className="lg:hidden block w-full xl:h-[610px] md:h-[480px] h-[610px]"
                  src={HomeBg}
                /> */}
                <div className="xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-5 ">
                  <div className="absolute top-[35%] -translate-y-[35%] md:left-auto md:right-auto md:m-0 left-0 right-0 m-auto">
                    {" "}
                    <div className="flex items-center justify-around md:flex-row flex-col w-full">
                      <div className="xl:max-w-[650px] md:max-w-[450px] max-w-full w-full flex flex-col md:gap-y-10 gap-y-10">
                        <div className="md:bg-transparent bg-[#1a5762] md:shadow-none rounded-lg shadow-md md:py-0 md:px-0 py-5 px-4 md:m-0 m-5 mt-0">
                          <h6 className="md:text-[36px] text-[24px] font-bold secondary-text font-UniNeue xl:mb-5 sm:mb-4 mb-2.5 sm:max-w-[450px] w-full md:leading-10 leading-8">
                            {item.title}
                          </h6>
                          <p className="sm:w-[500px] w-full font-medium secondary-text md:text-lg text-base font-Droid-Regular line-clamp-3 leading-5 xl:mb-10 sm:mb-5 mb-2.5">
                            {item.content}
                          </p>
                          <SecondaryButton
                            name={item.primaryButtonTitle}
                            href={item.primaryButtonUrl}
                            onClick={() => {
                              const element =
                                document.getElementById("company");
                              var headerOffset = 168;
                              var elementPosition =
                                // @ts-ignore
                                element.getBoundingClientRect().top;
                              var offsetPosition =
                                elementPosition +
                                window.pageYOffset -
                                headerOffset;

                              window.scrollTo({
                                top: offsetPosition,
                                behavior: "smooth",
                              });
                            }}
                            symbol={
                              <img
                                src="../assets/img/Move Right.png"
                                className="md:w-[26px] md:h-[26px] w-[15px] h-[15px]"
                              />
                            }
                            className="xl:w-[278px] w-[258px] xl:h-[59px] md:h-[50px] h-7 flex gap-[10px] justify-center items-center rounded-[4px] md:text-lg text-sm font-semibold font-abhaya !bg-[#75BD43]"
                            // isLink={!!item?.primaryButtonUrl}
                          />
                          <SecondaryButton
                            name={item.secondaryButtonTitle}
                            href={item.secondaryButtonUrl}
                            onClick={() => {
                              const element =
                                document.getElementById("trainer");
                              var headerOffset = 168;
                              var elementPosition =
                                // @ts-ignore
                                element.getBoundingClientRect().top;
                              var offsetPosition =
                                elementPosition +
                                window.pageYOffset -
                                headerOffset;

                              window.scrollTo({
                                top: offsetPosition,
                                behavior: "smooth",
                              });
                            }}
                            symbol={
                              <img
                                src="../assets/img/Move Right.png"
                                className="md:w-[26px] md:h-[26px] w-[15px] h-[15px]"
                              />
                            }
                            className="xl:w-[278px] w-[258px] xl:h-[59px] md:h-[50px] h-7 xl:mt-[2.5rem] sm:mt-[20px] mt-2.5 flex gap-[10px] justify-center items-center rounded-[4px] md:text-lg text-sm font-semibold font-abhaya !bg-[#75BD43]"
                            // isLink={!!item?.secondaryButtonUrl}
                          />
                        </div>
                        <div className="sm:hidden block">
                          <img
                            className="xl:max-w-full xl:max-h-full md:max-h-[460px] max-h-[260px] w-auto mx-auto"
                            src={HomeBannerImage}
                            alt={"HomeBannerImage"}
                          />
                        </div>
                        <div className="md:bg-transparent bg-[#1a5762] md:shadow-none shadow-md text-[#ACEBF5] text-[18px] flex md:flex-row flex-col md:items-center items-start md:gap-1 sm:gap-3 gap-6 md:py-0 md:px-0 py-5 px-4">
                          <div className="flex md:gap-1 gap-3 items-center">
                            <div>
                              <img
                                src="../assets/img/Arrow Right (1).png"
                                className="w-5 h-5"
                              />
                            </div>

                            <h3 className="text-[14px] font-medium font-d-din-pro leading-5">
                              One Platform To Advance Sustainability
                            </h3>
                          </div>
                          <div className="flex md:gap-1 gap-3 items-center">
                            <div>
                              <img
                                src="../assets/img/Arrow Right (1).png"
                                className="w-5 h-5"
                              />
                            </div>

                            <h3 className="text-[14px] font-medium font-d-din-pro leading-5">
                              Get The Guidance You Need
                            </h3>
                          </div>
                          <div className="flex md:gap-1 gap-3 items-center">
                            <div>
                              <img
                                src="../assets/img/Arrow Right (1).png"
                                className="w-5 h-5"
                              />
                            </div>

                            <h3 className="text-[14px] font-medium font-d-din-pro leading-5">
                              Achieve Your Green Aspirations
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="sm:block hidden">
                        <img
                          className="xl:max-w-full max-w-[530px] xl:max-h-full md:max-h-[460px] max-h-[260px] w-full"
                          src={HomeBannerImage}
                          alt={"HomeBannerImage"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default HomeBanner;
