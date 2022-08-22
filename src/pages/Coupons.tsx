import { Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import CouponItem from "../components/Coupons/CouponItem";
import { coupons } from "../context/CouponContext";

const Coupons = () => {
  
  return (
    <Row md={2} xs={1} lg={3} className="g-3">
      {coupons.map((coupon) => (
        <Col key={coupon.id}>
          <CouponItem coupon={coupon} />
        </Col>
      ))}
        <ToastContainer limit={3} />
    </Row>
  );
};

export default Coupons;
