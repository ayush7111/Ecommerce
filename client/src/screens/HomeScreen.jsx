import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";

export default function HomeScreen() {
  const { keyword, pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        toast.error(error)
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {data?.products?.map((product, i) => (
              <Product key={i} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Paginate
              pages={data.pages}
              page={data.pageNumber}
              keyword={keyword ? keyword : ""}
            />
          </div>
        </>
      )}
    </>
  );
}
