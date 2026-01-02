import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import { getImageUrl } from '../utils/imageUtils';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`} className='text-decoration-none'>
            <Image 
              src={getImageUrl(product.image)} 
              alt={product.name} 
              fluid 
              style={{ maxHeight: '400px', objectFit: 'contain', width: '100%' }}
              loading='lazy'
              onError={(e) => {
                e.target.src = '/images/sample.jpg';
              }}
            />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-end mb-0'>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;