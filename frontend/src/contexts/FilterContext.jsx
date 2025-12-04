import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCategoryContext from "./CategoryContext";

const FilterContext = createContext();

const useFilterContext = () => useContext(FilterContext);
export default useFilterContext;

export function FilterProvider({ children }) {
  const [priceRange, setPriceRange] = useState(5000); // default slider value
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortBy, setSortBy] = useState("");

  const { category } = useParams();
  const { categories } = useCategoryContext();

  const resetFilters = () => {
    setPriceRange(5000);
    setSelectedCategories([category]);
    setSelectedRating(null);
    setSortBy("");
  };

  useEffect(() => {
    if (!category || categories.length === 0) return;

    const categoryExists = categories.some((cat) => cat.name === category);
    if (categoryExists) {
      setSelectedCategories([category]);
    } else {
      setSelectedCategories([]);
    }
  }, [category, categories]);

  return (
    <FilterContext.Provider
      value={{
        priceRange,
        setPriceRange,
        selectedCategories,
        setSelectedCategories,
        selectedRating,
        setSelectedRating,
        sortBy,
        setSortBy,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
