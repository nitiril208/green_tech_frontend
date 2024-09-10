import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  disable?: boolean;
  isMendatory?: boolean;
}

const InputWithLable = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, label, disable = false, isMendatory = false, ...props },
    ref
  ) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label className="mb-[8px]  font-bold text-[16px]">
            {label}{" "}
            <span className="text-red-500">{isMendatory ? "*" : ""}</span>{" "}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "h-10 w-full rounded-md border border-input bg-background px-3 py-2 focus:border-[#4b4b4b] shadow-none outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#A3A3A3] disabled:cursor-default disabled:opacity-50",
            className
          )}
          ref={ref}
          disabled={disable}
          {...props}
        />
      </div>
    );
  }
);
InputWithLable.displayName = "InputLabel";

export { InputWithLable };
