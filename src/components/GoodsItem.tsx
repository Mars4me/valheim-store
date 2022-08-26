import React, { FC, ReactNode } from "react";
import { Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type GoodsItemProps = {
  id: number;
  quantity: number;
  removeButton?: Boolean;
  children?: ReactNode;
};

const GoodsItem: FC<GoodsItemProps> = ({ id, quantity, removeButton, children }) => {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);

  if (item === null || item === undefined) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <Link to={`/store/${id}`}>
        <img src={item.images.thumbnail} style={{ width: "125px", height: "75px", objectFit: "cover" }} alt="smaple image" />
      </Link>

      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text=muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      {removeButton && (
        <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(id)}>
          X
        </Button>
      )}
      {children}
    </Stack>
  );
};

export default GoodsItem;
