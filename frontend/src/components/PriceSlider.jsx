import useFilterContext from "../contexts/FilterContext";

function PriceSlider() {
  const { priceRange, setPriceRange } = useFilterContext();

  return (
    <div className="pt-2">
      <label className="fw-bold">Price</label>

      <input
        type="range"
        className="form-range"
        min="0"
        max="5000"
        step="100"
        value={priceRange}
        onChange={(e) => setPriceRange(Number(e.target.value))}
      />

      <div className="d-flex justify-content-between text-secondary">
        <span>0</span>
        <span>2500</span>
        <span>5000</span>
      </div>
    </div>
  );
}

export default PriceSlider;
