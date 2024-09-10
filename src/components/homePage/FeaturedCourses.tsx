import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getCourseSlider } from "@/services/apiServices/courseSlider";
import { HomeCourseSlidersResponse } from "@/types/banner";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { SecondaryButton } from "../comman/Button/CustomButton";
import Loader from "../comman/Loader";

const FeaturedCourses = () => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState<string>("");
  const { clientId } = useAppSelector((state) => state.user);
  const {
    data: clientwiseCourseslider,
    isPending: clientwiseCoursesliderPending,
  } = useQuery<HomeCourseSlidersResponse>({
    queryKey: [QUERY_KEYS.clientwiseCourseSlider, clientId],
    queryFn: () => getCourseSlider(clientId.toString(), "Active"),
    enabled: !!clientId,
  });

  console.log("clientwiseCourseslider?.data", clientwiseCourseslider?.data);

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
    beforeChange: (current: number) => {
      setTitle(
        (clientwiseCourseslider?.data &&
          clientwiseCourseslider?.data[current]?.courseType) ||
          ""
      );
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          prevArrow: <></>,
          nextArrow: <></>,
        },
      },
    ],
  };

  return (
    <div className="">
      <div className="xl:max-w-[1160px] max-w-full mx-auto md:my-[40px] my-0 xl:px-0 px-5 2xl:py-[30px] py-[24px] 2xl:pb-[100px] xl:pb-[100px] pb-[90px]">
        <div>
          <h5 className="text-2xl font-abhaya font-bold text-[#64A70B] xl:text-left text-center sm:mb-0 mb-4">
            {title || "Featured Courses"}
          </h5>
        </div>
        <div className="max-w-full flex items-center justify-between xl:flex-row flex-col xl:gap-0 sm:gap-10 gap-[42px]">
          <div className="relative">
            <img
              className="w-[332px] h-[357px]"
              src="../assets/img/Group 1000001820.png"
            />
            <img
              className="absolute left-[14px] bottom-[2px]"
              src="../assets/img/Voltage.png"
            />
          </div>

          <div className="md:max-w-[697px] w-full">
            {clientwiseCoursesliderPending ? (
              <Loader />
            ) : (
              <Slider {...settings}>
                {clientwiseCourseslider?.data?.map((item) => {
                  return (
                    // <div>
                    // 	<SliderData courseImage={item.courseImage} buttonTitle={item.buttonTitle} content={item.content} courseTitle={item.courseTitle} courseType ={item.courseType} />
                    // </div>

                    <div className="relative">
                      <div className="md:w-[697px] sm:h-[357px] h-auto flex sm:flex-row flex-col justify-between md:items-center items-start">
                        <div className="w-full sm:order-1 order-2 sm:mt-0 mt-3">
                          <h2 className="sm:w-[413px] w-[335px] min-h-[40px] xl:leading-9 sm:leading-8 leading-6 xl:text-[32px] sm:text-3xl text-2xl font-bold font-UniNeue pb-4">
                            {item.courseTitle?.title}
                          </h2>

                          <p className="sm:w-[413px] w-[335px] mb-8 text-lg leading-5 pr-4 font-Droid-Regular line-clamp-3">
                            {item.content}
                          </p>
                          {item?.courseTitle?.id && item.buttonTitle && (
                            <SecondaryButton
                              name={item.buttonTitle}
                              symbol={
                                <img src="../assets/img/Move Right.png" />
                              }
                              className="sm:w-[195px] w-full xl:h-[62px] bg-[#75BD43] h-[50px] flex items-center justify-center gap-[10px] font-abhaya font-semibold text-lg"
                              onClick={() => {
                                navigate(
                                  `/feature-course/${item?.courseTitle?.id}`
                                );
                              }}
                            ></SecondaryButton>
                          )}
                        </div>

                        <div className="sm:order-2 order-1">
                          <img
                            className="sm:min-w-[274px] sm:w-[274px] w-full h-[357px] object-cover"
                            src={item.courseImage}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;
