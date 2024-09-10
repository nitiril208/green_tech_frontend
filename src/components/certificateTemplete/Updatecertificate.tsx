import FileUpload from "@/components/comman/FileUpload";
import { useAppDispatch } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import {
  fetchcertificate,
  Updatecertificate,
} from "@/services/apiServices/certificate";
import { uploadFile } from "@/services/apiServices/uploadServices";
import { Uploads3imagesBase64 } from "@/services/uploadImage";
import { ErrorType } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import html2canvas from "html2canvas";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { z } from "zod";
import ErrorMessage from "../comman/Error/ErrorMessage";
import InputWithLabel from "../comman/InputWithLabel";
import Loader from "../comman/Loader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
type RouteParams = {
  id: string;
};
const Addcertificate = () => {
  const Role = location.pathname.split("/")[1];
  const dispatch = useAppDispatch();
  const { id: certificateId } = useParams<RouteParams>();
  const { toast } = useToast();
  const captureRef = useRef(null);
  const queryClient = useQueryClient();
  const [filename, setFilename] = useState<string>("");
  const [empName, setEmpName] = useState<string>("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const [loading, setLoading] = useState(false);
  const schema = z.object({
    templateName: z.string({ required_error: "Please enter template name" }),
    backgroundImage: z.string({
      message: "Please add background image",
    }),
    companyLogo1: z.string({
      message: "Please add logo image",
    }),
    title: z.string({ required_error: "Please enter certificate title" }),
    bodyText: z
      .string({ required_error: "Please enter body text" })
      .max(100, { message: "Body text must contain at least 100 characters" }),

    administratorTitle: z.string({
      required_error: "Please enter administrator title",
    }),
    instructorTitle: z.string({
      required_error: "Please enter instructor title",
    }),
    administratorSignature: z.string({
      message: "Please add administrator signature",
    }),
    instructorSignature: z.string({
      message: "Please add instructor signature",
    }),
  });

  type ValidationSchema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { data: Single_certificate, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.certificateDetail, { certificateId }],
    queryFn: () => fetchcertificate(certificateId!),
  });
  useEffect(() => {
    setValue("templateName", Single_certificate?.data?.templateName);
    setValue("backgroundImage", Single_certificate?.data?.backgroundImage);
    setValue("title", Single_certificate?.data?.title);
    setValue("bodyText", Single_certificate?.data?.bodyText);
    setValue("companyLogo1", Single_certificate?.data?.companyLogo1);
    setValue(
      "administratorSignature",
      Single_certificate?.data?.administratorSignature
    );
    setValue(
      "administratorTitle",
      Single_certificate?.data?.administratorTitle
    );
    setValue(
      "administratorTitle",
      Single_certificate?.data?.administratorTitle
    );
    setValue("instructorTitle", Single_certificate?.data?.instructorTitle);
    setValue(
      "instructorSignature",
      Single_certificate?.data?.instructorSignature
    );
  }, [Single_certificate]);

  const { mutate: createImageUpload, isPending: imagepending } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      toast({ title: "Image Uploaded Successfully", variant: "default" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleCourse],
      });

      if (filename) {
        setValue(filename as any, data?.data?.data?.file);
      }
      setFilename("");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    },
  });
  const handleUploadFile = (e: any, name: string) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      createImageUpload(files[0]);
      setFilename(name.toString());
    }
    if (name) {
      setFilename(name.toString());
    }
  };

  const { mutate: update_certificate, isPending: update_Panding } = useMutation(
    {
      mutationFn: Updatecertificate,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.certificateDetail],
        });
        dispatch(
          setPath([
            {
              label: "Certificate Management",
              link: null,
            },
            {
              label: "Certificate List",
              link: `/${Role}/certificate-template`,
            },
          ])
        );
        toast({
          variant: "default",
          title: "Certificate Update Successfully",
        });
        setLoading(false);
      },
      onError: (error: ErrorType) => {
        toast({
          variant: "destructive",
          title: error.data.message,
        });
        setLoading(false);
      },
    }
  );

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    setEmpName("");
    const loadImage = (url: string) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });

    const images = [
      data?.backgroundImage,
      data?.companyLogo1,
      data?.instructorSignature,
      data?.administratorSignature,
    ]?.filter((item) => !!item);

    try {
      await Promise.all(images.map((url) => loadImage(url)));
      if (captureRef.current) {
        html2canvas(captureRef.current, {
          useCORS: true,
          allowTaint: false,
          logging: true,
        }).then(async (canvas) => {
          const imgData = canvas.toDataURL("image/png");
          console.log("imgData", imgData);

          if (imgData) {
            const result = await Uploads3imagesBase64(imgData);
            console.log("result", result);

            if (result.status === 200) {
              const payload = {
                user: userData?.query?.id,
                templateName: data?.templateName,
                backgroundImage: data?.backgroundImage,
                title: data?.title,
                bodyText: data?.bodyText,
                administratorTitle: data?.administratorTitle,
                administratorSignature: data?.administratorSignature,
                instructorTitle: data?.instructorTitle,
                companyLogo1: data?.companyLogo1,
                instructorSignature: data?.instructorSignature,
                createdAt: Single_certificate?.data?.createdAt,
                updatedAt: Single_certificate?.data?.updatedAt,
                message: "",
                previousCertificate: result?.data,
              };
              update_certificate({ data: payload, id: certificateId || "" });
            } else {
              toast({
                description: `Upload failed: ${result.data}`,
                variant: "destructive",
              });
            }
          }
        });
      }
    } catch (error) {
      console.error("Error loading images or capturing canvas:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="border-b-2 border-solid gray flex justify-between items-center p-[16px]">
        <div>
          <h2 className="font-[700] text-[16px] font-abhaya">
            Edit Certificate
          </h2>
        </div>
        <div>
          <button
            onClick={() => {
              dispatch(
                setPath([
                  { label: "Certificate Managment", link: null },
                  {
                    label: "Certificate List",
                    link: `/${Role}/certificate-template`,
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
        {isLoading ? (
          <Loader />
        ) : (
          <div className="2xl:flex block gap-[30px]">
            <div
              ref={captureRef}
              className="2xl:sticky static top-0 sm:min-h-[501px] min-h-[350px] h-full 2xl:max-w-[calc(100vw-391px)] max-w-full w-full 2xl:mb-0 mb-6"
            >
              <div className="relative h-full w-full">
                {watch("backgroundImage") && (
                  <div className="flex justify-center">
                    <img
                      src={watch("backgroundImage")}
                      className="bg-transparent w-full max-h-[700px] h-full"
                      alt="Logo"
                    />
                  </div>
                )}
                <div className="absolute top-1/2 -translate-y-1/2 w-full 2xl:px-20 xl:px-8 md:px-5 px-3">
                  {Single_certificate?.data?.cretificateText && (
                    <h4
                      className={`xl:text-[70px] md:text-[50px] sm:text-[38px] text-[28px] text-center font-semibold pb-0`}
                      style={{
                        color: Single_certificate?.data?.primaryColor,
                        fontFamily: Single_certificate?.data?.primaryFont,
                      }}
                    >
                      {Single_certificate?.data?.cretificateText}
                    </h4>
                  )}
                  <br />
                  <br />
                  <div className="w-full text-center ">
                    {watch("title") && (
                      <div
                        className="xl:pb-3 pb-1 xl:text-[30px] md:text-[26px] sm:text-[20px] text-base font-medium"
                        style={{
                          fontFamily: Single_certificate?.data?.secondaryFont,
                        }}
                      >
                        <h1 className="mb-2">OF PARTICIPATION</h1>
                        <h1>{watch("title")}</h1>
                      </div>
                    )}

                    <div>
                      <h1
                        className={`!font-${Single_certificate?.data?.primaryFont} font-medium lg:mt-[25px] md:mt-[10px] sm:mt-[8px] mt-[4px] xl:text-6xl md:text-5xl sm:text-3xl text-2xl`}
                        style={{
                          color: Single_certificate?.data?.primaryColor,
                          fontFamily: Single_certificate?.data?.primaryFont,
                        }}
                      >
                        {empName !== "" ? empName : "Employe Name"}
                      </h1>
                      <br />
                      <div className="flex items-center justify-center md:mt-4 sm:mt-3 mt-1">
                        <span
                          className={`block w-2 h-2 rounded-full`}
                          style={{
                            backgroundColor:
                              Single_certificate?.data?.primaryColor,
                          }}
                        ></span>
                        <div
                          className={`h-[2px] xl:max-w-[500px] md:max-w-[400px] sm:max-w-[280px] max-w-[220px] w-full`}
                          style={{
                            backgroundColor:
                              Single_certificate?.data?.primaryColor,
                          }}
                        ></div>
                        <span
                          className={`block w-2 h-2 rounded-full`}
                          style={{
                            backgroundColor:
                              Single_certificate?.data?.primaryColor,
                          }}
                        ></span>
                      </div>
                    </div>
                    {watch("bodyText") && (
                      <div className="sm:mt-5 mt-3">
                        <p
                          className={`xl:text-[24px] sm:text-[20px] text-base !font-${Single_certificate?.data?.secondaryFont} tracking-tight max-w-[550px] w-full m-auto xl:leading-8 sm:leading-6 leading-5`}
                          style={{
                            fontFamily: Single_certificate?.data?.secondaryFont,
                          }}
                        >
                          {watch("bodyText")}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 justify-between">
                      <div className="flex items-end justify-between md:pt-3 pt-1 md:pr-6 pr-3">
                        <div>
                          <div className="">
                            {watch("administratorSignature") ? (
                              <img
                                src={watch("administratorSignature") || ""}
                                alt="logo"
                                className="max-w-[120px] w-full min-h-[80px] max-h-[80px] m-auto h-full object-contain"
                              />
                            ) : (
                              <div className="max-w-[100px] w-full md:min-h-[80px] min-h-[50px] md:max-h-[80px] max-h-[50px] mx-auto h-full"></div>
                            )}
                          </div>
                          {watch("administratorTitle") && (
                            <div
                              className="border-t font-nunito font-medium xl:text-lg sm:text-base text-sm pt-2"
                              style={{
                                borderColor:
                                  Single_certificate?.data?.primaryColor,
                              }}
                            >
                              <h2>{watch("administratorTitle")}</h2>
                              {/* <h2>Head Of Marketing</h2> */}
                            </div>
                          )}
                        </div>
                        {Single_certificate?.data?.companyLogo && (
                          <div className="">
                            <img
                              src={Single_certificate?.data?.companyLogo}
                              className="md:w-full w-[80px]"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex items-end justify-between md:pt-3 pt-1 md:pl-6 pl-3">
                        <div className=" md:w-[100px] md:h-[100px] w-[60px] h-[60px] overflow-hidden">
                          {
                            <img
                              src={watch("companyLogo1")}
                              alt="logo"
                              className="max-w-[100px] md:w-full w-[80px] min-h-[50px] md:max-h-[100px] max-h-[50px] h-full object-contain"
                            />
                          }
                        </div>
                        <div>
                          <div className="overflow-hidden">
                            {watch("instructorSignature") ? (
                              <img
                                src={watch("instructorSignature")}
                                alt="logo"
                                className="max-w-[100px] w-full min-h-[80px] max-h-[80px] m-auto h-full"
                              />
                            ) : (
                              <div className="max-w-[100px] w-full md:min-h-[80px] min-h-[50px] md:max-h-[80px] max-h-[50px] mx-auto h-full"></div>
                            )}
                          </div>
                          {watch("instructorTitle") && (
                            <div
                              className="border-t font-nunito font-medium xl:text-lg sm:text-base text-sm pt-2"
                              style={{
                                borderColor:
                                  Single_certificate?.data?.primaryColor,
                              }}
                            >
                              <h2>{watch("instructorTitle")}</h2>
                              {/* <h2>Head Of Marketing</h2> */}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="2xl:max-w-[361px] w-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className=" rounded-lg font-abhaya">
                    <Accordion
                      type="single"
                      collapsible
                      className="p-0 rounded-lg "
                    >
                      <AccordionItem value="item-1" className="p-0 ">
                        <AccordionTrigger className="p-2 h-[48px] ">
                          <h2 className="font-semibold font-abhaya">
                            Certificate Template
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-2 pb-4 border-t">
                          <InputWithLabel
                            label="Certificate Template Name"
                            type="text"
                            labelClassName="font-semibold text-[16px] pb-1 pt-1"
                            className="mt-2 p-[11px] font-abhaya"
                            placeholder="Certificate template name"
                            {...register("templateName")}
                          />
                          {errors?.templateName && (
                            <ErrorMessage
                              message={errors?.templateName?.message as string}
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="border mt-5 p-2">
                    <div className="mt-2 p-2">
                      <h2 className="font-semibold font-abhaya mb-1">
                        Upload Background Image
                      </h2>
                      <div className="">
                        <FileUpload
                          handleDrop={(e) => {
                            setValue("backgroundImage", e);
                            handleUploadFile(e, "backgroundImage");
                          }}
                          acceptType=".jpg,.png"
                          className=" cursor-pointer p-[11px] "
                          isvalidation
                          isExactDimension
                          validationValue={{ width: 1030, height: 734 }}
                        >
                          <div className="flex items-center gap-2 sm:mb-0 mb-3 font-semibold font-abhaya w-[323px] ">
                            <span className="border p-1 rounded-md text-[#515151]">
                              Choose File
                            </span>
                            <span className="p-0">No file chosen</span>
                          </div>
                          {imagepending && <Loader />}
                        </FileUpload>
                        {errors?.backgroundImage && (
                          <ErrorMessage
                            message={errors?.backgroundImage?.message as string}
                          />
                        )}
                        <h3 className="text-[#A3A3A3] text-[15px] font-abhaya mt-2 w-[155px] h-[44px]">
                          Accepted Files: JPG, PNG <br />
                          Accepted Size: 1030 x 734
                        </h3>
                      </div>
                    </div>
                    <div className=" p-2">
                      <h2 className="font-semibold font-abhaya mb-1">
                        Upload Logo Image
                      </h2>
                      <div>
                        <FileUpload
                          handleDrop={(e) => {
                            setValue("companyLogo1", e);
                            handleUploadFile(e, "companyLogo1");
                          }}
                          className=" cursor-pointer p-[11px]"
                          acceptType=".jpg,.png"
                        >
                          <div className="flex items-center gap-3 sm:mb-0 mb-3 font-semibold font-abhaya w-[323px] ">
                            <span className="border p-1 rounded-md text-[#515151]">
                              Choose File
                            </span>
                            <span className="p-0">No file chosen</span>
                          </div>
                          {imagepending && <Loader />}
                        </FileUpload>
                        {errors?.companyLogo1 && (
                          <ErrorMessage
                            message={errors?.companyLogo1?.message as string}
                          />
                        )}
                        <h3 className="text-[#A3A3A3] text-[15px] font-abhaya mt-2 w-[155px] h-[44px]">
                          Accepted Files: JPG, PNG <br />
                          Accepted Size: 1030 x 734
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Accordion
                      type="single"
                      collapsible
                      className="p-0 mt-5 rounded-lg "
                    >
                      <AccordionItem value="item-1" className="p-0">
                        <AccordionTrigger className="p-2 h-[48px] ">
                          <h2 className="font-semibold font-abhaya">
                            Certificate Title
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-2 pb-4 border-t">
                          <InputWithLabel
                            label="Enter Certificate Title"
                            type="text"
                            labelClassName="font-semibold text-[16px] pb-1 pt-1 font-abhaya"
                            className="mt-2 p-[11px] font-abhaya"
                            placeholder="Certificate title"
                            {...register("title")}
                          />
                          {errors?.title && (
                            <ErrorMessage
                              message={errors?.title?.message as string}
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="rounded-lg mt-5">
                    <Accordion
                      type="single"
                      collapsible
                      className="p-0 mt-5 rounded-lg "
                    >
                      <AccordionItem value="item-1" className="p-0">
                        <AccordionTrigger className="p-2 h-[48px] ">
                          <h2 className="font-semibold font-abhaya">
                            Employee Name
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-2 pb-4 border-t">
                          <InputWithLabel
                            label="Employee Name"
                            type="text"
                            onChange={(e) => {
                              if (e.target.value?.length <= 50) {
                                setEmpName(e.target.value);
                              }
                            }}
                            value={empName}
                            labelClassName="font-semibold font-abhaya text-[16px] pb-1 pt-1"
                            className="mt-2 p-[11px] font-abhaya"
                            placeholder="Employee Name"
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div>
                    <Accordion
                      type="single"
                      collapsible
                      className="p-0 rounded-lg mt-5"
                    >
                      <AccordionItem value="item-1" className="p-0">
                        <AccordionTrigger className="p-2 h-[48px]">
                          <h2 className="font-semibold font-abhaya">Body</h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-2 pb-4 border-t">
                          <InputWithLabel
                            label="Enter certificate body text"
                            type="text"
                            maxLength={100}
                            className="mt-2 p-[11px] font-abhaya"
                            labelClassName="font-semibold font-abhaya text-[16px] pb-1 pt-1"
                            placeholder="[name] [course] Lorem ipsum dolor sit amet, consectetur adipiscing elit. A id amet metus pellentesque ac diam feugiat. Proin neque, enim sit tellus enim. Sed in nulla feugiat enim est lobortis euismod neque in."
                            {...register("bodyText")}
                          />
                          {errors?.bodyText && (
                            <ErrorMessage
                              message={errors?.bodyText?.message as string}
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div>
                    <Accordion
                      type="single"
                      collapsible
                      className="p-0 rounded-lg mt-5"
                    >
                      <AccordionItem value="item-1" className="p-0">
                        <AccordionTrigger className="p-2 h-[48px] ">
                          <h2 className="font-semibold font-abhaya">
                            Signature Title 01
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-2 pb-2 border-t">
                          <InputWithLabel
                            label="Title"
                            type="text"
                            className="mt-2 p-[11px] font-abhaya"
                            labelClassName="font-semibold font-abhaya text-[16px] pb-1 pt-1"
                            placeholder="Administrator"
                            {...register("administratorTitle")}
                          />
                          {errors?.administratorTitle && (
                            <ErrorMessage
                              message={
                                errors?.administratorTitle?.message as string
                              }
                            />
                          )}
                        </AccordionContent>

                        <AccordionContent className="p-2 pb-4">
                          <Label className="font-semibold font-abhaya ">
                            Signature
                          </Label>
                          <FileUpload
                            handleDrop={(e) => {
                              setValue("administratorSignature", e);
                              handleUploadFile(e, "administratorSignature");
                            }}
                            className=" cursor-pointer p-[11px] mt-2"
                          >
                            <div className="flex items-center gap-2 sm:mb-0 mb-3 font-semibold font-abhaya w-[323px] ">
                              <span className="border p-1 rounded-md text-[#515151]">
                                Choose File
                              </span>
                              <span className="p-0">No file chosen</span>
                            </div>
                            {imagepending && <Loader />}
                          </FileUpload>
                          {errors?.administratorSignature && (
                            <ErrorMessage
                              message={
                                errors?.administratorSignature
                                  ?.message as string
                              }
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div>
                    <Accordion
                      type="single"
                      collapsible
                      className="p-0 rounded-lg mt-5"
                    >
                      <AccordionItem value="item-1" className="p-0">
                        <AccordionTrigger className="p-3 ">
                          <h2 className="font-semibold font-abhaya">
                            Signature Title 02
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-3 border-t">
                          <InputWithLabel
                            label="Title"
                            type="text"
                            className="mt-2 p-[11px] font-abhaya"
                            labelClassName="font-semibold font-abhaya text-[16px] pb-1 pt-1"
                            placeholder="Instructor"
                            {...register("instructorTitle")}
                          />
                          {errors?.instructorTitle && (
                            <ErrorMessage
                              message={
                                errors?.instructorTitle?.message as string
                              }
                            />
                          )}
                        </AccordionContent>

                        <AccordionContent className="p-3 pt-0">
                          <Label className="font-semibold font-abhaya ">
                            Signature
                          </Label>
                          <FileUpload
                            handleDrop={(e) => {
                              setValue("instructorSignature", e);
                              handleUploadFile(e, "instructorSignature");
                            }}
                            className=" cursor-pointer p-[11px] mt-2"
                          >
                            <div className="flex items-center gap-2 sm:mb-0 mb-3 font-semibold font-abhaya w-[323px] ">
                              <span className="border p-1 rounded-md text-[#515151]">
                                Choose File
                              </span>
                              <span className="p-0">No file chosen</span>
                            </div>
                            {imagepending && <Loader />}
                          </FileUpload>
                          {errors?.instructorSignature && (
                            <ErrorMessage
                              message={
                                errors?.instructorSignature?.message as string
                              }
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className="mt-5 text-center ">
                    <Button
                      type="submit"
                      disabled={update_Panding || loading}
                      className="bg-[#58BA66] text-white w-full"
                    >
                      {(update_Panding || loading) && (
                        <Loader2
                          className={"h-5 w-5 animate-spin text-white"}
                        />
                      )}
                      <span>SAVE CERTIFICATE</span>
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* <Loading isLoading={update_Panding} /> */}
    </div>
  );
};

export default Addcertificate;
