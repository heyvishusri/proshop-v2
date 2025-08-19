import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";

function CollapsibleExample() {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      bg="dark"
      variant="dark"
      sticky="top"
      style={{ opacity: 0.8 }}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="text-white">
            <img src={logo} alt="ProShop" />
            ProShop
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link eventKey={2}>
                <FaUser /> Sign In
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
