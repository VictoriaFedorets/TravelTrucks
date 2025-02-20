import { useSelector } from "react-redux";
import { selectFavourites } from "../../redux/favourites/selectors.js";
import {
  selectCampers,
  selectIsLoading,
} from "../../redux/camper/selectors.js";
import CamperItem from "../../components/CamperItem/CamperItem.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./FavouritesPage.module.css";

export default function FavouritesPage() {
  const isLoading = useSelector(selectIsLoading);
  const campers = useSelector(selectCampers);
  const favouritesList = useSelector(selectFavourites);
  // console.log(favouritesList);

  const favouriteCampers = campers.filter(
    camper => favouritesList.includes(camper.id.toString()) // Перевіряємо ID як рядки
  );

  return (
    <div className={css.container}>
      {isLoading ? (
        <Loader />
      ) : favouritesList.length > 0 ? (
        <ul className={css.camperList}>
          {favouriteCampers.map(camper => (
            <li key={camper.id}>
              <CamperItem camper={camper} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={css.error}>
          <p aria-live="polite">No favourites added yet...</p>
        </div>
      )}
    </div>
  );
}
