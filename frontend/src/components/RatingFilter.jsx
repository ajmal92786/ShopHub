import useFilterContext from "../contexts/FilterContext";

function RatingFilter() {
  const { selectedRating, setSelectedRating } = useFilterContext();

  const handleRatingChange = (event) => {
    setSelectedRating(Number(event.target.value));
  };

  return (
    <div className="pt-3">
      <div className="fw-bold mb-2">Rating</div>

      {[4, 3, 2, 1].map((rating) => (
        <div className="form-check" key={rating}>
          <input
            type="radio"
            name="ratingFilter"
            id={`ratingFilter-${rating}`}
            className="form-check-input"
            value={rating}
            checked={selectedRating === rating}
            onChange={handleRatingChange}
          />
          <label
            className="form-check-label"
            htmlFor={`ratingFilter-${rating}`}
          >
            {rating} Stars & above
          </label>
        </div>
      ))}
    </div>
  );
}

export default RatingFilter;
