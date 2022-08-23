import { FC, useRef } from "react";
import { Button, Form, InputGroup, Offcanvas, Stack } from "react-bootstrap";
import GoodsItem from "./GoodsItem";
import { useShoppingCartHook } from "../hooks/useShoppingCartHook";

type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart: FC<ShoppingCartProps> = ({ isOpen }) => {
  const {
    isCouponActive,
    activeCoupon,
    checkCouponIsValid,
    closeCart,
    makeOrder,
    totalPrice,
    isValidationErrors,
    suggestedCoupon,
    cartItems,
  } = useShoppingCartHook();
  const couponInput = useRef<HTMLInputElement>(null);

  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems[0] ? (
          <Stack gap={3}>
            {cartItems.map((item) => (
              <GoodsItem key={item.id} {...item} removeButton />
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
                <p className="text-danger position-absolute small" style={{ zIndex: "2", top: "-20px", right: "5px" }}>
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
            <Button variant="success" onClick={() => makeOrder(cartItems, totalPrice)}>
              Pay
            </Button>
          </Stack>
        ) : (
          <h1 className="text-center">Cart is empty</h1>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
