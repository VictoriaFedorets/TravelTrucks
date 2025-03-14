import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/camper/operations.js";
import { selectCampers } from "../../redux/camper/selectors.js";
import FilterForm from "../../components/FilterForm/FilterForm.jsx";
import CatalogList from "../../components/CatalogList/CatalogList.jsx";
import css from "./CatalogPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";
import { selectIsLoading } from "../../redux/camper/selectors.js";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const campers = useSelector(selectCampers);
  const [filters, setFilters] = useState({});
  const [filteredCampers, setFilteredCampers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  useEffect(() => {
    let filtered = campers;

    if (filters && Object.keys(filters).length > 0) {
      filtered = campers.filter(camper => {
        let isValid = true;

        if (filters.vehicleType && camper.form !== filters.vehicleType) {
          isValid = false;
        }

        const equipmentFilters = [
          "AC",
          "TV",
          "bathroom",
          "kitchen",
          "gas",
          "radio",
          "water",
          "microwave",
          "refrigerator",
        ];

        for (const equipment of equipmentFilters) {
          if (filters[equipment] && !camper[equipment]) {
            isValid = false;
          }
        }

        if (filters.location) {
          const normalizedInput = filters.location.toLowerCase().trim();
          const inputWords = normalizedInput
            .split(",")
            .map(word => word.trim());

          const camperLocation = camper.location.toLowerCase().trim();
          const camperParts = camperLocation
            .split(",")
            .map(word => word.trim());

          const locationMatches = inputWords.every(inputPart =>
            camperParts.some(camperPart => camperPart.includes(inputPart))
          );

          if (!locationMatches) {
            isValid = false;
          }
        }

        return isValid;
      });
    }

    setFilteredCampers(filtered);
    setVisibleCount(5); // Скидуємо кільк кемперів при зміні фильтра
  }, [filters, campers]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  return (
    <div className={css.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <FilterForm onFilter={setFilters} />
          <CatalogList
            campers={filteredCampers}
            visibleCount={visibleCount}
            onLoadMore={handleLoadMore}
          />
        </>
      )}
    </div>
  );
}
