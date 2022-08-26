import { FC, ReactNode, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import ConfirmationModal from "../components/ConfirmationModal";
import HistoryAccordionItem from "../components/HistoryAccordionItem";
import { useOrderContext } from "../context/OrderContext";
import { CartItem, useShoppingCart } from "../context/ShoppingCartContext";

interface HistoryProps {
  children?: ReactNode;
}

const History: FC<HistoryProps> = () => {
  const { history } = useOrderContext();
  const { cartItems } = useShoppingCart();
  const { fillCartFromPreviousOrder } = useShoppingCart();
  const [show, setShow] = useState(false);
  const [previousOrder, setPreviousOrder] = useState<CartItem[]>([] as CartItem[]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const makeNewOrderViaHistory = (order: CartItem[]) => {
    if (cartItems.length === 0) {
      fillCartFromPreviousOrder(order);
      return null;
    }
    setPreviousOrder(order);
    handleShow();
  };

  return (
    <section data-page="history">
      <Row>
        <h1 className="text-center py-4">Orders history</h1>
        <Col sm={12}>
          <Stack gap={4}>
            {history.map((order, index) => (
              <HistoryAccordionItem key={index} order={order} index={index} makeNewOrderViaHistory={makeNewOrderViaHistory} />
            ))}
          </Stack>
        </Col>
      </Row>
      <ConfirmationModal show={show} handleClose={handleClose} handleConfirm={fillCartFromPreviousOrder} data={previousOrder} />
    </section>
  );
};

export default History;
