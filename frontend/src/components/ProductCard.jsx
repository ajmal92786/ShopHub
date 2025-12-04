import { IoMdStar } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";

function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div className="card h-100 shadow-sm rounded position-relative">
      <button className="m-1 bg-transparent border-0 text-white position-absolute top-0 end-0">
        <FaRegHeart size={22} />
      </button>

      <img
        src={product.imageUrl}
        alt={product.title}
        className="card-img-top object-fit-cover"
        style={{ height: "220px" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{product.title}</h5>

        <div className="mb-3 card-text d-flex justify-content-between align-items-center">
          <span className="fw-bold">₹{product.price}</span>
          <span
            className="px-2 bg-success-subtle text-success-emphasis d-flex align-items-center border rounded-pill"
            aria-label={`Rating ${product.rating} stars`}
          >
            {product.rating} <IoMdStar className="ms-1" />
          </span>
        </div>

        {product?.sizes?.length > 0 && (
          <div className="mb-3 d-flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`btn btn-sm rounded-pill p-0 px-2 ${
                  selectedSize === size ? "btn-dark" : "btn-outline-dark"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <button className="w-100 mt-auto btn btn-warning">Add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
