import { readCSVFile } from "@/services/apiServices/uploadServices";
import { ErrorType } from "@/types/Errors";
import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, DragEvent, forwardRef } from "react";
import { useToast } from "../ui/use-toast";
import { uploadFile } from "@/services/apiServices/uploadServices";

interface FileUploadProps {
  handleDrop: (file: string) => void;
  children: React.ReactNode;
  className?: string;
  acceptType?: string;
  isvalidation?: boolean;
  validationValue?: validationValueType;
  isCSV?: boolean;
  isExactDimension?: boolean;
}

interface validationValueType {
  width: number;
  height: number;
  size?: number;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      handleDrop,
      children,
      className,
      acceptType,
      isvalidation,
      validationValue,
      isExactDimension,
      isCSV = false,
      ...props
    },
    ref
  ) => {
    const { toast } = useToast();
    const { mutate: upload_file, isPending: FileUploadPending } = useMutation({
      mutationFn: (file: any) => (isCSV ? readCSVFile(file) : uploadFile(file)),
      onSuccess: (data) => {
        if (isCSV) {
          handleDrop(data.data.data);
        } else {
          handleDrop(data.data.data.file);
        }
      },
      onError: (error: ErrorType) => {
        toast({
          variant: "destructive",
          title: error.data.message,
        });
      },
    });

    const [dragging, setDragging] = React.useState(false);

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

    const handleDropEvent = (event: DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      setDragging(false);
      const file = event.dataTransfer.files[0];
      if (file) {
        if (isvalidation) {
          handleFileValidation(file);
        } else {
          upload_file(file);
        }
      }
    };

    const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const file = event.target.files && event.target.files[0];
      if (file) {
        if (isvalidation) {
          handleFileValidation(file);
        } else {
          upload_file(file);
        }
      }
    };

    const handleFileValidation = (file: any) => {
      if (file) {
        // Check file size
        if (validationValue?.size) {
          if (file.size > validationValue?.size * 1024 * 1024) {
            // 18MB in bytes
            toast({
              variant: "destructive",
              title: `File size exceeds ${validationValue?.size}MB`,
            });
            return;
          }
        }

        // Check image dimensions
        if (validationValue?.width || validationValue?.height) {
          const img = new Image();
          img.src = URL.createObjectURL(file);
          img.onload = () => {
            if (isExactDimension) {
              if (
                img.width === validationValue?.width &&
                img.height === validationValue?.height
              ) {
                upload_file(file);
              } else {
                toast({
                  variant: "destructive",
                  title: `Image dimensions must be ${validationValue?.width}x${validationValue?.height} pixels`,
                });
              }
            } else {
              if (
                img.width >= validationValue?.width ||
                img.height >= validationValue?.height
              ) {
                toast({
                  variant: "destructive",
                  title: `Image dimensions must be ${validationValue?.width}x${validationValue?.height} pixels`,
                });
              } else {
                upload_file(file);
              }
            }
          };
        } else {
          upload_file(file);
        }
      }
    };

    return (
      <label
        className={`flex flex-col rounded-lg border-[1px] border-dashed border-[#D9D9D9] p-10 group text-center ${className} ${
          dragging ? "border-blue-500" : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDropEvent}
      >
        {!FileUploadPending ? (
          <>
            {children}
            <input
              type="file"
              ref={ref}
              className="hidden"
              accept={acceptType}
              {...props}
              onChange={(e) => handleFileSelect(e)}
            />
          </>
        ) : (
          <h1>loading....</h1>
        )}
      </label>
    );
  }
);

export default FileUpload;
