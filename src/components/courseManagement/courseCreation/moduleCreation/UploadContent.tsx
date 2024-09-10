/* eslint-disable @typescript-eslint/ban-ts-comment */
import uploadImg from "@/assets/images/drop_file-img.png";
import FormError from "@/components/comman/FormError";
import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { fileValidation, getFileType } from "@/lib/utils";
import { uploadFile } from "@/services/apiServices/moduleCreation";
import { SectionCreation } from "@/types/modulecreation";
import { useMutation } from "@tanstack/react-query";
import { CircleX } from "lucide-react";
import { DragEvent, useEffect, useState } from "react";
import SelectDoumentType from "./SelectDoumentType";

interface UploadContentProps {
  data: SectionCreation;
  moduleIndex?: number;
  sectionIndex?: number;
  register: any;
  setValue: any;
  errors: any;
  setUrlError: (e: any) => void;
  setIsUploading?: any;
}

const UploadContent = ({
  errors,
  setValue,
  data,
  moduleIndex,
  sectionIndex,
  setUrlError,
  setIsUploading,
}: UploadContentProps) => {
  const [isOpenUploadDocumnet, setIsOpenUploadDocumnet] = useState(false);
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  //@ts-ignore
  const FileType = getFileType(data.uploadContentType);

  useEffect(() => {
    if (data.uploadedContentUrl) {
      const filename = data.uploadedContentUrl.split("/").at(-1);
      setFileName(filename || "");
      setUploadProgress(100);
    }
  }, [data]);
  console.log("data++++", data);

  const onSelectedDocumentType = (type: number) => {
    setIsOpenUploadDocumnet(false);
    if (moduleIndex !== undefined && sectionIndex !== undefined) {
      setValue(
        `modules.${moduleIndex}.section.${sectionIndex}.uploadContentType`,
        type
      );
      setValue(`modules.${moduleIndex}.section.${sectionIndex}.youtubeUrl`, "");
      setUrlError("");
    } else {
      setValue(`uploadContentType`, type);
      setValue(`youtubeUrl`, "");
      setUrlError("");
    }
  };

  const progress = (val: any) => {
    setUploadProgress(val);
  };

  const { mutate: FileUpload } = useMutation({
    mutationFn: (data: any) => uploadFile(data, progress),
    onSuccess: (data) => {
      setIsUploading(false);
      if (moduleIndex !== undefined && sectionIndex !== undefined) {
        setValue(
          `modules.${moduleIndex}.section.${sectionIndex}.uploadedContentUrl`,
          data.data.data.file
        );
      } else {
        setValue(`uploadedContentUrl`, data.data.data.file);
      }
    },
    onError: (error: any) => {
      console.error("error", error);
    },
  });

  const handleDragEnter = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    setDragging(false);
    event.preventDefault();
  };

  const removeFile = () => {
    if (moduleIndex !== undefined && sectionIndex !== undefined) {
      setValue(`uploadedContentUrl`, 0);
    } else {
      const fileInput = document.getElementById(
        `modules.${moduleIndex}.section.${sectionIndex}`
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = ""; // Clear the file input value
      }
      setValue(`uploadedContentUrl`, "");
    }
    setFileName("");
    setUploadProgress(0);
  };
  console.log("data1234", data);

  const handleDropEvent = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const validate = fileValidation(file.name, FileType?.fileType);
      if (validate) {
        setFileName(file.name);
        setUploadProgress(0);
        FileUpload(file);
      } else {
        toast({
          variant: "destructive",
          title: `Only ${FileType?.fileType.join(", ")} files are allowed.`,
        });
      }
    }
  };

  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    console.log("file", file);

    if (file) {
      const validate = fileValidation(file.name, FileType?.fileType);
      if (validate) {
        setIsUploading(true);
        setFileName(file.name);
        setUploadProgress(0);
        FileUpload(file);
      } else {
        toast({
          variant: "destructive",
          title: `Only ${FileType?.fileType.join(", ")} files are allowed.`,
        });
        setIsUploading(false);
      }
    }
  };

  let errorkey;
  if (moduleIndex !== undefined && sectionIndex !== undefined) {
    errorkey = errors.modules?.[moduleIndex]?.section?.[sectionIndex];
    console.log("🚀 ~ errorkey:", errorkey);
  } else {
    errorkey = errors;
  }

  const removeUploadContent = () => {
    console.log(
      "setIsOpenUploadDocumnet",
      `modules.${moduleIndex}.section.${sectionIndex}.uploadContentType`
    );
    if (moduleIndex !== undefined && sectionIndex !== undefined) {
      setValue(
        `modules.${moduleIndex}.section.${sectionIndex}.uploadContentType`,
        0
      );
      setValue(
        `modules.${moduleIndex}.section.${sectionIndex}.uploadedContentUrl`,
        ""
      );
    } else {
      setValue(`uploadContentType`, 0);
      setValue(`uploadedContentUrl`, "");
    }

    setUploadProgress(0);
    setFileName("");
  };

  console.log("data+++", data);
  console.log("FileType", FileType);
  

  return (
    <div className="">
      {!data.uploadContentType ? (
        <div className="pb-5">
          <h6 className="sm:text-base text-sm font-calibri text-[#515151] pb-2">
            Upload Content
          </h6>
          <div className="border border-[#D9D9D9] rounded-md sm:px-4 sm:py-2 p-2 w-full">
            <Button
              type="button"
              className="bg-[#42A7C3] font-bold text-xs font-calibri px-2 sm:py-3 py-1 sm:h-10 h-8"
              onClick={() => setIsOpenUploadDocumnet(true)}
            >
              Select Upload Document Type
            </Button>
          </div>
          {errorkey?.uploadContentType && (
            <FormError
              className="font-calibri not-italic"
              message={errorkey.uploadContentType?.message}
            />
          )}
        </div>
      ) : (
        <div className="pb-4">
          <div className="justify-between flex align-items-center mb-1">
            <h6 className="sm:text-base text-sm font-calibri text-[#515151]">
              Upload Content
            </h6>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={removeUploadContent}
                className="text-[#FF5252] text-sm bg-transparent hover:bg-transparent font-calibri p-0 gap-1 h-auto"
              >
                <CircleX width={16} />
                Remove
              </Button>
              <Button
                variant={"ghost"}
                type="button"
                onClick={() => {
                  setIsOpenUploadDocumnet(true);
                  removeFile();
                }}
                className="sm:text-base text-sm font-calibri text-[#00778B] p-0 hover:bg-transparent h-auto"
              >
                Change document type
              </Button>
            </div>
          </div>
          <div className="md:p-4 p-2.5 border border-[#D9D9D9] rounded-md bg-[#FBFBFB]">
            <div className="flex md:flex-row flex-col items-center lg:gap-10 gap-5">
              <div className="md:w-2/5 w-full">
                <div className="text-sm font-calibri font-normal text-[#515151] flex items-center lg:mb-5 mb-3">
                  Selected Document Type :{" "}
                  <img
                    src={FileType && FileType.image}
                    alt="Selected Document"
                    className="h-6 w-6"
                  />
                </div>
                <Label
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDropEvent}
                  // htmlFor="fileUpload"
                  className={` bg-white p-5 border border-[#D9D9D9] border-dashed inline-block w-full rounded-lg ${
                    dragging ? "border-blue-500" : ""
                  }`}
                >
                  <div className="text-center">
                    <img
                      src={uploadImg}
                      alt=""
                      className="mx-auto mb-5 sm:w-[75px] w-[55px] sm:h-[70px] h-[50px]"
                    />
                    <h6 className="text-[#9E9E9E] text-xs font-calibri pb-4">
                      Drag and drop files here
                    </h6>
                    <h6 className="text-[#9E9E9E] text-xs font-calibri font-bold pb-4">
                      -OR-
                    </h6>
                    <Label
                      htmlFor={`modules.${moduleIndex}.section.${sectionIndex}`}
                      className="py-3 px-7 bg-[#42A7C3] text-xs font-calibri cursor-pointer rounded text-white"
                    >
                      {/* <Button className="py-3 px-7 bg-[#42A7C3] text-xs font-calibri"> */}
                      Browse Files
                      {/* </Button> */}
                      <input
                        type="file"
                        className="hidden"
                        key={`modules.${moduleIndex}.section.${sectionIndex}`}
                        id={`modules.${moduleIndex}.section.${sectionIndex}`}
                        accept={FileType && FileType?.fileTypeText}
                        onChange={(e) => handleFileSelect(e)}
                      />
                    </Label>
                  </div>
                </Label>
              </div>
              <div className="md:w-3/5 w-full">
                <div className="">
                  <div className="flex justify-between items-center pb-3">
                    <h5 className="text-black text-sm font-calibri">
                      Upload Document
                    </h5>
                    <h6 className="font-calibri text-[10px]">
                      Supported File:- {FileType && FileType.fileTypeText}
                    </h6>
                  </div>
                  <div className="p-5 bg-white rounded-lg shadow-sm relative mb-5">
                    <div className="flex">
                      <div className="">
                        <img
                          src={FileType && FileType.image}
                          alt="Selected Document"
                          className="h-6 w-6"
                        />
                      </div>
                      <div className="flex justify-between items-center ps-5 w-full">
                        <h5 className="text-xs text-black font-calibri">
                          {fileName}
                        </h5>
                        {uploadProgress === 100 && (
                          <h6 className="text-[#159800] text-[10px] font-calibri">
                            Completed
                          </h6>
                        )}
                      </div>
                    </div>
                    <div className="pt-5">
                      <Progress
                        color="#159800"
                        className="w-full h-[3px]"
                        value={uploadProgress}
                      />
                    </div>
                    {fileName && (
                      <div
                        onClick={removeFile}
                        className="absolute top-[5px] right-[5px]"
                      >
                        <CircleX width={16} />
                      </div>
                    )}
                  </div>
                  {errorkey?.uploadedContentUrl && (
                    <FormError
                      className="font-calibri not-italic"
                      message={errorkey.uploadedContentUrl?.message}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {errorkey?.uploadedContentUrl?.uploadContentType && (
            <FormError
              className="font-calibri not-italic"
              message={errorkey?.uploadedContentUrl?.uploadContentType?.message}
            />
          )}
        </div>
      )}

      <Modal
        open={isOpenUploadDocumnet}
        onClose={() => setIsOpenUploadDocumnet(false)}
        className="xl:max-w-[737px] lg:max-w-[650px] sm:max-w-[550px] max-w-[335px] sm:p-5 p-4 rounded-xl"
      >
        <SelectDoumentType
          onSelectedDocumentType={(e) => onSelectedDocumentType(e)}
        />
      </Modal>
    </div>
  );
};

export default UploadContent;
