import useCategoryContext from "../contexts/CategoryContext";
import CategoryCard from "./CategoryCard";
import loadingImage from "../assets/modern_loader.webp";

function FeaturedCategories() {
  const { categories, loading } = useCategoryContext();

  if (loading)
    return (
      <div className="w-100 h-100 py-5 d-flex justify-content-center">
        <div style={{ width: "30px", height: "30px" }}>
          <img src={loadingImage} alt="loader" className="w-100 h-1" />
        </div>
      </div>
    );

  return (
    <div className="row g-3 justify-content-center">
      <CategoryCard categories={categories || []} />
    </div>
  );
}

export default FeaturedCategories;
