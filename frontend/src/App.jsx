import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import CollapsibleExample from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <CollapsibleExample />

      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
