import FiltersComponent from "../components/FiltersComponent";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductsGrid from "../components/ProductsGrid";

function ProductsPage() {
  return (
    <>
      <Header />

      <main className="bg-light">
        <div className="container py-3">
          {/* Mobile filter button */}
          <button
            className="btn btn-dark d-md-none mb-2"
            data-bs-toggle="offcanvas"
            data-bs-target="#filtersOffcanvas"
          >
            Filters
          </button>

          {/* Bootstrap Offcanvas for filters on mobile */}
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="filtersOffcanvas"
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
              ></button>
            </div>

            <div className="offcanvas-body">
              <FiltersComponent />
            </div>
          </div>

          <div className="row g-3">
            <div className="py-1 col-3 bg-white rounded d-none d-md-block">
              <FiltersComponent />
            </div>

            <div className="col-12 col-md-9 rounded">
              <ProductsGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ProductsPage;
