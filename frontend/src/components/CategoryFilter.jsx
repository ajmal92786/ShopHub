import useCategoryContext from "../contexts/CategoryContext";
import useFilterContext from "../contexts/FilterContext";

function CategoryFilter() {
  const { categories, loading } = useCategoryContext();
  const { selectedCategories, setSelectedCategories } = useFilterContext();

  const handleCategoryChange = (event) => {
    const { checked, value } = event.target;

    setSelectedCategories(
      (prev) =>
        checked
          ? [...prev, value] // add category
          : prev.filter((cat) => cat !== value) // remove category
    );
  };

  return (
    <div className="pt-3">
      <label className="fw-bold">Category</label>

      <div className="pt-1">
        {loading && <div>loading...</div>}

        {categories.map((category) => (
          <div className="form-check" key={category._id}>
            <input
              type="checkbox"
              id={`${category.name}Category`}
              className="form-check-input"
              value={category.name}
              checked={selectedCategories.includes(category.name)}
              onChange={handleCategoryChange}
            />
            <label
              className="form-check-label"
              htmlFor={`${category.name}Category`}
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
