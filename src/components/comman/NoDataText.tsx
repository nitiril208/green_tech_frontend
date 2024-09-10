import { cn } from "@/lib/utils";

type NoDataTextProps = {
  message: string;
  className?: string;
};
const NoDataText = ({ message, className }: NoDataTextProps) => {
  return (
    <p
      className={cn(
        "text-[20px] font-calibri font-[500] h-[200px] flex items-center text-gray-200 justify-center col-span-full",
        className
      )}
    >
      {message}
    </p>
  );
};

export default NoDataText;
