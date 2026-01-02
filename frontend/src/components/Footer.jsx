import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-3 bg-light border-top" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1030 }}>
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">ProShop &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
