import person from "@/assets/images/person.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsSearch } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface Message {
  id: number;
  name: string;
  message: string;
  date: string;
  unread: boolean;
  avatar: string;
}

const messages: Message[] = [
  {
    id: 1,
    name: "Theresa Webb",
    message: "Lorem ipsum dolor sit amet...",
    date: "Apr 10",
    unread: true,
    avatar: person,
  },
  {
    id: 2,
    name: "Theresa Webb",
    message: "Lorem ipsum dolor sit amet...",
    date: "Apr 10",
    unread: false,
    avatar: person,
  },
  {
    id: 3,
    name: "Theresa Webb",
    message: "Lorem ipsum dolor sit amet...",
    date: "Apr 10",
    unread: false,
    avatar: person,
  },
  {
    id: 4,
    name: "Theresa Webb",
    message: "Lorem ipsum dolor sit amet...",
    date: "Apr 10",
    unread: false,
    avatar: person,
  },
  {
    id: 5,
    name: "Theresa Webb",
    message: "Lorem ipsum dolor sit amet...",
    date: "Apr 10",
    unread: false,
    avatar: person,
  },
  {
    id: 6,
    name: "Theresa Webb",
    message: "Lorem ipsum dolor sit amet...",
    date: "Apr 10",
    unread: false,
    avatar: person,
  },
];

function MessagePopup() {
  return (
    <div className="flex justify-center md:justify-end md:ml-[700px] md:mt-[600px]">
      <Popover>
        <PopoverTrigger>
          <MdKeyboardArrowUp className="h-5 w-5 text-gray-700" />
        </PopoverTrigger>
        <PopoverContent className="md:h-[550px]  md:w-[335px]">
          <div className="border-b">
            <div className="flex items-center ml-4 h-[70px]">
              <img
                src={person}
                alt="Profile"
                className="h-[40px] w-[40px] rounded-full"
              />
              <div className="flex-grow ml-2 flex flex-col items-start justify-center">
                <span className="text-gray-900 font-semibold">Messaging</span>
              </div>
              <MdKeyboardArrowDown className="h-5 w-5 mr-2 text-gray-700" />
            </div>
          </div>
          <div className="flex mt-[10px] ml-[14px] items-center border border-[#D9D9D9] rounded-md px-4 py-2 w-[90%] sm:w-[305px] h-[40px] text-[#A3A3A3]">
            <BsSearch className="text-[#D9D9D9] mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 mr-2 focus: placeholder-[#A3A3A3] text-sm"
            />
          </div>
          <div className="w-[100%] sm:w-[335px]">
            {messages.map((message) => (
              <div key={message.id} className="flex items-center p-2 border-b">
                <img
                  src={message.avatar}
                  className="w-[40px] h-[40px] rounded-full mr-3"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-[16px]">
                        {message.name}
                      </h4>
                      <h4 className="text-[12] text-[#606060]">
                        {message.message}
                      </h4>
                    </div>
                    <div className="flex-col">
                      <span className="text-sm text-gray-900">
                        {message.date}
                      </span>
                      {message.unread && (
                        <div className="ml-6 bg-green-500 text-white rounded-full w-[17px] h-[17px] flex items-center justify-center text-[12px]">
                          1
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default MessagePopup;
