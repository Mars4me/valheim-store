import { FC } from "react";
import { Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemAddButtonProps = {
  id: number;
  className?: string;
};

const StoreItemAddButton: FC<StoreItemAddButtonProps> = ({ id, className }) => {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
  const quantity = getItemQuantity(id)

  return (
    <div className={`mt-auto ${className}`}>
      {quantity === 0 ? (
        <Button variant="light" className="w-100 my-auto" onClick={() => increaseCartQuantity(id)}>
          + Add To Cart
        </Button>
      ) : (
          <div className="d-flex align-items-center flex-column mt-auto" style={{ gap: ".5rem" }}>
            <div className="d-flex align-items=center justify-content-center" style={{ gap: ".5rem" }}>
              <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
              <Button variant="outline-danger" onClick={() => removeFromCart(id)}>
                <span className="fs-6">{quantity}</span> in cart
              </Button>
              <Button onClick={() => increaseCartQuantity(id)}>+</Button>
            </div>
          </div>
      )}
    </div>
  );
};

export default StoreItemAddButton;
