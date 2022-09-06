import { FC, ReactNode } from "react";
import { Badge, Button, Col, Container, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import CheckoutForm from "../components/CheckoutForm";
import { useCoupon } from "../context/CouponContext";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

const Checkout = () => {
  const { cartItems, makeOrder, totalPrice } = useShoppingCart();
  const { activeCoupon } = useCoupon();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      makeOrder(cartItems, totalPrice);
    }
  };

  return ( <Container className="d-flex justify-content-center">
      <Col md={11}>
        <div className="py-5 text-center">
          <Image
            className="d-block mx-auto mb-4 rounded"
            src={"imgs/checkout/valheim_merchant_cover.webp"}
            alt="trade-dwarf"
            width={"75%"}
          />
          <h2>Checkout form</h2>
          <p className="`l`ead">
            Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation
            state that can be triggered by attempting to submit the form without completing it.
          </p>
        </div>
        <Row>
          <Col md={{ span: 4, order: 2 }} className="mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
            </h4>
            <ListGroup className="mb-3 sticky-top" style={{ top: "95px" }}>
              {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} {...cartItem} />
              ))}
              <ListGroupItem className="d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">{activeCoupon.name || "Promo code"}</h6>
                  <small>{activeCoupon.code}</small>
                </div>
                {Object.keys(activeCoupon).length > 1 ? (
                  <span className="text-success">{"-" + activeCoupon.discount * 100 + "%"}</span>
                ) : (
                  <span className="text-danger">{"not active"}</span>
                )}
              </ListGroupItem>
              <ListGroupItem className="d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>{formatCurrency(totalPrice)}</strong>
              </ListGroupItem>
              <Button variant="success" size="lg" className="btn my-2" type="submit" form="checkoutForm">
                Continue to checkout
              </Button>
            </ListGroup>
          </Col>
          <Col md={{ span: 8, order: 1 }}>
            <h4 className="mb-3">Billing address</h4>
            <CheckoutForm handleCheckout={handleCheckout} />
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

type CheckoutItemProps = { id: number; quantity: number; removeButton?: Boolean; children?: ReactNode };

const CheckoutItem: FC<CheckoutItemProps> = ({ id, quantity, removeButton, children }) => {
  const item = storeItems.find((i) => i.id === id);

  if (item === null || item === undefined) return null;

  const truncateText = (text: string, limiter: number): string => {
    return text.length > limiter ? text.substring(0, limiter) + "..." : text;
  };

  return (
    <ListGroupItem className="d-flex justify-content-between lh-condensed">
      <div>
        <h6 className="my-0">
          {truncateText(item.name, 20)} <Badge bg="secondary">{quantity}</Badge>
        </h6>
        <small className="text-muted">{truncateText(item.description, 25)}</small>
      </div>
      <span className="text-muted">{formatCurrency(item.price * quantity)}</span>
    </ListGroupItem>
  );
};

export default Checkout;
