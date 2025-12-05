import { useParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { IoMdHeart } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { TbTruckReturn } from "react-icons/tb";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";

function ProductDetailsPage() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();

  const { data, loading, error } = useFetch(`/api/products/${productId}`);

  const product = data?.data?.product;

  function calculatePriceAfterDiscount(originalPrice, discountPercentage) {
    const discount = discountPercentage / 100;
    const discountedPrice = originalPrice - originalPrice * discount;

    return Math.floor(discountedPrice);
  }

  return (
    <>
      <Header />
      <main className="container py-5">
        {loading && <p className="text-center">Loading...</p>}
        {error && (
          <p className="py-3 text-center text-danger">Something went wrong!</p>
        )}

        {product && (
          <div className="row g-5">
            <div className="col-12 col-md-4">
              <div className="d-flex flex-column">
                <div className="position-relative" style={{ height: "72vh" }}>
                  <div className="p-2 position-absolute end-0">
                    <button className="p-2 bg-light border-0 rounded-circle text-secondary">
                      <IoMdHeart size={27} />
                    </button>
                  </div>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </div>
                <button className="my-2 btn btn-warning">Buy Now</button>
                <button className="btn btn-dark">Add to Cart</button>
              </div>
            </div>

            <div className="col-12 col-md-8">
              <div>
                <div className="fs-4 fw-semibold">{product.title}</div>

                <div className="d-flex align-items-center">
                  <span aria-label={`Rating ${product.rating} stars`}>
                    {product.rating}
                  </span>
                  <IoMdStar size={20} className="ms-1 text-warning" />
                </div>

                <div className="py-3">
                  <div className="fw-bold fs-5">
                    ₹{product.price}
                    <span className="fw-bold fs-6 text-muted ms-2 text-decoration-line-through">
                      ₹
                      {calculatePriceAfterDiscount(
                        product.price,
                        product.discountPercentage
                      )}
                    </span>
                  </div>
                  <div className="text-muted fw-semibold">
                    {product.discountPercentage}% off
                  </div>
                </div>

                <section className="d-flex align-items-center">
                  <label className="fw-bold me-2">Quantity:</label>

                  <div className="input-group" style={{ width: "130px" }}>
                    <button
                      className="btn btn-outline-secondary"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                      }
                      disabled={quantity === 1}
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      readOnly
                      className="fw-bold form-control text-center"
                      aria-label="Selected quantity"
                    />

                    <button
                      className="btn btn-outline-secondary"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </section>

                {product?.sizes?.length > 0 && (
                  <div className="mt-3 mb-4 d-flex flex-wrap gap-2">
                    <span className="fw-bold">Size:</span>
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`btn btn-sm p-0 px-2 ${
                          selectedSize === size
                            ? "btn-dark"
                            : "btn-outline-dark"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <hr />

              <div className="d-flex gap-4">
                {product?.returnPolicy?.returnable && (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <TbTruckReturn size={40} className="text-secondary" />
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <span>{product?.returnPolicy?.returnDays} days</span>
                      <span>Returnable</span>
                    </div>
                  </div>
                )}
                {product?.payOnDelivery && (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <TbCoinRupeeFilled size={40} className="text-secondary" />
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <span>Pay on</span>
                      <span>Delivery</span>
                    </div>
                  </div>
                )}
                {product?.freeDelivery && (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <TbTruckDelivery size={40} className="text-secondary" />
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <span>Free</span>
                      <span>Delivery</span>
                    </div>
                  </div>
                )}
                {product?.freeDelivery && (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <RiSecurePaymentLine size={40} className="text-secondary" />
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <span>Secure</span>
                      <span>Payment</span>
                    </div>
                  </div>
                )}
              </div>

              <hr />

              <div>
                <div className="fw-bold">Description:</div>
                {product?.descriptionPoints?.length > 0 && (
                  <ul>
                    {product.descriptionPoints.map((descPoint) => (
                      <li>{descPoint}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default ProductDetailsPage;
