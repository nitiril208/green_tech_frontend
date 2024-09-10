import { cn } from "@/lib/utils";
import React, { forwardRef, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Textarea, TextareaProps } from "../ui/textarea";
import FormError from "./FormError";

type InputWithLabelProps = TextareaProps & {
  label?: string;
  error?: string;
  className?: string;
  id?: number | string;
  name?: string;
  maxLength?: number | undefined; // Maximum character limit
  isLength?: boolean;
  onChange?:
    | (React.ChangeEventHandler<HTMLTextAreaElement> &
        ((event: React.ChangeEvent<HTMLTextAreaElement>) => void))
    | undefined;
  value?: string;
  mainClassName?: string;
  labelClassName?: string;
};

const TextAreaWithLabel = forwardRef<HTMLTextAreaElement, InputWithLabelProps>(
  (
    {
      label,
      className,
      id,
      name,
      error,
      maxLength,
      onChange,
      isLength = true,
      value,
      mainClassName,
      labelClassName,
      ...rest
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState<number>(0);

    useEffect(() => {
      if (value) {
        setCharCount(value?.length || 0);
      }
    }, [value]);
    const handleInputChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const inputValue = event.target.value;
      setCharCount(inputValue?.length);
      onChange && onChange(event);
    };

    return (
      <div className={cn(`space-y-2`, mainClassName)}>
        {label && (
          <Label
            className={`font-primary text-[14px] font-[400] leading-normal text-[#111821] md:text-[14px] ${labelClassName}`}
            htmlFor={id}
          >
            {label}
          </Label>
        )}
        <div className={`relative grid items-center gap-1 overflow-hidden`}>
          <Textarea
            id={id}
            name={name}
            ref={ref}
            value={value}
            maxLength={maxLength}
            className={`resize-none overflow-hidden focus:border-[#4b4b4b] shadow-none outline-none ${className}`}
            onChange={handleInputChange}
            {...rest}
          />
          {isLength && (
            <div className="absolute bottom-[10px] right-[10px] font-primary text-[14px] leading-[14px] text-[#AAACB0]">
              {charCount}/{maxLength}
            </div>
          )}
        </div>
        {error && <FormError message={error} />}
      </div>
    );
  }
);

export default TextAreaWithLabel;
