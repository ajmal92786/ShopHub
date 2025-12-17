import useFetch from "../hooks/useFetch";
import OrderItem from "./OrderItem";
import loadingImage from "../assets/modern_loader.webp";

function OrderList({ userId }) {
  const { data, loading, error } = useFetch(`/api/orders?userId=${userId}`);

  return (
    <div>
      {loading && (
        <div className="w-100 h-100 py-5 d-flex justify-content-center">
          <div style={{ width: "30px", height: "30px" }}>
            <img src={loadingImage} alt="loader" className="w-100 h-1" />
          </div>
        </div>
      )}

      {!loading && error && (
        <div>{error.message || "Something went wrong!"}</div>
      )}

      {!loading && !error && (
        <>
          {data.data.orders.length ? (
            <div>
              {data.data.orders.map((order) => (
                <OrderItem key={order._id} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-danger fw-semibold fs-5">
                It looks like you haven't placed any orders yet.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default OrderList;
