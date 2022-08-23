import { useEffect, useMemo, useState } from "react";
import { useCoupon } from "../context/CouponContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";
import { CartItem, useShoppingCart } from "../context/ShoppingCartContext";
import { useOrderContext } from "../context/OrderContext";

export function useShoppingCartHook() {
  const { closeCart, cartItems, clearCart } = useShoppingCart();
  const { addOrder } = useOrderContext();
  const [isCouponActive, setIsCouponActive] = useState(false);
  const [isValidationErrors, setIsValidationErrors] = useState(false);
  const { activeCoupon, suggestedCoupon, checkCoupon, removeCoupon } = useCoupon();
  const totalPrice = useMemo(
    () =>
      formatCurrency(
        cartItems.reduce((total, GoodsItem) => {
          const item = storeItems.find((i) => i.id === GoodsItem.id);
          return total + (item?.price || 0) * GoodsItem.quantity;
        }, 0) *
          (1 - (activeCoupon?.discount || 0))
      ),
    [cartItems, isCouponActive]
  );

  const makeOrder = (cartItems: CartItem[], totalPrice: string) => {
    addOrder(cartItems, totalPrice);
    clearCart();
  };

  const checkCouponIsValid = (code: string) => {
    if (code) {
      const checkIsValid = checkCoupon(code);
      if (checkIsValid) {
        setIsCouponActive(true);
        setIsValidationErrors(false);
      } else {
        setIsValidationErrors(true);
      }

      if (isCouponActive) {
        removeCoupon();
        setIsCouponActive(false);
      }
    } else {
      setIsValidationErrors(true);
    }
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      removeCoupon();
      setIsCouponActive(false);
      setIsValidationErrors(false);
    }
  }, [cartItems]);
  return {
    isCouponActive,
    activeCoupon,
    checkCouponIsValid,
    makeOrder,
    closeCart,
    cartItems,
    totalPrice,
    isValidationErrors,
    suggestedCoupon,
  };
}
