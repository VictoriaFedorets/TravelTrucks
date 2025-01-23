import FilterForm from "../../components/FilterForm/FilterForm.jsx";
import CatalogList from "../../components/CatalogList/CatalogList.jsx";
import css from "./CatalogPage.module.css";
import { useState } from "react";

export default function CatalogPage() {
  const [filters, setFilters] = useState({});

  const handleFilter = filterValues => {
    setFilters(filterValues); // Зберігаємо фільтри
  };

  return (
    <div className={css.container}>
      <FilterForm onFilter={handleFilter} />
      <CatalogList filters={filters} />
    </div>
  );
}
