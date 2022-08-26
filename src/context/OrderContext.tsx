import moment from "moment";
import "moment/dist/locale/uk";
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { CartItem } from "./ShoppingCartContext";

export type Order = {
  number: number;
  products: CartItem[];
  total: string;
  date: string;
};
const initState: Order[] = [
  {
    number: 1,
    products: [
      { id: 1, quantity: 1 },
      { id: 2, quantity: 2 },
      { id: 5, quantity: 3 },
    ],
    total: "25 $",
    date: "серпень 22-го 2022",
  },
  {
    number: 2,
    products: [
      { id: 5, quantity: 1 },
      { id: 3, quantity: 2 },
      { id: 1, quantity: 2 },
      { id: 7, quantity: 2 },
      { id: 8, quantity: 2 },
    ],
    total: "120 $",
    date: "серпень 23-го 2022",
  },
  {
    number: 3,
    products: [
      { id: 2, quantity: 1 },
      { id: 3, quantity: 1 },
    ],
    total: "12 $",
    date: "серпень 24-го 2022",
  },
];

type OrderContext = {
  history: Order[];
  addOrder: (cartItem: CartItem[], total: string) => void;
};

const OrderContext = createContext<OrderContext>({} as OrderContext);

export function useOrderContext() {
  return useContext(OrderContext);
}

type OrderContextProviderProps = {
  children?: ReactNode;
};

export const OrderContextProvider: FC<OrderContextProviderProps> = ({ children }) => {
  moment.locale("uk");
  const [history, setHistory] = useState<Order[]>(initState);
  const addOrder = (cartItem: CartItem[], total: string) =>
    setHistory([
      ...history,
      {
        products: cartItem,
        date: "" + moment().format("MMMM Do YYYY"),
        total,
        number: history.length + 1,
      },
    ]);

  return <OrderContext.Provider value={{ addOrder, history }}>{children}</OrderContext.Provider>;
};
