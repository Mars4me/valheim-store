import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { ICoupon } from "../components/Coupons/CouponItem";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const coupons = [
  {
    id: 1,
    name: "Invite coupon",
    code: "1234567890",
    discount: 0.05,
    image: "https://st.cdjapan.co.jp/pictures/cms/c/firstordercoupon700x300.png",
    alt: "invite coupon",
  },
  {
    id: 2,
    name: "First order",
    code: "234567890",
    discount: 0.25,
    image: "https://st.cdjapan.co.jp/pictures/cms/c/firstordercoupon700x300.png",
    alt: "First order",
  },
  {
    id: 3,
    name: "Summer sales",
    code: "34567890",
    discount: 0.1,
    image:
      "https://images.ctfassets.net/hrltx12pl8hq/TobRnmMX1EaYRFZ0zR72S/fce1062cfe5920c07f62c7209c9ed1f3/shutterstock-coupon.jpg",
    alt: "Summer sales",
  },
];

type CouponProviderProps = {
  children: ReactNode;
};

type CouponContext = {
  suggestedCoupon: string;
  activeCoupon: ICoupon;
  checkCoupon: (number: string) => Boolean;
  removeCoupon: () => void
  setSuggestedCoupon: (coupon: string) => void;
};

const CouponContext = createContext<CouponContext>({} as CouponContext);

export function useCoupon() {
  return useContext(CouponContext);
}

export const CouponContextProvider: FC<CouponProviderProps> = ({ children }) => {
  const [activeCoupon, setCoupon] = useState<ICoupon>({} as ICoupon);
  const [suggestedCoupon, setSuggestedCoupon] = useState<string>('');
  const [couponItems, setCouponItems] = useLocalStorage<ICoupon[]>("coupons", []);

  const checkCoupon = (code: string): Boolean => {
    const coupon = coupons.find((coupon) => coupon.code === code);
    if (coupon) {
      setCoupon(coupon);
      return true;
    }
    return false;
  };

  const removeCoupon = (): void => {
    setCoupon({} as ICoupon)
  };

  return (
    <CouponContext.Provider value={{ suggestedCoupon, checkCoupon, removeCoupon, activeCoupon, setSuggestedCoupon }}>{children}</CouponContext.Provider>
  );
};
