import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import CollapsibleExample from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden max-w-full">
      <CollapsibleExample />

      <main className="py-3 flex-1 w-full max-w-full">
        <Container className="w-full max-w-full px-2 sm:px-4">
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
