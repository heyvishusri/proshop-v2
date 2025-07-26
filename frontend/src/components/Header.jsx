import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container bg="">
        <Navbar.Brand href="#home" className="text-white">
          <img src={logo} alt="ProShop" />
          ProShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="/cart">
              <FaShoppingCart /> Cart
            </Nav.Link>
            <Nav.Link eventKey={2} href="/signin">
              <FaUser /> Sign In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
