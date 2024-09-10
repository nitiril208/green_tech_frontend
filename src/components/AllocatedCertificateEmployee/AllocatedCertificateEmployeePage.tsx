import { useAppDispatch } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import {
  allocateCertificate,
  certificateList,
} from "@/services/apiServices/certificate";
import { fetchCourseAllCourse } from "@/services/apiServices/courseManagement";
import { getEmployeeByCourse } from "@/services/apiServices/employee";
import { Uploads3imagesBase64 } from "@/services/uploadImage";
import { useMutation, useQuery } from "@tanstack/react-query";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../comman/Error/ErrorMessage";
import SelectMenu from "../comman/SelectMenu";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

const AllocatedCertificateEmployeePage = () => {
  const captureRef = useRef(null);
  const Role = location.pathname.split("/")[1];
  const dispatch = useAppDispatch();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [loading, setLoading] = useState(false);
  const [selectCertificate, setSelectCertificate] = useState("");
  const [selectCourse, setSelectCourse] = useState("");
  const [searchParams] = useSearchParams();
  const courseId = searchParams?.get("courseId");
  const trainerId = searchParams?.get("traineeId");
  const courseName = searchParams?.get("courseName");
  const [selectTrainee, setSelectTrainee] = useState("");
  const [body, setBody] = useState("");
  console.log("selectTrainee+++", selectTrainee);

  const { data: fetchCourseAllCourseData } = useQuery({
    queryKey: [QUERY_KEYS.fetchAllCourse, { UserId: userData?.query?.id }],
    queryFn: () => fetchCourseAllCourse("", +userData?.query?.id, "PUBLISHED"),
    enabled: !!userData?.query?.id,
  });

  useEffect(() => {
    if (courseId && trainerId) {
      setSelectCourse(courseId);
      setSelectTrainee(trainerId);
    }
  }, [courseId, trainerId]);

  const { data: certificate_data } = useQuery({
    queryKey: [QUERY_KEYS.getcertificate],
    queryFn: () => certificateList(userData?.query?.id),
  });

  const { data: fetchEmployeeByCourse } = useQuery({
    queryKey: [QUERY_KEYS.fetchEmployeeByCourse, { selectCourse }],
    queryFn: () => getEmployeeByCourse(selectCourse),
    enabled: !!selectCourse,
  });

  const { mutate: allocate } = useMutation({
    mutationFn: allocateCertificate,
    onSuccess: () => {
      toast({
        description: "Certificate issued successfully",
      });
      setSelectCourse("");
      setSelectTrainee("");
      setSelectCertificate("");
      setLoading(false);
      dispatch(
        setPath([
          {
            label: `Certificate Management`,
            link: null,
          },
          {
            label: `Issued Certificate`,
            link: `/${Role}/allocated-certificate`,
          },
        ])
      );
    },
    onError: (error: any) => {
      toast({
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
      setLoading(false);
    },
  });

  const certificateOption = certificate_data?.data?.map((item: any) => {
    return {
      label: item?.templateName,
      value: item?.id?.toString(),
    };
  });
  console.log(
    "fetchCourseAllCourseDatafetchCourseAllCourseData",
    fetchCourseAllCourseData
  );

  const courseOptions = fetchCourseAllCourseData?.data
    ? fetchCourseAllCourseData?.data
        ?.filter((item) => !!item)
        ?.map((item) => {
          return {
            label: item?.title,
            value: item?.id?.toString(),
          };
        })
    : [];

  const selectedCertificate: any = certificate_data?.data?.find(
    (item: any) => item?.id?.toString() === selectCertificate
  );

  useEffect(() => {
    if (selectedCertificate) {
      setBody(selectedCertificate?.bodyText);
    }
  }, [selectedCertificate]);

  const employeeOptions = fetchEmployeeByCourse?.data?.map((item: any) => {
    return {
      label: item?.name || item?.email?.split("@")[0],
      value: item?.id?.toString(),
    };
  });
  console.log("employeeOptions++++", employeeOptions);

  const handleIssue = async () => {
    setLoading(true);
    const selectCourseData = fetchCourseAllCourseData?.data?.find(
      (item: any) => item?.id?.toString() === selectCourse
    );
    const loadImage = (url: string) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });

    const images = [
      selectedCertificate?.backgroundImage,
      selectedCertificate?.companyLogo1,
      selectedCertificate?.instructorSignature,
      selectedCertificate?.administratorSignature,
    ]?.filter((item) => !!item);

    console.log("imagesimages", images);
    
    try {
      Promise.all(images.map((url) => loadImage(url as string)));
      if (captureRef.current) {
        html2canvas(captureRef.current, {
          useCORS: true,
          allowTaint: false,
          logging: true,
        })
          .then(async (canvas) => {
            const imgData = canvas.toDataURL("image/png");
            console.log("imgDataimgData", imgData);
            if (imgData) {
              const result = await Uploads3imagesBase64(imgData);
              console.log("resultresult", result);
              
              return;
              if (result.status === 200) {
                const payload = {
                  certificate: selectedCertificate?.id,
                  user: userData?.query?.id,
                  status: 1,
                  course: selectCourseData?.currentVersion?.mainCourse?.id,
                  trainee: selectCourseData?.trainerId?.id,
                  trainerCompany: selectCourseData?.trainerCompanyId?.id,
                  employee: +selectTrainee,
                  certificatePdf: result?.data,
                };
                console.log(
                  "🚀 ~ .then ~ payload.selectCourseData:",
                  selectCourseData
                );

                allocate(payload);
                
              } else {
                toast({
                  description: `Upload failed: ${result.data}`,
                  variant: "destructive",
                });
              }
            }
          })
          .catch((error) => {
            console.error("Error capturing canvas:", error);
          });
      }
    } catch (error) {
      console.error("Error loading images or capturing canvas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center border-b border-[#D9D9D9] p-4">
        <div className="">
          <h6 className="font-calibri text-base font-bold">
            Allocated Certificate
          </h6>
        </div>
        <div className="">
          <button
            onClick={() => {
              dispatch(
                setPath([
                  {
                    label: `Certificate Management`,
                    link: null,
                  },
                  {
                    label: `Issued Certificate`,
                    link: `/${Role}/allocated-certificate`,
                  },
                ])
              );
            }}
            className="text-[16px] flex font-semibold items-center gap-[15px] font-abhaya"
          >
            <HiOutlineArrowNarrowLeft />
            Back
          </button>
        </div>
      </div>
      <div className="sm:p-5 p-[15px]">
        <div className="grid grid-cols-12 gap-5">
          <div className="2xl:col-span-8 col-span-12">
            {selectedCertificate ? (
              <div className="2xl:flex block gap-[30px]" ref={captureRef}>
                <div className="relative 2xl:sticky top-0 sm:min-h-[501px] min-h-[350px] h-full 2xl:max-w-[calc(100vw-391px)] max-w-full w-full 2xl:mb-0 mb-6">
                  <div className="h-full w-full">
                    <div className="flex justify-center">
                      <img
                        src={selectedCertificate?.backgroundImage}
                        className="object-cover bg-transparent w-full max-h-[700px] h-full"
                        alt="Logo"
                      />
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 w-full 2xl:px-20 xl:px-8 md:px-5 px-3">
                      <h4
                        className={`xl:text-[70px] md:text-[50px] sm:text-[38px] text-[28px] text-center font-semibold xl:pb-0 pb-0`}
                        style={{
                          color: selectedCertificate?.primaryColor,
                          fontFamily: selectedCertificate?.primaryFont,
                        }}
                      >
                        {selectedCertificate?.cretificateText}
                      </h4>
                      <br />
                      <br />
                      <div className="w-full text-center ">
                        <div
                          className="xl:pb-3 pb-1 xl:text-[30px] md:text-[26px] sm:text-[20px] text-base font-medium"
                          style={{
                            fontFamily: selectedCertificate?.secondaryFont,
                          }}
                        >
                          <h1 className="mb-2">OF PARTICIPATION</h1>
                          <h1>{selectedCertificate?.title}</h1>
                        </div>

                        <div>
                          <h1
                            className={`!font-${selectedCertificate?.primaryFont} font-medium lg:mt-[25px] md:mt-[10px] sm:mt-[8px] mt-[4px] xl:text-6xl md:text-5xl sm:text-3xl text-2xl`}
                            style={{
                              color: selectedCertificate?.primaryColor,
                              fontFamily: selectedCertificate?.primaryFont,
                            }}
                          >
                            {
                              employeeOptions?.find(
                                (item: any) => item?.value === selectTrainee
                              )?.label
                            }
                          </h1>
                          <br />
                          <div className="flex items-center justify-center md:mt-4 sm:mt-3 mt-1">
                            <span
                              className={`block w-2 h-2 rounded-full`}
                              style={{
                                backgroundColor:
                                  selectedCertificate?.primaryColor,
                              }}
                            ></span>
                            <div
                              className={`h-[2px] xl:max-w-[500px] md:max-w-[400px] sm:max-w-[280px] max-w-[220px] w-full`}
                              style={{
                                backgroundColor:
                                  selectedCertificate?.primaryColor,
                              }}
                            ></div>
                            <span
                              className={`block w-2 h-2 rounded-full`}
                              style={{
                                backgroundColor:
                                  selectedCertificate?.primaryColor,
                              }}
                            ></span>
                          </div>
                        </div>
                        <div className="sm:mt-5 mt-3">
                          <p
                            className={`xl:text-[24px] sm:text-[20px] text-base !font-${selectedCertificate?.secondaryFont} tracking-tight max-w-[550px] w-full m-auto xl:leading-8 sm:leading-6 leading-5`}
                            style={{
                              fontFamily: selectedCertificate?.secondaryFont,
                            }}
                          >
                            {body}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 justify-between">
                          <div className="flex items-end justify-between md:pt-3 pt-1 md:pr-6 pr-3">
                            <div>
                              <div className="">
                                {selectedCertificate?.administratorSignature ? (
                                  <img
                                    src={
                                      selectedCertificate?.administratorSignature
                                    }
                                    alt="logo"
                                    className="max-w-[120px] w-full min-h-[80px] max-h-[80px] m-auto h-full object-contain"
                                  />
                                ) : (
                                  <div className="max-w-[100px] w-full md:min-h-[80px] min-h-[50px] md:max-h-[80px] max-h-[50px] mx-auto h-full"></div>
                                )}
                              </div>
                              <div
                                className="border-t font-nunito font-medium xl:text-lg sm:text-base text-sm pt-2"
                                style={{
                                  borderColor:
                                    selectedCertificate?.primaryColor,
                                }}
                              >
                                <h2>
                                  {selectedCertificate?.administratorTitle}
                                </h2>
                                <h2>Head Of Marketing</h2>
                              </div>
                            </div>
                            {selectedCertificate?.companyLogo && (
                              <div className="">
                                <img
                                  src={selectedCertificate?.companyLogo}
                                  className="md:w-full w-[80px]"
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex items-end justify-between md:pt-3 pt-1 md:pl-6 pl-3">
                            <div className=" md:w-[100px] md:h-[100px] w-[60px] h-[60px] overflow-hidden">
                              {
                                <img
                                  src={selectedCertificate?.companyLogo1}
                                  alt="logo"
                                  className="max-w-[100px] md:w-full w-[80px] min-h-[50px] md:max-h-[100px] max-h-[50px] h-full object-contain"
                                />
                              }
                            </div>
                            <div>
                              <div className="overflow-hidden">
                                {selectedCertificate?.instructorSignature ? (
                                  <img
                                    src={
                                      selectedCertificate?.instructorSignature
                                    }
                                    alt="logo"
                                    className="max-w-[100px] w-full min-h-[80px] max-h-[80px] m-auto h-full"
                                  />
                                ) : (
                                  <div className="max-w-[100px] w-full md:min-h-[80px] min-h-[50px] md:max-h-[80px] max-h-[50px] mx-auto h-full"></div>
                                )}
                              </div>
                              {selectedCertificate?.instructorTitle && (
                                <div
                                  className="border-t font-nunito font-medium xl:text-lg sm:text-base text-sm pt-2"
                                  style={{
                                    borderColor:
                                      selectedCertificate?.primaryColor,
                                  }}
                                >
                                  <h2>
                                    {selectedCertificate?.instructorTitle}
                                  </h2>
                                  <h2>Head Of Marketing</h2>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="flex items-center justify-center h-[200px] font-medium">
                Select Course
              </p>
            )}
          </div>
          <div className="2xl:col-span-4 col-span-12">
            <div className="border border-[#D9D9D9] rounded-lg mb-5">
              <div className="xl:p-4 p-2 border-b border-[#D9D9D9]">
                <h5 className="text-base font-bold font-calibri">
                  Trainee Details
                </h5>
              </div>
              <div className="xl:p-5 p-3">
                <div className="pb-3 flex flex-col gap-2">
                  <Label className="text-base text-[#515151] font-normal font-calibri">
                    Certificate
                  </Label>
                  <SelectMenu
                    option={certificateOption || []}
                    setValue={(data: string) => setSelectCertificate(data)}
                    value={selectCertificate}
                    className="text-[#A3A3A3] text-base font-calibri"
                    placeholder="Select Certificate"
                    containClassName="max-w-[476px]"
                  />
                </div>
                <div className="pb-3 flex flex-col gap-2">
                  <Label className="text-base text-[#515151] font-normal font-calibri">
                    Course Name
                  </Label>
                  <SelectMenu
                    option={
                      courseName
                        ? [
                            ...courseOptions,
                            { label: courseName || "", value: courseId || "" },
                          ]
                        : courseOptions
                    }
                    disabled={!!courseName || !!courseId || !!trainerId}
                    setValue={(data: string) => setSelectCourse(data)}
                    value={selectCourse}
                    className="text-[#A3A3A3] text-base font-calibri"
                    placeholder="Select Course"
                    containClassName="max-w-[476px]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-base text-[#515151] font-normal font-calibri">
                    Select Trainee
                  </Label>
                  <SelectMenu
                    option={employeeOptions || []}
                    setValue={(data: string) => setSelectTrainee(data)}
                    value={selectTrainee}
                    disabled={!!courseName || !!courseId || !!trainerId}
                    className="text-[#A3A3A3] text-base font-calibri"
                    placeholder="Select Trainee"
                  />
                </div>
              </div>
            </div>
            <div className="border border-[#D9D9D9] rounded-lg mb-5">
              <div className="xl:p-4 p-2 border-b border-[#D9D9D9]">
                <h5 className="text-base font-bold font-calibri">Body</h5>
              </div>
              <div className="xl:mx-4 mx-2 xl:my-3 my-2 rounded-lg">
                <Textarea
                  className="text-base font-calibri line-clamp-4 shadow-none outline-none focus:border-[#4b4b4b]"
                  rows={5}
                  placeholder="Write here..."
                  value={body}
                  maxLength={100}
                  onChange={(e) => setBody(e.target.value)}
                >
                  Desription..
                </Textarea>
                {body.length > 100 && (
                  <ErrorMessage
                    message={"Body text must contain at least 100 characters"}
                  />
                )}
              </div>
            </div>
            <div className="">
              <Button
                className="uppercase w-full xl:h-14 h-11 xl:text-base text-sm font-nunito bg-[#58BA66] rounded-lg"
                onClick={handleIssue}
                disabled={selectTrainee === "" || selectCourse === ""}
                isLoading={loading}
              >
                Issue certificate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocatedCertificateEmployeePage;
