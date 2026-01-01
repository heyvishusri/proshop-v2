import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <div className="w-full max-w-full overflow-x-hidden mb-4">
      <Carousel pause="hover" className="bg-primary mb-4 w-full max-w-full">
        {products.map((product) => (
          <Carousel.Item key={product._id} className="w-full">
            <Link to={`/product/${product._id}`} className="block w-full">
              <Image src={product.image} alt={product.name} fluid className="w-full h-auto object-contain max-h-64 sm:max-h-96" />
              <Carousel.Caption className="carousel-caption">
                <h2 className="text-white text-sm sm:text-base md:text-lg lg:text-xl text-right break-words">
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
