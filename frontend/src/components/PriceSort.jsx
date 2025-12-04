import useFilterContext from "../contexts/FilterContext";

function PriceSort() {
  const { sortBy, setSortBy } = useFilterContext();

  return (
    <div className="pt-3">
      <label className="fw-bold">Sort by</label>

      <div className="form-check">
        <input
          type="radio"
          name="sortByPrice"
          id="sortLowToHigh"
          className="form-check-input"
          checked={sortBy === "lowToHigh"}
          onChange={() => setSortBy("lowToHigh")}
        />
        <label className="form-check-label" htmlFor="sortLowToHigh">
          Price - Low to High
        </label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          name="sortByPrice"
          id="sortHighToLow"
          className="form-check-input"
          checked={sortBy === "highToLow"}
          onChange={() => setSortBy("highToLow")}
        />
        <label className="form-check-label" htmlFor="sortHighToLow">
          Price - High to Low
        </label>
      </div>
    </div>
  );
}

export default PriceSort;
