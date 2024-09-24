import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./Auth";

export const orderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const { auth } = useContext(authContext);
  const [formOrderData, setFormOrderData] = useState({
    userId: "",
    products: [],
    paymentMethod: "",
  });


  return (
    <orderContext.Provider value={{  }}>
      {children}
    </orderContext.Provider>
  );
};

export default OrderContextProvider;
