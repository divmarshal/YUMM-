import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddItems from "./components/addItems/AddItems";
import { useDispatch } from "react-redux";
import { fetchQuery } from "./utils/firebaseFunctions";
import Loader from "./components/loader/Loader";
import { setFoodItems } from "./store/data-slice";
import DishDetails from "./pages/DishDetails";
import RootLayout from "./pages/RootLayout";
import CategoryDish from "./pages/CategoryDish";
import Cart from "./components/cart/Cart";
import SearchFeed from "./components/searchFeed/SearchFeed";
import FilterItems from "./components/filterItems/FilterItems";
import ModalItems from "./pages/ModalItems";
import ErrorPage from "./components/error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/addItem",
        element: <AddItems />,
      },
      {
        path: "/dish/:dishId",
        element: <DishDetails />,
      },
      { path: "/category/:categoryDish", element: <CategoryDish /> },
      { path: "/cart", element: <Cart /> },
      { path: "/searchFeed/:searchTerm", element: <SearchFeed /> },
      { path: "/filterItems", element: <FilterItems /> },
      { path: "/modal/:modalItems", element: <ModalItems /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const { isLoading, data } = fetchQuery();
  useEffect(() => {
    dispatch(setFoodItems(data));
  }, [data]);
  if (isLoading)
    return (
      <>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Loader />
        </div>
      </>
    );

  return <RouterProvider router={router} />;
}

export default App;
