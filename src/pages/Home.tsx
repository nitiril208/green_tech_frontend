import titleCircle from "@/assets/images/title_de.svg";
import Header from "@/components/Header";
import Accordions from "@/components/comman/Accordions";
import { SecondaryButton } from "@/components/comman/Button/CustomButton";
import Loading from "@/components/comman/Error/Loading";
import Symbol from "@/components/comman/symbol/Symbol";
import AccordionAnswer from "@/components/homePage/AccordionAnswer";
import AccordionQuestion from "@/components/homePage/AccordionQuestion";
import HomeFooter from "@/components/homePage/HomeFooter";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setClientId } from "@/redux/reducer/CompanyReducer";
import { getHomeBanner } from "@/services/apiServices/bannerSlider";
import {
  fetchDataByClientwise,
  getCourseSlider,
} from "@/services/apiServices/courseSlider";
import { fetchfaqdata } from "@/services/apiServices/faq";
import {
  GetHomeBannerResponse,
  HomeCourseSlidersResponse,
} from "@/types/banner";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import Slider from "react-slick";

function Home() {
  const { data: getallfaq, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.fetchfaqquestion],
    queryFn: () => fetchfaqdata(),
  });

  const accordionItems: any =
    getallfaq &&
    getallfaq?.data?.map((item) => {
      return {
        title: <AccordionQuestion data={item} />,
        content: <AccordionAnswer data={item} />,
      };
    });
  const dispatch = useAppDispatch();
  const { clientId } = useAppSelector((state) => state.user);

  const domain = document.location.origin;

  const { data: fetchByClientwise, isPending: fetchByClientwisePending } =
    useQuery({
      queryKey: [QUERY_KEYS.fetchDataByClientwise],
      queryFn: () => fetchDataByClientwise(domain),
      // queryFn: () => fetchDataByClientwise("weidev.clay.in"),
    });

  useEffect(() => {
    if (fetchByClientwise?.data?.data) {
      dispatch(setClientId(fetchByClientwise?.data?.data?.id));
    }
  }, [dispatch, fetchByClientwise?.data?.data]);

  const { data: clientwiseBannerList, isPending: clientwiseBannerListPending } =
    useQuery<GetHomeBannerResponse>({
      queryKey: [QUERY_KEYS.clientwiseBannerSlider, { clientId }],
      queryFn: () => getHomeBanner(clientId?.toString(), "Active"),
      enabled: !!clientId,
    });

  const {
    data: clientwiseCourseslider,
    isPending: clientwiseCoursesliderPending,
  } = useQuery<HomeCourseSlidersResponse>({
    queryKey: [QUERY_KEYS.clientwiseCourseSlider, clientId],
    queryFn: () => getCourseSlider(clientId.toString(), "Active"),
    enabled: !!clientId,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    prevArrow: (
      <div className="hidden sm:block">
        <GrPrevious />
      </div>
    ),
    nextArrow: (
      <div className="hidden sm:block">
        <GrNext />
      </div>
    ),
  };

  const bannerSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  const data = [
    {
      image: "../assets/img/Tree Planting.png",
      title: "Enviroment",
      discription:
        "Minimize your environmental footprint and promote eco-friendly practices.",
      background: "bg-[#F9F9F9]",
    },
    {
      image: "../assets/img/Neighbour.png",
      title: "Social",
      discription:
        "Create a workplace that fosters social responsibility and inclusivity.",
      background: "bg-[#F9F9F9]",
    },
    {
      image: "../assets/img/Weak Financial Growth.png",
      title: "Economic",
      discription:
        "Achieve financial sustainability while contributing to the local economy.",
      background:
        "bg-gradient-to-r from-white from-44% via-transparent via-30% to-[#ebeaea]",
    },
    {
      image: "../assets/img/Morale.png",
      title: "Governance",
      discription: "Ensure transparent and ethical business practices.",
      background: "bg-[#F1EFEF]",
    },
    {
      image: "../assets/img/Light On.png",
      title: "Technology & Innovation ",
      discription:
        "Embrace innovation to stay ahead in the ever-evolving world of sustainability.",
      background:
        "bg-gradient-to-r from-[#ebeaea] from-44% via-transparent via-30% to-white",
    },
    {
      image: "../assets/img/Path Steps.png",
      title: "Strategic Integration",
      discription:
        "Strategic planning is key to sustainable, resilient foundations.",
      background: "bg-[#F9F9F9]   ",
    },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="h-[auto] w-full">
      <Header />
      <section className="w-full">
        <div className="relative overflow-hidden mx-auto ">
          <Slider {...bannerSetting}>
            {clientwiseBannerList?.data?.map((item) => {
              return (
                <div className="relative">
                  <img
                    className="w-full xl:h-[610px] lg:h-[480px] h-[410px]"
                    src={item.banner}
                  />
                  <div className="absolute top-[40%] -translate-y-[40%] max-w-[711px] w-full max-h-[262px] h-full backdrop-blur-[20px] backdrop-saturate-[200%] bg-[rgba(255,255,255,0.26)] border rounded-r-xl border-solid border-[rgba(209,213,219,0.3)]">
                    <div className="flex text-white">
                      <div className="w-[200px] flex justify-center">
                        <img
                          className="mt-[42px] w-[42px] h-[42px]"
                          src="../assets/img/Forward (1).png"
                        />
                      </div>

                      <div className="mt-[34px]">
                        <h2 className="text-[28px] font-[700] secondary-text font-UniNeue">
                          {item.title}
                        </h2>
                        <p className="w-[380px] mt-[5px] secondary-text text-lg font-calibri font-light line-clamp-2">
                          {item.content}
                        </p>
                        <SecondaryButton
                          name={item.primaryButtonTitle}
                          href={item.primaryButtonUrl}
                          symbol={<img src="../assets/img/Move Right.png" />}
                          className="w-[250px] h-[50px] mt-[20px] flex gap-[10px] justify-center items-center "
                          isLink
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-[69px] backdrop-blur-[20px] absolute bottom-0 backdrop-saturate-[200%] bg-[rgba(255,255,255,0.26)] border  border-solid border-[rgba(209,213,219,0.3)] secondary-text text-[18px] flex justify-center items-center gap-[20px]">
                    <h3 className="xl:text-lg text-base font-bold font-UniNeue">
                      ENGAGE
                    </h3>
                    <div>
                      <img src="../assets/img/Arrow Right (1).png" />
                    </div>

                    <h3 className="xl:text-lg text-base font-bold font-UniNeue">
                      ASSESS
                    </h3>
                    <div>
                      <img src="../assets/img/Arrow Right (1).png" />
                    </div>

                    <h3 className="xl:text-lg text-base font-bold font-UniNeue">
                      SET TARGETS
                    </h3>
                    <div>
                      <img src="../assets/img/Arrow Right (1).png" />
                    </div>

                    <h3 className="xl:text-lg text-base font-bold font-UniNeue">
                      LEARN
                    </h3>
                    <div>
                      <img src="../assets/img/Arrow Right (1).png" />
                    </div>

                    <h3 className="xl:text-lg text-base font-bold font-UniNeue">
                      APPLY
                    </h3>
                    <div>
                      <img src="../assets/img/Arrow Right (1).png" />
                    </div>

                    <h3 className="xl:text-lg text-base font-bold font-UniNeue">
                      ATTAIN PROFICIENCY
                    </h3>

                    <div>
                      <img src="../assets/img/Arrow Right (1).png" />
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>

      <section>
        <div className="relative flex flex-wrap w-full h-[auto] mx-0 justify-center">
          <div className="sm:block hidden w-1/5 bg-[#64A70B] relative h-[259px]">
            <div className="text-white flex justify-end pr-3 pt-6">
              <p className="xl:w-[190px] w-[150px] font-[400] xl:text-2xl text-lg leading-7 tracking-[1px] secondary-text font-UniNeue text-white">
                Start your Sustainability journey with firm foundations
              </p>
            </div>
            <div className="absolute bottom-3 right-2">
              <img
                className="w-[62px] h-[76px] block"
                src="../assets/img/Voltage.png"
              />
            </div>
          </div>
          <div className="w-4/5 grid xl:grid-cols-6 grid-cols-4">
            {data.map((v, i: number) => {
              return (
                <div key={i}>
                  <div
                    className={`sm:block flex flex-col items-center h-[268px] 2xl:py-8 xl:py-5 py-4 px-[20px] ${v.background}`}
                  >
                    <div className="xl:h-[150px] h-[140px]">
                      <img
                        className="w-[66.56px] h-[74.72px] mb-[10px]"
                        src={v.image}
                      />
                      <h3 className="font-bold xl:text-lg text-base leading-5 primary-text mb-[10px] font-UniNeue">
                        {v.title}
                      </h3>
                    </div>
                    <p className=" font-normal text-sm leading-4 text-color sm:text-start text-center font-['D-Din-pro-Regular']">
                      {v.discription}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="sm:hidden  relative flex justify-center mt-[20px]">
          <SecondaryButton
            name="Start your journey"
            symbol={<img src="../assets/img/Move Right.png" />}
            className="w-[200px] h-[50px] flex items-center justify-center gap-[10px]"
          />
        </div>
      </section>

      <section className="bg-[#F7F8FC]">
        <div className="mt-[38px] xl:max-w-[1160px] max-w-full mx-auto xl:px-0 px-5 2xl:py-[30px] py-[24px] xl:pb-6 pb-16">
          <div>
            <h5 className="text-2xl font-UniNeue font-bold text-[#64A70B] tracking-wider xl:text-left text-center">
              Featured Courses
            </h5>
          </div>
          <div className="max-w-full xl:h-[517px] flex items-center justify-between xl:flex-row flex-col xl:gap-0 gap-10">
            <div className="md:block hidden relative">
              <img
                className="w-[393px] h-[357px]"
                src="../assets/img/Group 1000001820.png"
              />
              <img
                className="absolute left-[23px] bottom-[2px]"
                src="../assets/img/Voltage.png"
              />
            </div>

            <div className="max-w-[697px] w-full">
              <Slider {...settings}>
                {clientwiseCourseslider?.data?.map((item) => {
                  return (
                    // <div>
                    // 	<SliderData courseImage={item.courseImage} buttonTitle={item.buttonTitle} content={item.content} courseTitle={item.courseTitle} courseType ={item.courseType} />
                    // </div>

                    <div className="relative">
                      <div className="w-[697px] h-[357px] flex justify-between items-center">
                        <div className="w-full">
                          <h2 className="w-[413px] min-h-[40px] leading-7 xl:text-2xl text-xl font-bold text-color font-UniNeue pb-7">
                            {item?.courseTitle?.title}
                          </h2>

                          <p className="xl:w-[413px] mb-8 text-lg text-color leading-5 pr-4 font-calibri line-clamp-3">
                            {item.content}
                          </p>

                          <SecondaryButton
                            name={item.buttonTitle}
                            symbol={<img src="../assets/img/Move Right.png" />}
                            className="w-[195px] xl:h-[62px] h-[50px] flex items-center justify-center gap-[10px]"
                          ></SecondaryButton>
                        </div>

                        <div>
                          <img
                            className="w-[274px] h-[357px] object-cover"
                            src={item.courseImage}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      <div className="xl:mt-[76px] mt-[60px] xl:mb-[24px] mb-[20px] max-w-full h-[12px] button-color"></div>

      <section className="xl:max-w-[1160px] max-w-full mx-auto xl:px-0 px-5">
        <div className="button-color rounded-[6px] text-center inline-block">
          <p className="font-bold xl:text-2xl text-lg font-UniNeue leading-[27px] text-color p-3">
            For Companies
          </p>
        </div>

        <div className="mt-[24px] flex flex-col items-center ">
          <div className="max-w-[800px]">
            <h3 className="text-2xl font-inter leading-9 font-bold traking-[4px] text-center text-color">
              Align your company’s sustainability
              <br /> practices with Ireland’s goals.
            </h3>
          </div>

          <div className="relative max-w-full flex mt-[40px] sm:gap-[20px] gap-[10px] md:gap-[10px] lg:gap-0 justify-between items-center">
            <div className="flex flex-col gap-[35px] ">
              <div className="md:w-[350px] sm:w-[300px] w-auto h-[100px] button-color  rounded-[6px] secondary-text p-5 traking-[-4%]">
                <h3 className="font-bold text-base font-inter leading-[18px]">
                  Cost Efficiency
                </h3>
                <p className="text-sm leading-[14px] pt-3 font-inter font-normal">
                  Drive down operational costs with smart, sustainable
                  practices.
                </p>
              </div>

              <div className="md:w-[350px] sm:w-[300px] h-[100px]  w-auto button-color rounded-[6px] secondary-text p-5 traking-[-4%]">
                <h3 className="font-bold text-base font-inter leading-[18px]">
                  {" "}
                  Productivity Boost
                </h3>
                <p className="text-sm leading-[14px] pt-3 font-inter font-normal">
                  Elevate productivity by embedding sustainability at the heart
                  of your operations.
                </p>
              </div>

              <div className="md:w-[350px] sm:w-[300px] h-[100px] w-auto button-color rounded-[6px] secondary-text  p-5 traking-[-4%]">
                <h3 className="font-bold text-base font-inter leading-[18px]">
                  Building a Sustainable Workforce
                </h3>
                <p className="text-sm leading-[14px] pt-3 font-inter font-normal">
                  Attract and keep the best talent with a forward-thinking
                  sustainability ethos.
                </p>
              </div>
            </div>

            <div className="lg:block hidden p-2">
              <img src="../assets/img/Group 177.png" />
            </div>

            <div className="flex flex-col  gap-[35px]">
              <div className="md:w-[350px] sm:w-[300px] h-[100px] w-auto button-color rounded-[6px] secondary-text p-5 traking-[-4%]">
                <h3 className="font-bold text-base font-inter leading-[18px]">
                  Win Customers
                </h3>
                <p className="text-sm leading-[14px] pt-3 font-inter font-normal">
                  Capture the hearts and minds of customers with your
                  sustainability commitment.
                </p>
              </div>

              <div className="md:w-[350px] sm:w-[300px] h-[100px] w-auto  button-color rounded-[6px] secondary-text p-5 traking-[-4%]">
                <h3 className="font-bold text-base font-inter leading-[18px]">
                  {" "}
                  Attract Investment
                </h3>
                <p className="text-sm leading-[14px] pt-3 font-inter font-normal">
                  Unlock new funding channels with a compelling sustainability
                  narrative.
                </p>
              </div>

              <div className="md:w-[350px] sm:w-[300px] h-[100px] w-auto button-color  rounded-[6px] secondary-text p-5 traking-[-4%]">
                <h3 className="font-bold text-base font-inter leading-[18px]">
                  Elevate Your Brand
                </h3>
                <p className="text-sm leading-[14px] pt-2 font-inter font-normal">
                  Set your brand apart with a pledge to planet-friendly
                  practices.
                </p>
              </div>
            </div>
          </div>
          <button className="xl:py-[14px] py-[10px] xl:px-[59px] px-[50px] mt-[49px] rounded-[4px] border border-solid border-black 1px flex justify-center items-center gap-[10px] hover:bg-[#c4c4c4] text-color text-lg font-extrabold font-abhaya">
            Get Started
            <img className="" src="../assets/img/Move Right Dark.png" />
          </button>
        </div>

        <div className="2xl:mt-[40px] mt-[32px]">
          <div className=" w-[250px] h-[55px] button-color rounded-[6px] flex justify-center items-center">
            <p className="font-bold xl:text-2xl text-xl leading-5 traking-[-4%] text-color font-UniNeue">
              For Training Partners
            </p>
          </div>

          <div className="text-center mt-[24px]">
            <h3 className="font-bold text-2xl font-UniNeue text-center text-color leading-7">
              Sustainability platform
              <br /> needs you.
            </h3>
            <div className="gap-9 mt-[40px] flex-wrap grid xl:grid-cols-3 grid-cols-2 gap-y-20">
              <div className="flex gap-[20px] relative text-start">
                <img
                  className="w-[56px] h-[56px]"
                  src="../assets/img/Ellipse 62.png"
                />
                <img
                  className="absolute top-[10px] left-[10px] "
                  src="../assets/img/Satellites.png"
                />
                <div className="text-color">
                  <h3 className="text-lg font-UniNeue font-medium leading-5">
                    Market Reach
                  </h3>
                  <p className="mt-[8px] leading-[18px] text-base font-normal traking-[-4%] font-UniNeue text-[#4E5566]">
                    Enhance economy of scale by developing training solutions
                    tailored to market demands.
                  </p>
                </div>
              </div>
              <div className="flex sm:w-[374px] w-[300px] gap-[20px] relative  text-start">
                <img
                  className="w-[56px] h-[56px]"
                  src="../assets/img/Ellipse 62.png"
                />
                <img
                  className="absolute top-[10px] left-[10px] "
                  src="../assets/img/Class (1).png"
                />
                <div className="w-[298px] h-[36px] text-color">
                  <h3 className="text-lg font-UniNeue font-medium leading-5">
                    Enhanced Visibility
                  </h3>
                  <p className="mt-[8px] leading-5 text-base traking-[-4%] font-UniNeue text-[#4E5566]">
                    Showcase your expertise to potential clients and learners
                    through our dedicated training provider directory.
                  </p>
                </div>
              </div>
              <div className="flex sm:w-[374px] w-[300px] gap-[20px] relative  text-start">
                <img
                  className="w-[56px] h-[56px]"
                  src="../assets/img/Ellipse 62.png"
                />
                <img
                  className="absolute top-[10px] left-[10px] "
                  src="../assets/img/People Working Together (1).png"
                />
                <div className="w-[298px] h-[36px] text-color">
                  <h3 className="text-lg font-UniNeue font-medium leading-5">
                    Collaborative Ecosystem
                  </h3>
                  <p className="mt-[8px] leading-5 text-base traking-[-4%] font-UniNeue text-[#4E5566]">
                    Engage with like-minded trainers, share insights, and
                    explore collaborative opportunities within our community.
                  </p>
                </div>
              </div>
              <div className="flex sm:w-[374px] w-[300px] gap-[20px] relative  text-start">
                <img
                  className="w-[56px] h-[56px]"
                  src="../assets/img/Ellipse 62.png"
                />
                <img
                  className="absolute top-[10px] left-[10px] "
                  src="../assets/img/E-Learning (2).png"
                />
                <div className="w-[298px] h-[36px] text-color">
                  <h3 className="text-lg font-UniNeue font-medium leading-5">
                    Cutting-edge Technology
                  </h3>
                  <p className="mt-[8px] leading-5 text-base traking-[-4%] font-UniNeue text-[#4E5566]">
                    Leverage our advanced learning management system for
                    seamless course delivery and management.
                  </p>
                </div>
              </div>
              <div className="flex sm:w-[374px] w-[300px] gap-[20px] relative  text-start">
                <img
                  className="w-[56px] h-[56px]"
                  src="../assets/img/Ellipse 62.png"
                />
                <img
                  className="absolute top-[10px] left-[10px] "
                  src="../assets/img/Website Analytics (1).png"
                />
                <div className="w-[298px] h-[36px] text-color">
                  <h3 className="text-lg font-UniNeue font-medium leading-5">
                    Comprehensive Analytics
                  </h3>
                  <p className="mt-[8px] leading-[112%] text-base traking-[-4%] font-UniNeue">
                    Gain valuable insights into learner performance and course
                    effectiveness to refine your training strategies.
                  </p>
                </div>
              </div>
            </div>

            <div className="font-medium text-2xl leading-7 font-UniNeue pl-[92px] pr-[90px] xl:pt-28 pt-20">
              <h3 className="tracking-[-4%] text-color">
                Be a catalyst for change! Partner with us and contribute to a
                sustainable future through impactful training initiatives.
                <span className="button-text-color">
                  Ready to Transform Sustainability Training?{" "}
                </span>
              </h3>
            </div>
            <div className=" w-full flex justify-center mt-[40px]">
              <SecondaryButton
                name="Register me"
                symbol={<Symbol />}
                className="rounded-[4px] flex items-center justify-center gap-[10px] hover:bg-[green] py-2 px-[21px] text-lg font-['D-Din-pro-Regular']"
              ></SecondaryButton>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="bg-[#F7F8FC] xl:py-11 py-8 xl:mt-[80px] mt-[60px]">
        <div className="h-[auto] xl:max-w-[1160px] max-w-full mx-auto xl:px-0 px-5">
          <div className="font-[700] text-[32px] relative">
            <h3 className="xl:text-[32px] text-[26px] font-UniNeue leading-9 font-bold traking-[-4%] text-color">
              Our Building Blocks{" "}
            </h3>
            <div className="max-w-[450px] border-solid border-[3px] border-redius rounded-full button-border-color mt-[16px]"></div>
            <img
              className="absolute top-[4px] sm:left-[318px] left-[270px]"
              src="../assets/img/Ellipse 31.png"
            />
            <div className="absolute top-[-11px] sm:left-[320px] left-[270px] w-[31px] h-[30px] border border-solid border-gray-600 rounded-full"></div>

            <div className="flex gap-8 mt-[45px] justify-between">
              <div className="w-full">
                {data.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="xl:max-w-[573px] border-solid border-silver border-[1px] mb-5"
                  >
                    <h2
                      className={`${
                        item.title === activeIndex
                          ? "text-bg-color secondary-text"
                          : "secondary-background text-color"
                      }   font-[700] xl:text-2xl text-xl flex justify-between items-center px-[18px]`}
                    >
                      <button className="h-[59px] text-left  relative font-inter font-bold leading-7">
                        {item.title}
                      </button>
                      {item.title !== activeIndex ? (
                        <img
                          src={Plus}
                          alt="plus icon"
                          onClick={() => onItemClick(item.title)}
                          className="h-8 w-8"
                        />
                      ) : (
                        <img
                          src={Minus}
                          alt="minus icon"
                          onClick={() => onItemClick("")}
                          className="h-8 w-8"
                        />
                      )}
                    </h2>
                    {item.title === activeIndex && (
                      <div
                        className={`accordion-content font-normal text-lg font-calibri text-[#00778B] p-[20px]`}
                      >
                        {item.discription}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="w-full">
                {data.slice(3, 6).map((item, index) => (
                  <div
                    key={index}
                    className="max-w-[573px] border-solid border-silver border-[1px] mb-5"
                  >
                    <h2
                      className={`${
                        item.title === activeIndex
                          ? "text-bg-color secondary-text"
                          : "secondary-background text-color"
                      }   font-[700] xl:text-2xl text-xl flex justify-between items-center px-[18px]`}
                    >
                      <button className="h-[59px] text-left  relative font-inter font-bold leading-7">
                        {item.title}
                      </button>
                      {item.title !== activeIndex ? (
                        <img
                          src={Plus}
                          alt="plus icon"
                          onClick={() => onItemClick(item.title)}
                          className="h-8 w-8"
                        />
                      ) : (
                        <img
                          src={Minus}
                          alt="minus icon"
                          onClick={() => onItemClick("")}
                          className="h-8 w-8"
                        />
                      )}
                    </h2>
                    {item.title === activeIndex && (
                      <div
                        className={`accordion-content text-[18px] p-[20px] text-[#00778B] font-normal text-lg font-calibri`}
                      >
                        {item.discription}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <div className="bg-[#F7F8FC] sm:pb-[26px] md:pt-[12px] sm:pt-[40px] pt-0 pb-[40px]">
        <div className="xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-[35px]">
          <h3 className="xl:text-[32px] text-2xl font-abhaya leading-9 font-bold relative pb-3 inline-block pe-[50px] tracking-tighter">
            Frequently asked Questions
            <img
              src={titleCircle}
              alt=""
              className="absolute right-0 top-0 bottom-0"
            />
            <span className="h-[4px] bg-[#64A70B] w-full absolute bottom-0 left-0"></span>
          </h3>

          {isLoading ? (
            <Loader className="h-10 w-10" />
          ) : (
            <div className="md:flex block xl:gap-[60px] gap-[40px] xl:mt-[50px] mt-[25px]">
              <div className="w-full">
                <Accordions
                  items={accordionItems?.slice(0, 3)}
                  rounded={false}
                  padding={false}
                  className="sm:space-y-[24px] space-y-[9px]"
                  triggerClassName={`data-[state=open]:bg-[#002A3A] p-4 data-[state=open]:text-white  text-[#002A3A]`}
                  isPlusIcon
                  itemsClass="p-0"
                />
              </div>
              <div className="w-full">
                <Accordions
                  items={accordionItems?.slice(3)}
                  rounded={false}
                  padding={false}
                  className="sm:space-y-[24px] space-y-[9px] md:mt-0 mt-[25px]"
                  triggerClassName="data-[state=open]:bg-[#002A3A] p-4 data-[state=open]:text-white  text-[#002A3A]"
                  isPlusIcon
                  itemsClass="p-0"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="flex items-center justify-center xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-5 relative xl:my-20 my-8 lg:h-[350px] h-full">
        <div className="z-50">
          <img
            className="xl:left-24 left-16 top-1/2 -translate-y-1/2 md:block hidden xl:w-[400px] w-[350px] absolute"
            src="../assets/img/pngwing 3.png"
          />
        </div>
        <div className="flex items-center justify-end w-full max-w-[1160px] mr-5">
          <div className="border border-solid border-[#B9B9B9] z-10 pl-[300px] py-6 max-w-[843px]">
            <h3 className="text-[32px] text-2xl font-bold leading-9 text-color font-calibri tracking-tighter">
              Ready to commence your journey towards{" "}
              <span className="primary-text">sustainability?</span>
            </h3>
            <SecondaryButton
              name="Enroll Now"
              className="py-[10px] px-[43px] rounded-[4px] mt-[23px] hover:bg-[green] text-[18px] leading-5 font-['D-Din-pro-Medium']"
            ></SecondaryButton>
          </div>
        </div>
      </section>

      <section>
        <HomeFooter />
      </section>

      <Loading
        isLoading={
          clientwiseBannerListPending ||
          clientwiseCoursesliderPending ||
          fetchByClientwisePending
        }
      />
    </div>
  );
}

export default Home;
