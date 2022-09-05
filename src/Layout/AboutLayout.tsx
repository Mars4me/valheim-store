import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AboutLayout = () => {
  return (
    <>
      <Row className="justify-content-center">
        <Col sm={8}>
          <Outlet />
        </Col>
        <Col sm={{ span: 3, order: 2 }} xl={2} className="sticky-top " style={{ top: "55px" }}>
          <Sidebar />
        </Col>
      </Row>
    </>
  );
};

export default AboutLayout;
