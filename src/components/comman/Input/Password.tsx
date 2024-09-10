import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  validationHandler?: any;
}

const PasswordInput: React.FC<InputProps> = ({
  label,
  className,
  placeholder,
  validationHandler,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="">
      <label className="font-bold text-[16px]">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className={`h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:border focus:border-[#4b4b4b] shadow-none outline-none ${className}`}
          placeholder={placeholder}
          {...validationHandler}
          {...rest}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 px-3 mt-2 flex items-center !font-abhaya"
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
