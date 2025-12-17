import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

const useFilterContext = () => useContext(FilterContext);
export default useFilterContext;

export function FilterProvider({ children }) {
  const [priceRange, setPriceRange] = useState(5000); // default slider value
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const resetFilters = (category) => {
    setPriceRange(5000);
    setSelectedRating(null);
    setSortBy("");

    if (category && category !== "all") {
      setSelectedCategories([category]);
    } else {
      setSelectedCategories([]);
    }
  };

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
        searchQuery,
        setSearchQuery,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
