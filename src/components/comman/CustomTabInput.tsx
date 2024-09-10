import { Dispatch, SetStateAction, useState } from "react";
import { InputProps } from "../ui/input";

type InputWithLabelProps = InputProps & {
  setValue: Dispatch<SetStateAction<string[]>>;
};

const CustomTabInput = ({ setValue }: InputWithLabelProps) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: any) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      const newEmail: string = inputValue.trim();

      if (validateEmail(newEmail) && !emails.includes(newEmail)) {
        setEmails([...emails, newEmail]);
        setValue((prev: string[]) => [...prev, newEmail]);
        setInputValue("");
      }
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[cC][oO][mM]$/i;
    return re.test(String(email).toLowerCase());
  };

  const removeEmail = (emailToRemove: string) => {
    setValue(emails.filter((email) => email !== emailToRemove));
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  return (
    <div className="flex flex-wrap gap-2 border p-3 rounded mt-2">
      {emails.map((email, index) => (
        <div
          key={index}
          className="flex items-center bg-stone-300 px-3 py-1 rounded-sm"
        >
          {email}
          <button
            className="ml-2 bg-none border-none cursor-pointer font-abhaya"
            onClick={() => removeEmail(email)}
          >
            x
          </button>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Enter email and Press Enter"
        className="flex-grow border-none shadow-none outline-none"
      />
    </div>
  );
};

export default CustomTabInput;
