import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <div className="w-full max-w-full overflow-x-auto flex justify-center">
        <Pagination className="flex-wrap justify-center">
          {[...Array(pages).keys()].map((x) => (
            <Pagination.Item
              as={Link}
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/productlist/${x + 1}`
              }
              active={x + 1 === page}
              className="m-1"
            >
              {x + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    )
  );
};

export default Paginate;
