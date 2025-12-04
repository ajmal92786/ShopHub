import PriceSlider from "./PriceSlider";
import CategoryFilter from "../components/CategoryFilter";
import RatingFilter from "../components/RatingFilter";
import PriceSort from "../components/PriceSort";
import useFilterContext from "../contexts/FilterContext";

function FiltersComponent() {
  const { resetFilters } = useFilterContext();

  return (
    <aside>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="fs-5 fw-bold">Filters</span>

        <button className="btn btn-sm btn-link p-0" onClick={resetFilters}>
          Clear Filters
        </button>
      </div>

      <PriceSlider />
      <CategoryFilter />
      <RatingFilter />
      <PriceSort />
    </aside>
  );
}

export default FiltersComponent;
