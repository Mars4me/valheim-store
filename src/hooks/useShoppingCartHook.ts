import { useEffect, useMemo, useState } from "react";
import { useCoupon } from "../context/CouponContext";
import storeItems from "../data/items.json";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function useShoppingCartHook() {
  const { closeCart, cartItems, clearCart, totalPrice, updateTotalPrice } = useShoppingCart();
  const [isCouponActive, setIsCouponActive] = useState(false);
  const [isValidationErrors, setIsValidationErrors] = useState(false);
  const { activeCoupon, suggestedCoupon, checkCoupon, removeCoupon } = useCoupon();

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
    updateTotalPrice(
      cartItems.reduce((total, GoodsItem) => {
        const item = storeItems.find((i) => i.id === GoodsItem.id);
        return total + (item?.price || 0) * GoodsItem.quantity;
      }, 0) *
        (1 - (activeCoupon?.discount || 0))
    );
  }, [cartItems, isCouponActive]);

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
    closeCart,
    cartItems,
    totalPrice,
    isValidationErrors,
    suggestedCoupon,
  };
}
