import React, { createContext, useState } from "react";

export const searchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const [openSearch, setOpenSearch] = useState(false);

  const toggleSearch = ()=>{
    setOpenSearch(!openSearch);
  }
  return (
    <searchContext.Provider value={{ openSearch, setOpenSearch,toggleSearch }}>
      {children}
    </searchContext.Provider>
  );
};

export default SearchContextProvider;
