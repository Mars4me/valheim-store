import { FC } from "react";
import ToastItem from "./ToastItem";

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
    <div className={"shadow p-2 mx-1 bg-body rounded"}>
      <div className="col mt-1">
        <img height={"200"} src={coupon.image} className="card-img-top" alt={coupon.alt} style={{objectFit:'contain'}}/>
        <div className="card-body mt-3">
          <h5 className="card-title">{coupon.name}</h5>
          <p className="card-text">({coupon.code})</p>
          <ToastItem code={coupon.code} />
        </div>
      </div>
    </div>
  );
};

export default CouponItem;
