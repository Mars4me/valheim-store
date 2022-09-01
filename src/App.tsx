import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Store from "./pages/Store";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import StoreLayout from "./Layout/StoreLayout";
import Product from "./components/Product";
import NotFoundPage from "./pages/NotFoundPage";
import Coupons from "./pages/Coupons";
import History from "./pages/History";
import { OrderContextProvider } from "./context/OrderContext";
import AboutLayout from "./Layout/AboutLayout";
import AboutHello from "./pages/About/AboutHello";
import { AboutCompany } from "./pages/About/AboutCompany";
import AboutExampes from "./pages/About/AboutExampes";
import AboutTeam from "./pages/About/AboutTeam";

const App = () => {
  return (
    <OrderContextProvider>
      <ShoppingCartProvider>
        <Navbar />
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/store" element={<StoreLayout />}>
              <Route index element={<Store />} />
              <Route path=":id" element={<Product />} />
            </Route>
            <Route path="/coupons" element={<Coupons />}></Route>
            <Route path="/history" element={<History />}></Route>
            <Route path="/about" element={<AboutLayout />}>
              <Route index element={<AboutHello />} />
              <Route path="company" element={<AboutCompany />} />
              <Route path="examples" element={<AboutExampes />} />
              <Route path="team" element={<AboutTeam />} />
            </Route>
            <Route path="/*" element={<NotFoundPage />}></Route>
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </OrderContextProvider>
  );
};

export default App;
