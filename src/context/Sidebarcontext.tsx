import React from "react";
interface SidebarProviderValue {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = React.createContext<SidebarProviderValue>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
});

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const value: SidebarProviderValue = { sidebarOpen, setSidebarOpen };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
