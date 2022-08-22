import { Routes, Route } from "react-router-dom";
import { Breadcrumb, Container } from "react-bootstrap";
import Store from "./pages/Store";
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import StoreLayout from "./Layout/StoreLayout";
import Product from "./components/Product";
import NotFoundPage from "./pages/NotFoundPage";
import Coupons from "./pages/Coupons";
import History from "./pages/History";

const App = () => {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/store" element={<StoreLayout />}>
            <Route index element={<Store />} />
            <Route path=":id" element={<Product />} />
          </Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/coupons" element={<Coupons />}></Route>
          <Route path="/history" element={<History />}></Route>
          <Route path="/*" element={<NotFoundPage />}></Route>
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
};

export default App;
