import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState("materials");
  return (
    <SidebarContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  return useContext(SidebarContext);
}