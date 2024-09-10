import { FC } from "react";

interface FormErrorProps {
  message: string | undefined;
  className?: string;
}

const FormError: FC<FormErrorProps> = ({ message, className }) => {
  return (
    <span className={`font-primary font-calibri text-sm text-red-400 ${className}`}>
      {message}
    </span>
  );
};

export default FormError;
