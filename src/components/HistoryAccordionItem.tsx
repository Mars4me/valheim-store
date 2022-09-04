import { FC } from "react";
import { Accordion, Button, Stack } from "react-bootstrap";
import { Order } from "../context/OrderContext";
import { CartItem } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import GoodsItem from "./GoodsItem";

type HistoryAccordionItemProps = {
  order: Order;
  index: number;
  makeNewOrderViaHistory: (products: CartItem[]) => void;
};

const HistoryAccordionItem: FC<HistoryAccordionItemProps> = ({ order, index, makeNewOrderViaHistory }) => {
  return (
    <Accordion defaultActiveKey={index === 0 ? "1" : "0"}>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <div className="d-flex gap-2">
            <div data-order="success" className="d-inline">
              <span className="px-1 py-2 bg-success">{""}</span>
              <h4 className="ms-2 d-inline text-success">Success</h4>{" "}
            </div>
            <h4 className=" text-dark">{order.date}</h4>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <Stack gap={2}>
            {" "}
            {order.products.map((item) => (
              <GoodsItem key={item.id} {...item} />
            ))}
            <div className="m-auto fw-bold fs-4">Total: {formatCurrency(order.total)}</div>
            <Button variant="outline-success" onClick={() => makeNewOrderViaHistory(order.products)}>
              Repeat order
            </Button>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default HistoryAccordionItem;
