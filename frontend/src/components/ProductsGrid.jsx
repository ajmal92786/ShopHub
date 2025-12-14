import useFetch from "../hooks/useFetch";
import useFilterContext from "../contexts/FilterContext";
import ProductCard from "./ProductCard";

function ProductsGrid() {
  const { data, loading, error } = useFetch("/api/products");
  const {
    priceRange,
    selectedCategories,
    selectedRating,
    sortBy,
    searchQuery,
  } = useFilterContext();

  let products = data?.data?.products || [];

  // Apply price, category, search and rating filters
  let filteredProducts = products.filter((product) => {
    const matchesPrice = product.price <= priceRange;
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category.name);

    const matchesRating = !selectedRating || product.rating >= selectedRating;

    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesPrice && matchesCategory && matchesRating && matchesSearch;
  });

  // Sorting logic
  if (sortBy === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (error) {
    return <p className="text-danger text-center">Something went wrong!</p>;
  }

  return (
    <div>
      <div className="py-3">
        <span className="fw-bold">Showing All Products</span>{" "}
        <span>(Showing {filteredProducts.length} products)</span>
      </div>

      {loading && <p>Products loading...</p>}

      {!loading && filteredProducts.length === 0 && <p>No products found.</p>}

      {!loading && filteredProducts.length > 0 && (
        <div className="row g-3">
          {filteredProducts.map((product) => (
            <div className="col-12 col-sm-6 col-lg-4" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsGrid;
