import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/Auth.jsx";
import CategoryContextProvider from "./context/CategoryContext.jsx";
import ProductContextProvider from "./context/ProductContext.jsx";
import SidebarContextProvider from "./context/SidebarContext.jsx";
import SearchContextProvider from "./context/SearchContext.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import OrderContextProvider from "./context/OrderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CategoryContextProvider>
          <ProductContextProvider>
            <CartContextProvider>
              <OrderContextProvider>
                <SidebarContextProvider>
                  <SearchContextProvider>
                    <Toaster />
                    <App />
                  </SearchContextProvider>
                </SidebarContextProvider>
              </OrderContextProvider>
            </CartContextProvider>
          </ProductContextProvider>
        </CategoryContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
