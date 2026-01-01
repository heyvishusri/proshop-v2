import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full max-w-full mt-auto bg-gray-100 border-t">
      <Container className="w-full max-w-full px-2 sm:px-4">
        <Row>
          <Col className="text-center py-3">
            <p className="text-sm sm:text-base m-0">ProShop &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
