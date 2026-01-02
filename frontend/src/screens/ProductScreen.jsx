import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Row>
            <Col xs={12} md={6} className='mb-3'>
              <Card className='border-0 shadow-sm' style={{ borderRadius: '8px', overflow: 'hidden' }}>
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fluid 
                  className='w-100'
                  style={{ maxHeight: '500px', objectFit: 'contain', padding: '20px' }}
                  loading='lazy'
                />
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3} className='mb-3'>
              <Card className='h-100 shadow-sm border-0' style={{ borderRadius: '8px' }}>
                <Card.Body className='p-4'>
                  <Card.Title as='h3' className='mb-3 fw-bold'>{product.name}</Card.Title>
                  <div className='mb-4'>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} ${product.numReviews === 1 ? 'review' : 'reviews'}`}
                    />
                  </div>
                  <div className='mb-4'>
                    <h4 className='text-primary mb-0 fw-bold'>${product.price}</h4>
                  </div>
                  <div className='mt-4 pt-3 border-top'>
                    <strong className='d-block mb-2'>Description:</strong>
                    <p className='mb-0' style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem' }}>
                      {product.description}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Card className='shadow-sm border-0' style={{ borderRadius: '8px' }}>
                <Card.Body>
                  <div className='mb-3'>
                    <Row className='align-items-center'>
                      <Col xs={5} className='text-muted'>Price:</Col>
                      <Col xs={7} className='text-end'>
                        <strong className='fs-5 text-primary'>${product.price}</strong>
                      </Col>
                    </Row>
                  </div>
                  <div className='mb-3 pb-3 border-bottom'>
                    <Row className='align-items-center'>
                      <Col xs={5} className='text-muted'>Status:</Col>
                      <Col xs={7} className='text-end'>
                        <span className={`badge ${product.countInStock > 0 ? 'bg-success' : 'bg-danger'}`}>
                          {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                        </span>
                      </Col>
                    </Row>
                  </div>

                  {/* Qty Select */}
                  {product.countInStock > 0 && (
                    <div className='mb-3'>
                      <Row className='align-items-center'>
                        <Col xs={5} className='text-muted'>Qty:</Col>
                        <Col xs={7}>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                            className='text-end'
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </div>
                  )}

                  <Button
                    className='w-100'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                    size='lg'
                    style={{ borderRadius: '6px' }}
                  >
                    Add To Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className='review mt-5'>
            <Col xs={12}>
              <div className='d-flex justify-content-between align-items-center mb-4'>
                <h2 className='mb-0'>Customer Reviews</h2>
                <div className='d-flex align-items-center'>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} ${product.numReviews === 1 ? 'review' : 'reviews'}`}
                  />
                </div>
              </div>
              
              {product.reviews.length === 0 ? (
                <Card className='text-center py-5'>
                  <Card.Body>
                    <p className='text-muted mb-0'>No reviews yet. Be the first to review this product!</p>
                  </Card.Body>
                </Card>
              ) : (
                <Row className='mb-4'>
                  {product.reviews.map((review) => (
                    <Col key={review._id} xs={12} sm={6} lg={4} className='mb-3'>
                      <Card className='h-100 shadow-sm border-0' style={{ borderRadius: '8px' }}>
                        <Card.Body className='p-3'>
                          <div className='d-flex justify-content-between align-items-start mb-2'>
                            <div className='flex-grow-1'>
                              <Card.Title as='h6' className='mb-1 fw-bold' style={{ fontSize: '1rem' }}>
                                {review.name}
                              </Card.Title>
                              <div className='mb-2'>
                                <Rating value={review.rating} />
                              </div>
                            </div>
                            <small className='text-muted' style={{ fontSize: '0.75rem' }}>
                              {new Date(review.createdAt).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </small>
                          </div>
                          <Card.Text className='mt-3 mb-0' style={{ 
                            fontSize: '0.9rem', 
                            lineHeight: '1.6',
                            color: '#555'
                          }}>
                            {review.comment}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
              
              <Card className='mt-4 shadow-sm border-0' style={{ borderRadius: '8px' }}>
                <Card.Body className='p-4'>
                  <h4 className='mb-4 fw-bold'>Write a Customer Review</h4>

                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className='mb-3' controlId='rating'>
                        <Form.Label className='fw-semibold'>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          required
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                          style={{ maxWidth: '300px' }}
                        >
                          <option value=''>Select Rating...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='comment'>
                        <Form.Label className='fw-semibold'>Your Review</Form.Label>
                        <Form.Control
                          as='textarea'
                          rows={4}
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder='Share your thoughts about this product...'
                          style={{ resize: 'vertical' }}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                        className='px-4'
                        style={{ minWidth: '120px' }}
                      >
                        {loadingProductReview ? 'Submitting...' : 'Submit Review'}
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;