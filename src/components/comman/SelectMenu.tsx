import { cn } from "@/lib/utils";
import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Loader from "./Loader";

interface IProps {
  className?: string;
  placeholder?: string;
  option: {
    label: string;
    value: string;
  }[];
  setValue:
    | React.Dispatch<React.SetStateAction<string>>
    | ((e: string) => void);
  value: string;
  itemClassName?: string;
  containClassName?: string;
  defaultValue?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const SelectMenu: FC<IProps> = ({
  className,
  placeholder,
  option,
  setValue,
  value,
  itemClassName,
  containClassName,
  defaultValue,
  disabled = false,
  isLoading = false,
}) => {
  return (
    <Select
      onValueChange={(e) => setValue(e)}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <SelectTrigger
        className={cn("bg-white", className, {
          "text-[#A3A3A3]": !value,
        })}
      >
        <SelectValue className="text-[#A3A3A3]" placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        className={cn(
          `bg-white max-h-[250px] w-full overflow-auto`,
          containClassName
        )}
      >
        {isLoading ? (
          <Loader />
        ) : option?.length > 0 ? (
          option.map((item, index: number) => (
            <SelectItem
              key={index}
              value={item.value}
              className={`font-calibri ${itemClassName}`}
            >
              {item.label}
            </SelectItem>
          ))
        ) : (
          <span className="text-center block py-1">No data found</span>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectMenu;
