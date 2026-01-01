import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-2 sm:p-3 rounded w-full max-w-full h-full flex flex-col">
      <Link to={`/product/${product._id}`} className="block w-full">
        <Card.Img src={product.image} variant="top" className="w-full h-auto object-contain max-h-48 sm:max-h-64" />
      </Link>

      <Card.Body className="flex flex-col flex-grow p-2 sm:p-3">
        <Link to={`/product/${product._id}`} className="block w-full">
          <Card.Title as="div" className="product-title text-sm sm:text-base">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div" className="mt-2">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3" className="text-lg sm:text-xl font-bold mt-2">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
