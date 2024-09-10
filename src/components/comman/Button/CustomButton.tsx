import React, { ReactElement } from "react";

interface InputProps {
  name: string | ReactElement;
  className?: string;
  symbol?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  isLink?: boolean;
  auth?: boolean;
  href?: string;
}

export const PrimaryButton: React.FC<InputProps> = ({
  type = "submit",
  name,
  className,
  symbol,
  onClick,
  auth = false,
  disabled = false,
}) => {
  console.log("auth", auth);

  return (
    <button
      className={`button-color top-94 left-823 text-color rounded hover:bg-[#489db0] !font-abhaya ${
        disabled ? "cursor-not-allowed opacity-80" : ""
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {symbol && <span className="">{symbol}</span>}
      {name}
    </button>
  );
};

export const SecondaryButton: React.FC<InputProps> = ({
  name,
  symbol,
  className,
  onClick,
  isLink = false,
  href = "",
}) => {
  return (
    <>
      {isLink ? (
        <a
          className={`top-94 left-823 rounded text-color !font-abhaya ${className}`}
          href={href}
          target="_blank"
        >
          {name}
          {symbol && <span className="">{symbol}</span>}
        </a>
      ) : (
        <button
          type="button"
          className={`top-94 left-823 rounded secondary-text !font-abhaya ${className}`}
          onClick={onClick}
        >
          {name}
          {symbol && <span className="">{symbol}</span>}
        </button>
      )}
    </>
  );
};
