import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // default axios

  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);
  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
