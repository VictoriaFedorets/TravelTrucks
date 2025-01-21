import { useState } from "react";
import sprite from "../../icons/sprite.svg";
import css from "./FilterForm.module.css";

export default function FilterForm({ onFilter }) {
  const [filters, setFilters] = useState({
    location: "",
    bodyType: "",
    airConditioner: false,
    kitchen: false,
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <div className={css.sidebar} onSubmit={handleSubmit}>
      <p className={css.locationTitle}>Location</p>
      <div className={css.locationInput}>
        <svg className={css.iconMap}>
          <use href={`${sprite}#icon-map`} />
        </svg>
        <input
          className={css.input}
          type="text"
          name="location"
          placeholder="Kyiv, Ukraine"
          value={filters.location}
          onChange={handleChange}
        />
      </div>

      <p className={css.filters}>Filters</p>
      <h4 className={css.vehicle}>Vehicle equipment</h4>

      <ul className={css.equipmentType}>
        <li>AC</li>
        <li>Automatic</li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <h4 className={css.vehicle}>Vehicle type</h4>

      <ul className={css.equipmentType}>
        <li>Van</li>
        <li>Fully</li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
