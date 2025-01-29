import css from "./CatalogList.module.css";
import CamperItem from "../CamperItem/CamperItem.jsx";
import { Link } from "react-router-dom";

export default function CatalogList({ campers, visibleCount, onLoadMore }) {
  const visibleCampers = campers.slice(0, visibleCount);

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
          <div className={css.error}>
            <p>Oops! No campers found. Try changing the search parameters.</p>
          </div>
        )}
      </ul>

      {visibleCount < campers.length && (
        <div className={css.loadMoreContainer}>
          <button onClick={onLoadMore} className={css.loadMoreButton}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
