import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const location = useLocation();

  const [keyword, setKeyword] = useState(urlKeyword || '');

  useEffect(() => {
    // Update keyword when URL changes
    if (urlKeyword) {
      setKeyword(urlKeyword);
    } else if (location.pathname === '/') {
      setKeyword('');
    }
  }, [urlKeyword, location.pathname]);

  const submitHandler = (e) => {
    e.preventDefault();
    const trimmedKeyword = keyword?.trim();
    if (trimmedKeyword) {
      navigate(`/search/${trimmedKeyword}`);
    } else {
      navigate('/');
      setKeyword('');
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex flex-grow-1 me-2'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword || ''}
        placeholder='Search Products...'
        className='me-2'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='flex-shrink-0'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;