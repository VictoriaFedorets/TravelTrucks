import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader.jsx";

const HomePage = lazy(() => import("./pages/HomePage//HomePage.jsx"));
// const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage.jsx"));
// const DetailsPage = lazy(() => import("./pages/DetailsPage/DetailsPage.jsx"));
// const NotFoundPage = lazy(() =>
//   import("../../pages/NotFoundPage/NotFoundPage")
// );

export default function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<DetailsPage />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
}
