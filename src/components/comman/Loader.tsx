import { cn } from "@/lib/utils";
import { Loader2, LucideProps } from "lucide-react";

interface LoaderProps extends LucideProps {
  containerClassName?: string;
}

const Loader = ({ className, containerClassName, ...props }: LoaderProps) => {
  return (
    <div
      className={cn(
        "flex h-[200px] items-center justify-center text-center",
        containerClassName
      )}
    >
      <Loader2
        className={cn("h-5 w-5 animate-spin text-primary", className)}
        {...props}
      />
    </div>
  );
};

export default Loader;
