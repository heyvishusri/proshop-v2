import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message.jsx";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <Row className="w-full max-w-full mx-0">
        <Col xs={12} md={8} className="mb-4 md:mb-0">
          <h1 className="mb-4 sm:mb-5 text-xl sm:text-2xl">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush" className="w-full">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id} className="w-full max-w-full px-0 sm:px-2">
                  <Row className="w-full max-w-full mx-0 items-center">
                    <Col xs={4} sm={3} md={2} className="mb-2 sm:mb-0">
                      <Image src={item.image} alt={item.name} fluid rounded className="w-full h-auto object-contain" />
                    </Col>
                    <Col xs={12} sm={4} md={3} className="mb-2 sm:mb-0">
                      <Link to={`/product/${item._id}`} className="text-sm sm:text-base break-words">
                        {item.name}
                      </Link>
                    </Col>
                    <Col xs={6} sm={2} md={2} className="text-sm sm:text-base mb-2 sm:mb-0">
                      ₹{item.price}
                    </Col>
                    <Col xs={6} sm={3} md={2} className="mb-2 sm:mb-0">
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                        className="w-full text-sm sm:text-base"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col xs={12} sm={12} md={2} className="text-center sm:text-left">
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item._id)}
                        className="w-full sm:w-auto"
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col xs={12} md={4} className="mt-4 md:mt-0">
          <Card className="w-full max-w-full sticky top-20">
            <ListGroup variant="flush" className="w-full">
              <ListGroup.Item className="w-full">
                <h2 className="text-lg sm:text-xl mb-2">
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                </h2>
                <p className="text-lg sm:text-xl font-bold">
                  ₹{cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </p>
              </ListGroup.Item>
              <ListGroup.Item className="w-full">
                <Button
                  type="button"
                  className="w-full"
                  disabled={cartItems.length === 0}
                  onClick={() => checkoutHandler()}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
