import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";
import ItemInStoreIcon from "./ItemInStoreIcon";
import StoreItemAddButton from "./StoreItemAddButton";
import Breadcrumbs from "./Breadcrumbs";
import Slider from "./Slider";
import { memo, useState } from "react";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = storeItems.find((product) => product.id === Number(id));

  if (!product) {
    return (
      <Alert variant="danger" className="d-flex flex-column justify-content-center align-items-center" dismissible>
        <Alert.Heading>Oh snap! You got an error! We don't find this product</Alert.Heading>
        <p>Go back to the Store and try again.</p>
        <Button variant="primary" onClick={() => navigate("/store")}>
          back to Store
        </Button>
      </Alert>
    );
  }

  return (
      <Row className="justify-content-center">
        <Col md={10}>
          <Breadcrumbs name={product.name} />
          <Card className="text-black">
            <div className="product-image position-relative">
              <Slider images={product.images} />
              <ItemInStoreIcon />
            </div>
            <Card.Body>
              <Card.Title className="text-center mb-4">{product.name}</Card.Title>
              <Card.Text className="text-muted mb-4">{product.description}</Card.Text>
              <Card.Text as="div" className="d-flex justify-content-between align-items-center">
                <span>Price</span>
                <div className="d-flex justify-content-between align-items-center">
                  <span>{formatCurrency(Number(product.price))}</span>
                  <StoreItemAddButton className="mx-3" id={product.id} />
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
  );
};

export default memo(Product);
