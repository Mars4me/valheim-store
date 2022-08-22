import React, { FC } from "react";
import "react-toastify/dist/ReactToastify.css";
import "animate.css/animate.min.css";
import { toast, cssTransition } from "react-toastify";
import { useCoupon } from "../../context/CouponContext";

const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut",
});

interface ToastItemProps {
  code: string;
}

const ToastItem: FC<ToastItemProps> = ({ code }) => {
  const {setSuggestedCoupon} = useCoupon()

  const toastAction = () => {
    toast.dark(`Купон ${code} скопійовано у буфер обміну. Скористайтесь ним у корзині.`, {
      transition: bounce,
      toastId: code,
    });
    navigator.clipboard.writeText(code);
    setSuggestedCoupon(code)
  };

  return (
    <>
      <button id="liveToastBtn" onClick={toastAction} type={"button"} className="btn btn-light w-100" >
        use coupon
      </button>
    </>
  );
};

export default ToastItem;
