import React, { memo, ReactHTMLElement, useRef } from "react";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { siteMapRoutes } from "../utilities/siteMap";

const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart();

  const burgerMenuToggleButton = useRef<HTMLButtonElement>(null);
  const collapseBurgerMenu = () => {
    const elResponsiveNavbar = document.querySelector("#responsive-navbar-nav");
    if (elResponsiveNavbar!.classList.contains("show")) {
      burgerMenuToggleButton.current!.click();
    }
  };

  return (
    <NavbarBs collapseOnSelect sticky="top" className="shadow-sm mb-3" expand="sm" style={{ zIndex: 1030 }}>
      <Container fluid="md">
        <div
          className="blur position-absolute top-0 start-0 w-100 h-100 "
          style={{ zIndex: 2, backgroundColor: "rgba(255,255,255, 0.8)", backdropFilter: "blur(14px)" }}
        ></div>
        <NavbarBs.Brand as={NavLink} to="/" className="order-1 order-sm-0" style={{ zIndex: 3 }}>
          <img src={"imgs/valheim.webp"} height="60"></img>
        </NavbarBs.Brand>
        <NavbarBs.Toggle ref={burgerMenuToggleButton} aria-controls="responsive-navbar-nav" style={{ zIndex: 3 }} />
        <NavbarBs.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto bg-transparent">
            {siteMapRoutes.map((route, idx) => (
              <Nav.Link to={route.path} as={NavLink} key={idx} style={{ zIndex: 3 }} onClick={() => collapseBurgerMenu()}>
                {route.name}
              </Nav.Link>
            ))}
          </Nav>
        </NavbarBs.Collapse>
        <Button
          onClick={openCart}
          style={{ width: "3rem", height: "3rem", position: "relative", zIndex: 3 }}
          variant="outline-primary"
          className="rounded-circle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" fill="currentColor">
            <path d="M14 36c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zM2 4v4h4l7.19 15.17-2.7 4.9c-.31.58-.49 1.23-.49 1.93 0 2.21 1.79 4 4 4h24v-4H14.85c-.28 0-.5-.22-.5-.5 0-.09.02-.17.06-.24L16.2 26h14.9c1.5 0 2.81-.83 3.5-2.06l7.15-12.98c.16-.28.25-.61.25-.96a2 2 0 0 0-2-2H10.43l-1.9-4H2zm32 32c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4z" />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          {cartQuantity > 0 && (
            <div
              className="rounded-circle bg-danger"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          )}
        </Button>
      </Container>
    </NavbarBs>
  );
};

export default memo(Navbar);
