import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import css from "./CatalogList.module.css";
import { fetchCampers } from "../../redux/camper/operations.js";
import { selectCampers } from "../../redux/camper/selectors.js";
import CamperItem from "../CamperItem/CamperItem.jsx";
import { useSearchParams } from "react-router-dom";

export default function CatalogList({ filters }) {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const [filteredCampers, setFilteredCampers] = useState([]);
  const [visibleCampers, setVisibleCampers] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 3;

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  useEffect(() => {
    if (!filters || Object.keys(filters).length === 0) {
      setFilteredCampers(campers);
    } else {
      const filtered = campers.filter(camper => {
        let matches = true;

        if (filters.vehicleType && camper.form !== filters.vehicleType) {
          matches = false;
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
            matches = false;
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
            matches = false;
          }
        }

        return matches;
      });
      setFilteredCampers(filtered);
    }
  }, [filters, campers]);

  useEffect(() => {
    const newVisibleCampers =
      !filters || Object.keys(filters).length === 0
        ? campers.slice(0, page * limit)
        : filteredCampers.slice(0, page * limit);

    setVisibleCampers(newVisibleCampers);
  }, [page, limit, campers, filteredCampers]);

  const handleLoadMore = () => {
    const newPage = page + 1;
    setSearchParams({ page: newPage, limit });
  };

  return (
    <div className={css.catalogBlock}>
      <ul className={css.camperList}>
        {visibleCampers.length > 0 ? (
          visibleCampers.map(camper => (
            <li key={camper.id}>
              <CamperItem camper={camper} />
            </li>
          ))
        ) : (
          <p>No campers found matching the criteria.</p>
        )}
      </ul>

      {visibleCampers.length < filteredCampers.length && (
        <div className={css.loadMoreContainer}>
          <button onClick={handleLoadMore} className={css.loadMoreButton}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
