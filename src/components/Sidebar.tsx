import { Button, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { siteMapAbout } from "../utilities/siteMap";
const Sidebar = () => {
  return (
    <NavbarBs className="shadow-sm">
      <Nav className="flex-column bg-transparent m-3 ">
        {siteMapAbout.map((route, idx) => (
          <Nav.Link to={route.path} as={NavLink} key={idx} className="fs-6">
            {route.name}
          </Nav.Link>
        ))}
      </Nav>
    </NavbarBs>
  );
};

export default Sidebar;
