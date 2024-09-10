import React, { ChangeEvent } from "react";

interface InputProps {
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  disable?: boolean;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  value,
  className,
  label,
  placeholder,
  disable = false,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={rest.name} className="block">
        {label}
      </label>
      <input
        value={value}
        placeholder={placeholder}
        disabled={disable}
        className={`h-[46px] border-[1.53px] border-solid border-[#DFDFDF] rounded-[4px] lg:w-[180px] sm:w-[180px] md:w-[170px] p-3 font-normal placeholder-[#AEACAC] focus:border focus:border-[#4b4b4b] shadow-none outline-none ${
          className || ""
        }`}
        {...rest}
      />
    </div>
  );
};

export default Input;
