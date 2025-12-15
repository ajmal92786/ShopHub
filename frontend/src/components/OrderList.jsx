import useFetch from "../hooks/useFetch";
import OrderItem from "./OrderItem";

function OrderList({ userId }) {
  const { data, loading, error } = useFetch(`/api/orders?userId=${userId}`);

  return (
    <div>
      {loading && <div>Loading...</div>}
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
            <div>It looks like you haven't placed any orders yet.</div>
          )}
        </>
      )}
    </div>
  );
}

export default OrderList;
