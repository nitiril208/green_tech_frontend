import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { forwardRef } from "react";
import { Button } from "../ui/button";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";
import FormError from "./FormError";

type InputWithLabelProps = InputProps & {
  label?: string;
  labelNote?: string;
  error?: string;
  className?: string;
  id?: number | string;
  name?: string;
  placeholder?: string;
  mainClassName?: string;
  icon?: React.ReactNode;
  labelClassName?: string;
  isShowErrorBorder?: boolean;
};

const PasswordInputWithLabel = forwardRef<
  HTMLInputElement,
  InputWithLabelProps
>(
  (
    {
      label,
      className,
      id,
      mainClassName,
      name,
      error,
      icon,
      labelNote,
      placeholder,
      labelClassName,
      isShowErrorBorder,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState("password");

    const toggleShowPassword = () => {
      setShowPassword((prev) => (prev === "password" ? "text" : "password"));
    };

    return (
      <div className={cn(``, mainClassName)}>
        {label && (
          <Label
            className={cn(" font-bold text-[16px]", labelClassName)}
            htmlFor={id}
          >
            {label}
            <span className="ps-1.5 text-xs text-destructive">{labelNote}</span>
          </Label>
        )}
        <div
          className={cn(
            "relative items-center gap-1 overflow-hidden mt-[8px]",
            icon ? "flex" : ""
          )}
        >
          <Input
            {...rest}
            id={id}
            type={showPassword}
            name={name}
            ref={ref}
            placeholder={placeholder}
            className={cn(
              `h-auto`,
              { "border-red-500": isShowErrorBorder && error },
              className
            )}
          />
          <Button
            variant={"ghost"}
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-auto p-0"
          >
            {showPassword !== "text" ? <EyeIcon /> : <EyeOffIcon />}
          </Button>
        </div>
        {error && <FormError message={error} />}
      </div>
    );
  }
);

export default PasswordInputWithLabel;
