import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { FilterProvider } from "./contexts/FilterContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import { UserProvider } from "./contexts/UserContext";
import { CartProvider } from "./contexts/CartContext";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/products/:category",
    element: (
      <FilterProvider>
        <ProductsPage />
      </FilterProvider>
    ),
  },
  {
    path: "/products/details/:productId",
    element: <ProductDetailsPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
]);

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <CategoryProvider>
          <RouterProvider router={router} />
        </CategoryProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
