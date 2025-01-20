import CatalogList from "../../components/CatalogList/CatalogList.jsx";
import { useSelector } from "react-redux";

import css from "./CatalogPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

export default function CatalogPage() {
  return (
    <div className={css.container}>
      <Sidebar />
      <CatalogList />
    </div>
  );
}
