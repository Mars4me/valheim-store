import { createContext, FC, ReactNode, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCart from "../components/ShoppingCart";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { CouponContextProvider } from "./CouponContext";
import { useOrderContext } from "./OrderContext";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

export type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  fillCartFromPreviousOrder: (items: CartItem[]) => void;
  clearCart: () => void;
  updateTotalPrice: (totalPrice: number) => void;
  makeOrder: (cartItems: CartItem[], totalPrice: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  totalPrice: number;
};

const ShoppingCartContext = createContext<ShoppingCartContext>({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider: FC<ShoppingCartProviderProps> = ({ children }) => {
  const { addOrder } = useOrderContext();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const getItemQuantity = (id: number) => cartItems.find((item) => item.id === id)?.quantity || 0;
  const increaseCartQuantity = (id: number) =>
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
      }
    });
  const decreaseCartQuantity = (id: number) =>
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
      }
    });

  const removeFromCart = (id: number) => setCartItems((currItems) => currItems.filter((item) => item.id !== id));

  const clearCart = () => setCartItems([] as CartItem[]);

  const fillCartFromPreviousOrder = (items: CartItem[]) => {
    setCartItems(items);
  };

  const updateTotalPrice = (totalPrice: number) => {
    setTotalPrice(totalPrice);
  };

  const makeOrder = (cartItems: CartItem[], totalPrice: number) => {
    addOrder(cartItems, totalPrice);
    clearCart();
    navigate("/success");
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        fillCartFromPreviousOrder,
        openCart,
        closeCart,
        clearCart,
        cartItems,
        cartQuantity,
        totalPrice,
        updateTotalPrice,
        makeOrder,
      }}
    >
      <CouponContextProvider>
        {children}
        <ShoppingCart isOpen={isOpen} />
      </CouponContextProvider>
    </ShoppingCartContext.Provider>
  );
};
