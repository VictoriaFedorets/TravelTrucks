import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import css from "./CatalogList.module.css";
import { fetchCampers } from "../../redux/camper/operations.js";
import { selectCampers } from "../../redux/camper/selectors.js";
import CamperItem from "../CamperItem/CamperItem.jsx";

export default function CatalogList({ filters }) {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const [filteredCampers, setFilteredCampers] = useState([]);

  useEffect(() => {
    dispatch(fetchCampers()); // Виклик thunk для завантаження даних
  }, [dispatch]);

  // Фільтрація списку відповідно до критеріїв
  useEffect(() => {
    // Якщо фільтрів немає, показуємо всі кемпери
    if (!filters || Object.keys(filters).length === 0) {
      setFilteredCampers(campers);
      return;
    }

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
        "water",
        "microwave",
        "refrigerator",
      ];

      for (const equipment of equipmentFilters) {
        if (filters[equipment] && !camper[equipment]) {
          return false;
        }
      }

      // Перевірка локації
      // Перевірка локації (порівнюємо у будь-якому порядку)
      if (filters.location) {
        const [inputCity, inputCountry] = filters.location
          .split(",")
          .map(item => item.trim().toLowerCase());

        const [camperCity, camperCountry] = camper.location
          .split(",")
          .map(item => item.trim().toLowerCase());

        if (
          !(inputCity === camperCity && inputCountry === camperCountry) &&
          !(inputCity === camperCountry && inputCountry === camperCity)
        ) {
          return false;
        }
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
