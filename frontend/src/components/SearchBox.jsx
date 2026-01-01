import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex w-full max-w-full">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Products..."
        className="flex-1 min-w-0 max-w-full"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2 ml-2 whitespace-nowrap flex-shrink-0">
        <span className="hidden sm:inline">Search</span>
        <span className="sm:hidden">🔍</span>
      </Button>
    </Form>
  );
};

export default SearchBox;
