import { createContext, FC, ReactNode, useContext, useMemo, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { CouponContextProvider } from "./CouponContext";

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
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext<ShoppingCartContext>({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider: FC<ShoppingCartProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);

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
      }}
    >
      <CouponContextProvider>
        {children}
        <ShoppingCart isOpen={isOpen} />
      </CouponContextProvider>
    </ShoppingCartContext.Provider>
  );
};
