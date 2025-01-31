import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader.jsx";
import SharedLayout from "./components/SharedLayout/SharedLayout.jsx";

const HomePage = lazy(() => import("./pages/HomePage//HomePage.jsx"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage.jsx"));
const DetailsPage = lazy(() => import("./pages/DetailsPage/DetailsPage.jsx"));
const Features = lazy(() => import("./components/Features/Features.jsx"));
const Reviews = lazy(() => import("./components/Reviews/Reviews.jsx"));

export default function App() {
  return (
    <SharedLayout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<DetailsPage />}>
            <Route index element={<Navigate to="features" />} />
            <Route path="features" element={<Features />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </SharedLayout>
  );
}
