import { createContext, useContext, useState } from "react";

type ChatBotContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  group: any;
  setGroupData: (grp: any) => void;
};
export const ChatBotContext = createContext<ChatBotContextType>({
  open: false,
  setOpen: () => {},
  group: null,
  setGroupData: () => {},
});

export const ChatBotProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState(false);
  const setGroupData = (grp: any) => {
    setGroup(grp);
  };
  return (
    <ChatBotContext.Provider value={{ open, setOpen, group, setGroupData }}>
      {children}
    </ChatBotContext.Provider>
  );
};

export const useChatBotContext = () => {
  return useContext(ChatBotContext);
};
