import { Col, Container, Image } from "react-bootstrap";

const SuccessPage = () => {
  return (
    <Container style={{ height: "80vh" }}>
      <Col className="text-center h-50 d-flex flex-column justify-content-center">
        <Image src="/green_checkmark.svg" alt="icon" width={"200px"} height="200px"className="m-auto" />
        <h1 className="display-2">Your order is recieved.</h1>
        <h2 className="display-4">Thank you!</h2>
      </Col>
    </Container>
  );
};

export default SuccessPage;
