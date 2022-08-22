import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { Button, Form, InputGroup, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";
import CartItem from "./CartItem";
import { coupons, useCoupon } from "../context/CouponContext";

type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart: FC<ShoppingCartProps> = ({ isOpen }) => {
  const { closeCart, cartItems } = useShoppingCart();
  const [isCouponActive, setIsCouponActive] = useState(false);
  const [isValidationErrors, setIsValidationErrors] = useState(false);
  const { activeCoupon, suggestedCoupon, checkCoupon, removeCoupon } = useCoupon();
  const couponInput = useRef<HTMLInputElement>(null);

  const totalPrice = formatCurrency(
    cartItems.reduce((total, cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0) *
      (1 - (activeCoupon?.discount || 0))
  );

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
    console.log("hello bro");
    if (cartItems.length === 0) {
      removeCoupon();
      setIsCouponActive(false);
      setIsValidationErrors(false);
    }
  }, [cartItems]);

  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems[0] ? (
          <Stack gap={3}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="d-flex">
              {activeCoupon.discount > 0 && isCouponActive && (
                <div className=" text-muted mt-auto">
                  discount: {activeCoupon.discount * 100}
                  {"%"}
                </div>
              )}
              <div className="ms-auto fw-bold fs-4">Total {totalPrice}</div>
            </div>

            <InputGroup className="mb-3 position-relative">
              {isValidationErrors && (
                <p className="text-danger position-absolute small" style={{ zIndex: "2", top: "-16px", right: "5px" }}>
                  сoupon code is not valid
                </p>
              )}
              <Button
                onClick={() => checkCouponIsValid(couponInput.current?.value as string)}
                variant={isCouponActive ? "success" : "outline-secondary"}
                id="button-addon1"
              >
                Coupon
              </Button>
              <Form.Control
                ref={couponInput}
                disabled={isCouponActive}
                defaultValue={suggestedCoupon}
                placeholder={"use coupon"}
              />
            </InputGroup>
            <Button variant="success">Pay</Button>
          </Stack>
        ) : (
          <h1 className="text-center">Cart is empty</h1>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
