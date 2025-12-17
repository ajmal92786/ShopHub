import useFilterContext from "../contexts/FilterContext";

function RatingFilter() {
  const { selectedRating, setSelectedRating } = useFilterContext();

  const handleRatingChange = (event) => {
    setSelectedRating(Number(event.target.value));
  };

  return (
    <div className="pt-3">
      <div className="fw-bold mb-2">Rating</div>

      {[4, 3, 2, 1].map((rating) => {
        const isChecked = selectedRating === rating;

        return (
          <div
            key={rating}
            className={`form-check d-flex align-items-center gap-2 p-2 rounded ${
              isChecked ? "bg-light border border-primary" : ""
            }`}
          >
            <input
              type="radio"
              name="ratingFilter"
              id={`ratingFilter-${rating}`}
              className="form-check-input m-0"
              value={rating}
              checked={isChecked}
              onChange={handleRatingChange}
            />

            <label
              htmlFor={`ratingFilter-${rating}`}
              className="form-check-label w-100"
              style={{ cursor: "pointer" }}
            >
              {rating} Stars & above
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default RatingFilter;
