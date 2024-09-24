import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { authContext } from "./Auth";
import { toast } from "react-toastify";

export const cartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { auth } = useContext(authContext);

  const memoizedGetCart = useMemo(() => {
    const getCart = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/cart");
        setSubtotal(response.data.subtotal);
        setTotal(response.data.total);
        const products = response.data.products;
        const cartItems = products.map((product) => ({
          ...product.productId,
          quantity: product.quantity,
        }));
        setCartItems(cartItems);
        setQuantity(products.map((product) => product.quantity));
      } catch (error) {
        throw error;
      }
    };
    return getCart;
  }, [auth.token]);

  const memoizedAddToCart = useMemo(() => {
    const addToCart = (item) => {
      const isItemInCart = cartItems.find(
        (cartItem) => cartItem._id === item._id
      );

      if (isItemInCart) {
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        );
      } else {
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
    };
    return addToCart;
  }, [cartItems]);

  const memoizedRemoveItem = useMemo(() => {
    const removeItem = (item) => {
      const itemExist = cartItems.find((cartItem) => cartItem._id === item._id);
      if (itemExist.quantity === 1) {
        setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
      } else {
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
        );
      }
    };
    return removeItem;
  }, [cartItems]);

  const memoizedAddCartItem = useMemo(() => {
    const addCartItem = async (item) => {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/cart/${item._id}`,
          item,
          quantity
        );
        memoizedGetCart();
      } catch (error) {
        console.error(error);
      }
    };
    return addCartItem;
  }, [quantity, memoizedGetCart]);

  const memoizedRemoveCartItem = useMemo(() => {
    const removeCartItem = async (item) => {
      try {
        setLoading(true);
        const response = await axios.delete(
          `http://localhost:8000/api/cart/${item._id}`,
          item
        );
        setError(null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        memoizedGetCart();
      }
    };
    return removeCartItem;
  }, [memoizedGetCart]);

  const memoizedUpdateFromCart = useMemo(() => {
    const updateFromCart = async (item, action) => {
      let newQuantity;
      if (action === "decrement") {
        newQuantity = item.quantity - 1;
      } else if (action === "increment") {
        newQuantity = item.quantity + 1;
      }

      if (newQuantity === 0) {
        await memoizedRemoveCartItem(item);
      } else {
        try {
          const response = await axios.put(
            `http://localhost:8000/api/cart/${item._id}`,
            {
              ...item,
              quantity: newQuantity,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          memoizedGetCart();
        } catch (error) {
          if (error.response) {
          } else {
          }
        }
      }
    };
    return updateFromCart;
  }, [memoizedRemoveCartItem, memoizedGetCart]);

  const memoizedClearCartItems = useMemo(() => {
    const ClearCartItems = async () => {
      try {
        const response = await axios.delete(
          "http://localhost:8000/api/cart/cart"
        );
        toast.success(response.data.message);
        memoizedGetCart();
        setCartItems([]); // or call memoizedGetCart() to fetch the updated cart items
      } catch (error) {
        console.error("Error clearing cart:", error.response.data);
      }
    };
    return ClearCartItems;
  }, [memoizedGetCart]);

  useEffect(() => {
    memoizedGetCart();
  }, [auth.token]);

  const ClearCartItems = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/cart/cart"
      );
      toast.success(response.data.message);
      memoizedGetCart();
      setCartItems([]); // or call memoizedGetCart() to fetch the updated cart items
    } catch (error) {
      console.error("Error clearing cart:", error.response.data);
    }
  };

  return (
    <cartContext.Provider
      value={{
        cartItems,
        ClearCartItems,
        addToCart: memoizedAddToCart,
        removeItem: memoizedRemoveItem,
        clearCart: memoizedClearCartItems,
        removeFromCart: memoizedRemoveCartItem,
        total,
        subtotal,
        getCart: memoizedGetCart,

        addCartItem: memoizedAddCartItem,
        updateFromCart: memoizedUpdateFromCart,
        quantity,
        removeCartItem: memoizedRemoveCartItem, // Add this line
        currencyPrice: () => {
          let currencyTotal = total;

          return currencyTotal.toLocaleString("en-Us", {
            style: "currency",
            currency: "USD",
          });
        },
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
