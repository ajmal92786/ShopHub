import { useNavigate } from "react-router-dom";
import useWishlistContext from "../contexts/WishlistContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import WishlistItem from "../components/WishlistItem";
import loadingImage from "../assets/modern_loader.webp";
import { TbShoppingBagHeart } from "react-icons/tb";

function WishlistPage() {
  const { wishlist, loading, error } = useWishlistContext();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="py-3 bg-light" style={{ minHeight: "85vh" }}>
        <div className="container">
          <section className="mb-5">
            <h4 className="fw-bold text-center">My Wishlist</h4>
          </section>

          {loading && (
            <div className="w-100 h-100 py-5 d-flex justify-content-center">
              <div style={{ width: "35px", height: "35px" }}>
                <img src={loadingImage} alt="loader" className="w-100 h-1" />
              </div>
            </div>
          )}

          {!loading && error && (
            <p className="text-danger text-center">Something went wrong!</p>
          )}

          {!loading && !error && (
            <>
              {wishlist && wishlist.items.length > 0 ? (
                <>
                  <div className="row g-4">
                    {wishlist.items.map((item) => (
                      <div
                        key={item._id}
                        className="col-md-3"
                        style={{ height: "440px" }}
                      >
                        <WishlistItem item={item} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="text-warning mt-5 mb-3">
                    <TbShoppingBagHeart size={48} />
                  </div>
                  <h3 className="text-warning">Your wishlist is empty!</h3>
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/")}
                  >
                    Add items to wishlist
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default WishlistPage;
