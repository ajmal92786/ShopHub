import { useNavigate } from "react-router-dom";
import useCartContext from "../contexts/CartContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { TiShoppingCart } from "react-icons/ti";

function CartPage() {
  const { cart, loading, error } = useCartContext();
  console.log(cart);

  const navigate = useNavigate();

  let cartItems = cart?.items || [];

  return (
    <>
      <Header />
      <main className="container py-5">
        {loading && <p className="text-center">Loading...</p>}
        {!loading && error && (
          <p className="text-center text-danger">
            Something went wrong. Please try again.
          </p>
        )}

        {!loading && !error && (
          <>
            {cartItems.length > 0 ? (
              <div className="row g-3">
                <div className="col-md-8">Cart Items</div>
                <div className="col-md-4">Checkout</div>
              </div>
            ) : (
              <div className="pt-3 text-center" style={{ height: "50vh" }}>
                <TiShoppingCart size={80} className="text-muted" />
                <p className="text-danger fs-4 fw-bold">
                  Your ShopHub Cart is empty
                </p>
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default CartPage;
