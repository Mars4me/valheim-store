import React, { FC, ReactNode, useMemo } from "react";
import { Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { Link } from "react-router-dom";
import StoreItemAddButton from "./StoreItemAddButton";
import ItemInStoreIcon from "./ItemInStoreIcon";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Animate } from "react-simple-animate";

type StoreItemProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  children?: ReactNode;
};

const StoreItem: FC<StoreItemProps> = ({ id, name, description, price, imgUrl }) => {
  const { getItemQuantity } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Link to={`/store/${id}`} className="position-relative">
        <Card.Img variant="top" src={imgUrl} height="200px" style={{ objectFit: "cover" }} />
        {quantity ? (
          <Animate play={quantity > 0} start={{ opacity: 0 }} end={{ opacity: 1 }}>
            <ItemInStoreIcon style={{ position: "absolute", left: "5px", bottom: "5px" }} />
          </Animate>
        ) : null}
      </Link>
      <Card.Body className="d-flex flex-column cursor-pointer ">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2 text-truncate">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <Card.Text
          className="text-muted"
          style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", lineClamp: 3, overflow: "hidden" }}
        >
          {description}
        </Card.Text>
        <StoreItemAddButton id={id} />
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
