import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 rounded h-90 shadow-sm border-0 overflow-hidden cursor-pointer transition-all hover:shadow-md'>
      <Link to={`/product/${product._id}`} className='d-block cursor-pointer'>
        <Card.Img 
          src={product.image} 
          variant='top' 
          className='product-image'
          style={{ height: '200px', objectFit: 'cover', width: '100%' }}
          alt={product.name}
          loading='lazy'
        />
      </Link>

      <Card.Body className='d-flex flex-column p-3'>
        <Link to={`/product/${product._id}`} className='text-decoration-none mb-2 cursor-pointer transition-colors hover:text-primary'>
          <Card.Title as='div' className='product-title mb-0'>
            <strong className='text-dark'>{product.name}</strong>
          </Card.Title>
        </Link>

        <div className='mb-2'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>

        <Card.Text as='h3' className='mt-2 mb-0 fw-bold text-primary'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;