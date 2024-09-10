import dropFile from "@/assets/images/drop_file-img.png";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { allocateCertificate } from "@/services/apiServices/certificate";
import { uploadFile } from "@/services/apiServices/upload";
import { UserRole } from "@/types/UserRole";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

const AllocateCertificateModalDetails = ({
  course,
  data,
  setIsOpenAllocate,
}: any) => {
  const [isDragging, setIsDragging] = useState(false);
  const [upload, setUpload] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const { mutate: allocate, isPending } = useMutation({
    mutationFn: allocateCertificate,
    onSuccess: () => {
      toast({
        description: "Certificate issued successfully",
      });
      setIsOpenAllocate(false);
      setUpload("");
      setIsDragging(false);
    },
    onError: (error: any) => {
      toast({
        description: error?.message,
        variant: "destructive",
      });
    },
  });

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Handle drag over
  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handaleUpload(files, "isDrag");
    }
  };

  const { mutate: createImageUpload, isPending: imagepending } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      toast({ title: "Image Uploaded Successfully", variant: "default" });
      setUpload(data?.data?.data?.file);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    },
  });

  const handaleUpload = (e: any, name?: string) => {
    const files = name === "isDrag" ? e : e.target.files;

    createImageUpload(files[0]);
  };

  const handleIssueCertificate = () => {
    const payload = {
      user: userData?.query?.id,
      status: 1,
      course: course?.mainCourse?.id,
      trainee: course?.course?.trainerId?.id,
      trainerCompany: course?.course?.trainerCompanyId?.id,
      employee: +data?.id,
      certificatePdf: upload,
    };

    allocate(payload);
  };
  return (
    <div className="text-center">
      <h3 className="text-xl font-abhaya font-bold pb-5">
        Issue A Certificate
      </h3>
      <p className="text-[#606060] text-[15px] font-abhaya leading-[15px]">
        And share the great news of passing with the user!
      </p>
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border border-dashed border-[#D9D9D9] p-10 mb-8 rounded-md ${
          isDragging ? "border-blue-500" : ""
        }`}
      >
        <div className="text-center">
          {imagepending ? (
            <Loader />
          ) : upload ? (
            <p className="text-[#9E9E9E] text-sm pb-6 font-calibri py-8">
              {upload}
            </p>
          ) : (
            <>
              <img src={dropFile} className="m-auto pb-6" />
              <h6 className="text-[#9E9E9E] text-sm pb-6 font-calibri">
                Drag and drop files here
              </h6>
              <h5 className="uppercase text-[#9E9E9E] pb-6 font-inter">-OR-</h5>
            </>
          )}
          <input type="file" id="upload" accept=".pdf" className="hidden" />
          <label
            htmlFor="upload"
            className=" text-base rounded-md font-calibri inline-block text-white bg-[#42A7C3] py-5 px-14 cursor-pointer"
          >
            Browse Files
          </label>
        </div>
      </div>
      <h5 className="text-xl font-bold font-calibri pb-4">OR</h5>
      <h6 className="text-base font-calibri pb-8">
        System Generated Certificate :
        <Link
          to={`/${UserRole[
            userData?.query?.role
          ]?.toLowerCase()}/allocated-certificate`}
          className="text-[#4285F4] ps-2"
        >
          Generate Now
        </Link>
      </h6>
      <Button
        type="button"
        onClick={handleIssueCertificate}
        isLoading={isPending}
        disabled={!upload}
        className=" text-base rounded-md font-nunito text-white bg-[#58BA66] py-7 px-3"
      >
        Issue A Certificate
      </Button>
    </div>
  );
};

export default AllocateCertificateModalDetails;
