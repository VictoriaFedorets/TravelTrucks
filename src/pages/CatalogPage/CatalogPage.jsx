import CatalogList from "../../components/CatalogList/CatalogList.jsx";
import { useSelector } from "react-redux";

import css from "./CatalogPage.module.css";
import FilterForm from "../../components/FilterForm/FilterForm.jsx";

export default function CatalogPage() {
  // const handleFilterForm = userData => {
  //   // Виконуємо необхідні операції з даними
  //   console.log(userData);
  // };
  return (
    <div className={css.container}>
      <FilterForm />
      <CatalogList />
    </div>
  );
}
