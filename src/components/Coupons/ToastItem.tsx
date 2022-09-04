import { FC } from "react";
import "react-toastify/dist/ReactToastify.css";
import "animate.css/animate.min.css";
import { toast, cssTransition } from "react-toastify";
import { useCoupon } from "../../context/CouponContext";
import { Button } from "react-bootstrap";

const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut",
});

interface ToastItemProps {
  code: string;
}

const ToastItem: FC<ToastItemProps> = ({ code }) => {
  const { setSuggestedCoupon } = useCoupon();

  const toastAction = () => {
    toast.dark(`Купон ${code} скопійовано у буфер обміну. Скористайтесь ним у корзині.`, {
      transition: bounce,
      toastId: code,
    });
    setSuggestedCoupon(code);

    navigator.clipboard.writeText(code);
  };

  return (
    <>
      <Button id="liveToastBtn" onClick={toastAction} variant="outline-success" className="w-100">
        Promo code
      </Button>
    </>
  );
};

export default ToastItem;
