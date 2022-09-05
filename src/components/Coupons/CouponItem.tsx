import { FC } from "react";
import { Card, Col } from "react-bootstrap";
import ToastItem from "./ToastItem";
import couponImage from "/imgs/coupon-2.jpg";

export interface ICoupon {
  id: number;
  name: string;
  code: string;
  discount: number;
  image: string;
  alt: string;
}

interface CouponItemProps {
  coupon: ICoupon;
}

const CouponItem: FC<CouponItemProps> = ({ coupon }) => {
  return (
    <Col className="mt-1">
      <Card>
        <div className="position-relative">
          <Card.Img height='200px'src={couponImage} alt={coupon.alt} style={{ objectFit: "cover" }} />
          <div className="position-absolute w-100 fs-2 bg-success text-white bg-opacity-75 text-center" style={{ bottom: "25px", height: '3rem' }}>
            <span style={{lineHeight: '3rem'}}>{coupon.discount * 100}%</span>
          </div>
        </div>
        <Card.Body className="m1-3">
          <Card.Title className="ps-2"> {coupon.name}</Card.Title>
          <Card.Text className="ps-2 text-muted">({coupon.code})</Card.Text>
          <ToastItem code={coupon.code} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CouponItem;
