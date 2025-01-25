import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import css from "./CatalogList.module.css";
import { fetchCampers } from "../../redux/camper/operations.js";
import CamperItem from "../CamperItem/CamperItem.jsx";

export default function CatalogList({ filters }) {
  const dispatch = useDispatch();
  const campers = useSelector(state => state.camper.items); // Доступ до всіх елементів
  const [filteredCampers, setFilteredCampers] = useState([]);

  useEffect(() => {
    dispatch(fetchCampers()); // Виклик thunk для завантаження даних
  }, [dispatch]);

  // Фільтрація списку відповідно до критеріїв
  useEffect(() => {
    // Логіка фільтрації
    const filtered = campers.filter(camper => {
      // Перевірка типу кузова
      if (filters.vehicleType && camper.form !== filters.vehicleType) {
        return false;
      }

      // Перевірка обладнання
      const equipmentFilters = [
        "AC",
        "TV",
        "bathroom",
        "kitchen",
        "gas",
        "radio",
      ];
      for (const equipment of equipmentFilters) {
        if (filters[equipment] && !camper[equipment]) {
          return false;
        }
      }

      // Перевірка локації
      if (
        filters.location &&
        !camper.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    setFilteredCampers(filtered);
  }, [filters, campers]);

  return (
    <>
      <ul className={css.camperList}>
        {filteredCampers.length > 0 ? (
          filteredCampers.map(camper => (
            <li key={camper.id}>
              <CamperItem camper={camper} />
            </li>
          ))
        ) : (
          <p>No campers found matching the criteria.</p>
        )}
      </ul>
    </>
  );
}
