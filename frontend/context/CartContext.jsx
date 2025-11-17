/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { fetchAPI } from "../api/api";
import { useCallback } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (token) loadCart();
  }, [token, loadCart]);

  const loadCart = useCallback(async () => {
    const data = await fetchAPI("/cart", "GET", null, token);
    setCart(data.items || []);
  }, [token]);

  const addToCart = async (productId, quantity = 1) => {
    await fetchAPI("/cart", "POST", { productId, quantity }, token);
    loadCart();
  };

  const removeFromCart = async (productId) => {
    await fetchAPI("/cart", "DELETE", { productId }, token);
    loadCart();
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};
