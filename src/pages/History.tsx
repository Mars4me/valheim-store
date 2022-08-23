import React, { FC, ReactNode } from "react";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import GoodsItem from "../components/GoodsItem";
import { useOrderContext } from "../context/OrderContext";
import { useShoppingCart } from "../context/ShoppingCartContext";

interface HistoryProps {
  children?: ReactNode;
}

const History: FC<HistoryProps> = () => {
  const { history } = useOrderContext();
  const { fillCartFromPreviousOrder } = useShoppingCart();
  return (
    <section data-page="history">
      <Row>
        <h1 className="text-center">Orders history</h1>
        <Col sm={12}>
          <Stack gap={4}>
            {history.map((order) => (
              <Stack key= {order.date} gap={1} className="shadow-lg pt-2 pb-4 px-5 position-relative">
                <div className="d-flex justify-content-between m-1 mb-3">
                  <div data-order="success" className="d-inline">
                    <span className="px-1 py-2 bg-success">{""}</span>
                    <h4 className="ms-2 d-inline">Success</h4>{" "}
                  </div>
                  <h4>{order.date}</h4>
                </div>
                <Stack gap={2}>
                  {" "}
                  {order.products.map((item) => (
                    <GoodsItem key={item.id} {...item} />
                  ))}
                  <div className="m-auto fw-bold fs-4">Total: {order.total}</div>
                  <Button variant="outline-success" onClick={() => fillCartFromPreviousOrder(order.products)}>
                    Repeat order
                  </Button>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Col>
      </Row>
    </section>
  );
};

export default History;
