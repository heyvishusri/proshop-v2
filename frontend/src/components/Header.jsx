import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo.png';
import { resetCart } from '../slices/cartSlice';

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
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className='sticky-top' style={{ zIndex: 1030 }}>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to='/' className='d-flex align-items-center cursor-pointer transition-opacity hover:opacity-90'>
            <img src={logo} alt='ProShop' style={{ height: '30px', marginRight: '10px' }} />
            <span className='d-none d-sm-inline'>ProShop</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' className='cursor-pointer' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto align-items-center flex-wrap'>
              <div className='w-100 w-md-auto mb-2 mb-md-0 me-md-2'>
                <SearchBox />
              </div>
              <Nav.Link as={Link} to='/cart' className='d-flex align-items-center cursor-pointer transition-opacity hover:opacity-90'>
                <FaShoppingCart /> <span className='ms-1 d-none d-sm-inline'>Cart</span>
                {cartItems.length > 0 && (
                  <Badge pill bg='success' className='ms-1'>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username' className='cursor-pointer'>
                    <NavDropdown.Item as={Link} to='/profile' className='cursor-pointer transition-colors hover:bg-light'>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler} className='cursor-pointer transition-colors hover:bg-light'>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to='/login' className='d-flex align-items-center cursor-pointer transition-opacity hover:opacity-90'>
                  <FaUser /> <span className='ms-1'>Sign In</span>
                </Nav.Link>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu' className='cursor-pointer'>
                  <NavDropdown.Item as={Link} to='/admin/productlist' className='cursor-pointer transition-colors hover:bg-light'>
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/orderlist' className='cursor-pointer transition-colors hover:bg-light'>
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/userlist' className='cursor-pointer transition-colors hover:bg-light'>
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