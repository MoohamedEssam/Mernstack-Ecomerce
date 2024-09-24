import React, { createContext, useEffect, useState } from "react";

export const sidebarContext = createContext();

const SidebarContextProvider = ({ children }) => {
  const [openSide, setOpenSide] = useState(false);

  const toggleSide = () => {
    setOpenSide(!openSide);
  };

  return (
    <sidebarContext.Provider value={{ openSide, setOpenSide, toggleSide }}>
      {children}
    </sidebarContext.Provider>
  );
};

export default SidebarContextProvider;
