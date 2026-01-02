import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4 flex-wrap">
      <Nav.Item>
        {step1 ? (
          <Nav.Link as={Link} to="/login">
            <span className="d-none d-sm-inline">Sign In</span>
            <span className="d-sm-none">1. Sign In</span>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>
            <span className="d-none d-sm-inline">Sign In</span>
            <span className="d-sm-none">1. Sign In</span>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <Nav.Link as={Link} to="/shipping">
            <span className="d-none d-sm-inline">Shipping</span>
            <span className="d-sm-none">2. Shipping</span>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>
            <span className="d-none d-sm-inline">Shipping</span>
            <span className="d-sm-none">2. Shipping</span>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <Nav.Link as={Link} to="/payment">
            <span className="d-none d-sm-inline">Payment</span>
            <span className="d-sm-none">3. Payment</span>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>
            <span className="d-none d-sm-inline">Payment</span>
            <span className="d-sm-none">3. Payment</span>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <Nav.Link as={Link} to="/placeorder">
            <span className="d-none d-sm-inline">Place Order</span>
            <span className="d-sm-none">4. Order</span>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>
            <span className="d-none d-sm-inline">Place Order</span>
            <span className="d-sm-none">4. Order</span>
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
