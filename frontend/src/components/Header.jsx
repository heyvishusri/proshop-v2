import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";
import SearchBox from "./SearchBox";
import logo from "../assets/logo.png";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full max-w-full">
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect className="w-full max-w-full">
        <Container className="w-full max-w-full px-2 sm:px-4">
          <Navbar.Brand as={Link} to="/" className="flex items-center gap-2">
            <img src={logo} alt="ProShop" className="h-8 w-auto object-contain" />
            <span className="text-sm sm:text-base">ProShop</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <div className="w-full sm:w-auto">
                <SearchBox />
              </div>
              <Nav.Link as={Link} to="/cart" className="flex items-center gap-1 whitespace-nowrap">
                <FaShoppingCart /> <span className="hidden sm:inline">Cart</span>
                {cartItems.length > 0 && (
                  <Badge pill bg="success" className="ml-1">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username" className="whitespace-nowrap">
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to="/login" className="whitespace-nowrap">
                  <FaUser /> <span className="hidden sm:inline">Sign In</span>
                </Nav.Link>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu" className="whitespace-nowrap">
                  <NavDropdown.Item as={Link} to="/admin/productlist">
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/orderlist">
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/userlist">
                    Users
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
