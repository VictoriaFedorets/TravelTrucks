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
    dispatch(fetchCampers()); // Загружаем данные через thunk
  }, [dispatch]);

  // Фильтрация списка по критериям
  useEffect(() => {
    if (!filters || Object.keys(filters).length === 0) {
      setFilteredCampers(campers);
      return;
    }

    const filtered = campers.filter(camper => {
      let matches = true; // Встановлюємо flag, щоб відстежувати, чи знайдено співпадіння

      // Проверка типа кузова
      if (filters.vehicleType && camper.form !== filters.vehicleType) {
        matches = false;
      }

      // Проверка оборудования
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

      // Проверка локации
      if (filters.location) {
        const normalizedInput = filters.location.toLowerCase().trim(); // Приводим ввод к нижнему регистру
        const inputWords = normalizedInput.split(",").map(word => word.trim()); // Разбиваем на части (город, страна)

        const camperLocation = camper.location.toLowerCase().trim();
        const camperParts = camperLocation.split(",").map(word => word.trim());

        // Проверяем, чтобы каждое слово из ввода было в локации кемпера
        const locationMatches = inputWords.every(inputPart =>
          camperParts.some(camperPart => camperPart.includes(inputPart))
        );

        if (!locationMatches) {
          matches = false;
        }
      }
      // Якщо хоча б один фільтр не проходить, то елемент не підходить
      return matches;
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
