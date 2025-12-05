import { createContext, useContext, useState, useEffect } from "react";
import useUserContext from "../contexts/UserContext";

const CartContext = createContext();

const useCartContext = () => useContext(CartContext);
export default useCartContext;

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useUserContext();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  async function fetchCart() {
    if (!userInfo?._id) {
      setCart([]);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/cart?userId=${userInfo?._id}`);

      if (!res.ok) {
        throw new Error(`Failed fetching cart: ${res.statusText}`);
      }

      const json = await res.json();

      setCart(json?.cart || []);
      setError(null);
    } catch (error) {
      console.error("Cart Fetch Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, [userInfo?._id]);

  return (
    <CartContext.Provider value={{ cart, loading, error }}>
      {children}
    </CartContext.Provider>
  );
}
