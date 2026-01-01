import React, { Children } from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container className="w-full max-w-full px-2 sm:px-4">
      <Row className="justify-content-md-center w-full max-w-full mx-0">
        <Col xs={12} md={6} className="w-full max-w-full">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
