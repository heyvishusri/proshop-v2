import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber
  });

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1 className="text-xl sm:text-2xl md:text-3xl mb-4">Latest Products</h1>
          <Row className="w-full max-w-full mx-0">
            {data.products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={6} lg={4} xl={3} className="mb-4">
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <div className="w-full max-w-full overflow-x-auto">
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ""}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
