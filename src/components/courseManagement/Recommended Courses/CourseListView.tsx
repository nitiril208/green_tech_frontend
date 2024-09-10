/* eslint-disable @typescript-eslint/ban-ts-comment */
import speed from "@/assets/images/Speed.png";
import atu from "@/assets/images/atu.png";
import diploma from "@/assets/images/diploma.png";
import fulltime from "@/assets/images/fulltime.png";
import online from "@/assets/images/online.png";
import time from "@/assets/images/time.png";
import unversity from "@/assets/images/unversity.png";
import RecommendedCoursesModel from "@/components/RecommendedCoursesModel";
import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { sendMessage } from "@/services/apiServices/chatServices";
import { createInquiry } from "@/services/apiServices/courseManagement";
import { fetchCourseDiscountEnroll } from "@/services/apiServices/enroll";
import { ErrorType } from "@/types/Errors";
import {
  CourseTime,
  IsOnline,
  RecommendedCourses,
} from "@/types/RecommendedCourses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

let socket: any;

function CourseListView({
  recommendeddata,
  totalData,
  currentIndex,
}: {
  recommendeddata: RecommendedCourses;
  totalData: number;
  currentIndex: number;
}) {
  const { UserId } = useSelector((state: RootState) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId ? UserId : userData?.query?.id;
  const [isRecommendedCourseShow, setIsRecommendedCourseShow] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const Role = location?.pathname?.split("/")[1];
  const queryClient = useQueryClient();
  // const [recommendedCoursesById, setRecommendedCoursesById] = useState<number | null>()
  const [recommendedCoursesById, setRecommendedCoursesById] = useState<
    number | null
  >();
  const pathName = location?.pathname?.split("/")[1];
  const {
    data: fetchCourseDiscountEnrollFun,
    isPending: isPendingCourseDEnroll,
  } = useQuery({
    queryKey: [
      QUERY_KEYS.fetchCourseDiscountEnroll,
      { recommendedCoursesById },
    ],
    queryFn: () => fetchCourseDiscountEnroll(recommendedCoursesById),
    enabled: !!recommendedCoursesById,
  });

  const { mutate: Inquiry } = useMutation({
    mutationFn: createInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchCourseDiscountEnroll],
      });
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  // const getPillerName = (pillerData: CourseDataEntity[]) => {
  //   if (!pillerData) return null;
  //   return pillerData?.map((item) => {
  //     const pillarName = item?.fetchPillar?.pillarName;
  //     const pillerColor = item?.fetchMaturity?.rangeStart >= 1 && item?.fetchMaturity?.rangeEnd <= 40 ? "bg-[#F63636] text-white" :
  //       item?.fetchMaturity?.rangeStart >= 40.1 && item?.fetchMaturity?.rangeEnd <= 80 ? "bg-[#FFD56A] text-black" :
  //         "bg-[#64A70B] text-white";

  //     return <Badge
  //       variant="outline"
  //       className={`${pillerColor} border-[#EDF0F4] p-1 px-3 text-[white] text-xs font-Poppins font-normal`}
  //     >
  //       {pillarName}
  //     </Badge>
  //   })
  // }

  useEffect(() => {
    socket = io(import.meta.env.VITE_SOCKET_URL);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isRecommendedCourseShow) {
      setRecommendedCoursesById(null);
    }
  }, [isRecommendedCourseShow]);

  const handleClose = () => {
    setIsRecommendedCourseShow(false);
    setRecommendedCoursesById(null);
  };

  const { mutate: handleSend } = useMutation({
    mutationFn: sendMessage,
    onSuccess: ({ data }) => {
      console.log("data", data);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.chatList],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.chatUserList],
      });
      const payload = {
        userId: userID as number,
        courseId: recommendeddata?.id,
      };
      Inquiry(payload);
      toast({
        variant: "success",
        title: data?.data?.message,
      });

      navigate(`/${pathName}/message?chatId=${data?.data?.receiverId}`);

      socket.emit("new message", data?.data);
    },
    onError: (error: ErrorType) => {
      setRecommendedCoursesById(null);
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    },
  });

  const handleInquire = (data: RecommendedCourses[] | any) => {
    const payload = {
      senderId: userID,
      receiverId: data?.trainerCompanyId
        ? data?.trainerCompanyId?.userDetails?.id
        : data?.trainerId?.userDetails?.id,
      message: data?.title,
      images: [data?.bannerImage],
    };
    handleSend(payload);
  };

  return (
    <>
      <Modal
        open={isRecommendedCourseShow}
        onClose={handleClose}
        className={`py-[60px] px-6 ${
          isPendingCourseDEnroll
            ? "h-[200px]"
            : fetchCourseDiscountEnrollFun?.data &&
              fetchCourseDiscountEnrollFun?.data?.length > 0
            ? "max-w-[800px] max-h-[800px] h-auto"
            : "h-[200px]"
        }`}
      >
        <RecommendedCoursesModel
          data={fetchCourseDiscountEnrollFun?.data || []}
          isLoading={isPendingCourseDEnroll}
          setOpen={setIsRecommendedCourseShow}
        />
      </Modal>

      <div>
        <div
          className={`bg-[#FFFFFF] pr-4 border border-[#D9D9D9] lg:p-5 p-4 rounded-md shadow-sm ${
            totalData && totalData - 1 === currentIndex ? "mb-0" : "mb-5"
          }`}
          onClick={() =>
            navigate(
              // @ts-ignore
              `/${Role}/employee-basic-course/${recommendeddata?.currentVersion?.id}`
            )
          }
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="sm:col-span-10 col-span-12 flex sm:flex-row flex-col xl:gap-5 gap-3">
              <div className="overflow-hidden rounded sm:min-w-[152px] w-full sm:w-[152px] sm:min-h-[133px] sm:h-[133px]">
                <img
                  className="rounded object-cover object-center w-full h-full"
                  src={recommendeddata.bannerImage}
                  alt="Course"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1 flex-wrap">
                  <div className="flex gap-2">
                    <FaStar className="text-yellow-500" />
                    <span className="text-[#8C94A3] font-semibold text-sm">
                      RECOMMENDED
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap leading-[22px]">
                    {recommendeddata?.courseData?.map((item) => {
                      return (
                        <div className="flex gap-2 items-center">
                          <p
                            className={`bg-[${item?.fetchMaturity?.color}] text-[#000] py-[3px] px-[10px] rounded-full text-base font-normal font-calibri leading-[22px]`}
                          >
                            {item?.fetchPillar?.pillarName}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-12 justify-between xl:gap-[50px] gap-4 items-center">
                  <div className="xl:col-span-10 col-span-12">
                    {" "}
                    <span className="font-inter lg:text-base text-sm line-clamp-2 mb-3 font-semibold">
                      {recommendeddata.title}
                    </span>
                  </div>
                  <div className="xl:col-span-2 col-span-4">
                    <img
                      className="object-cover object-center"
                      src={atu}
                      alt="atu"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src={speed} alt="speed" />
                    <p className="text-xs">Level- Advanced</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <img
                      className=" h-[16] w-[18px] text-black"
                      src={diploma}
                      alt="diploma"
                    />
                    <p className="text-xs">
                      {recommendeddata?.universityAddress || "--"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      className=" h-[16] w-[18px]"
                      src={fulltime}
                      alt="fulltime"
                    />
                    <p className="text-xs">
                      {recommendeddata?.time === CourseTime.FullTime && (
                        <span>Full-time</span>
                      )}
                      {recommendeddata?.time === CourseTime.PartTime && (
                        <span>Part-time</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      className=" h-[16] w-[18px]"
                      src={online}
                      alt="online"
                    />
                    <p className="text-xs">
                      {recommendeddata?.isOnline === IsOnline.Online && (
                        <span>Online</span>
                      )}
                      {recommendeddata?.isOnline === IsOnline.InPerson && (
                        <span>InPerson</span>
                      )}
                      {recommendeddata?.isOnline === IsOnline.Hybrid && (
                        <span>Hybrid</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src={time} alt="time" />
                    <p className="text-xs">{recommendeddata?.duration}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      className=" h-[16] w-[18px]"
                      src={unversity}
                      alt="unversity"
                    />
                    <p className="text-xs">
                      {recommendeddata?.otherInstitutionName || "--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 col-span-12">
              <div className="flex sm:flex-col flex-row gap-2 sm:items-end items-center">
                <h3 className="text-[#000000] text-[font-calibri-bold] sm:w-[143px] w-[80px]">
                  €{recommendeddata.price}
                </h3>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsRecommendedCourseShow(true);
                    setRecommendedCoursesById(recommendeddata?.id);
                  }}
                  className="  bg-[#64A70B] hover:bg-[#64A70B] text-white px-4 py-2 rounded w-[143px]"
                  disabled={recommendeddata?.enrolled}
                >
                  {recommendeddata?.enrolled ? recommendeddata?.enrolledStatus === 1 ? "Enrolled" : recommendeddata?.enrolledStatus === 0 ? "Pending Enrollment": " " : "Enroll Now"}
                </Button>
                {recommendeddata?.inquire ? (
                  <Button
                    className="bg-[#00778B] sm:w-[125px] sm:h-[43px] sm:text-base text-sm !w-[143px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/${pathName}/message?chatId=${
                          recommendeddata?.trainerCompanyId
                            ? recommendeddata?.trainerCompanyId?.userDetails?.id
                            : recommendeddata?.trainerId?.userDetails?.id
                        }`
                      );
                    }}
                  >
                    Show Message
                  </Button>
                ) : (
                  <Button
                    className=" h-[42px] bg-[#00778B] text-white font-semibold px-4 py-2 rounded w-[143px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInquire(recommendeddata || []);
                      setRecommendedCoursesById(recommendeddata?.id);
                    }}
                    disabled={
                      !isRecommendedCourseShow &&
                      recommendedCoursesById === recommendeddata?.id
                    }
                  >
                    {!isRecommendedCourseShow &&
                      recommendedCoursesById === recommendeddata?.id && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}{" "}
                    Enquire
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseListView;
