import { useDispatch, useSelector } from "react-redux";
import sprite from "../../icons/sprite.svg";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../redux/favourites/slice";
import Facilities from "../Facilities/Facilities.jsx";
import css from "./CamperItem.module.css";
import { selectFavourites } from "../../redux/favourites/selectors.js";
import { Link, useNavigate } from "react-router-dom";

export default function CamperItem({ camper }) {
  const { id, gallery, name, price, rating, reviews, location, description } =
    camper;
  const dispatch = useDispatch();
  const formattedPrice = Number(price).toFixed(2);
  const favourites = useSelector(selectFavourites);
  const isFavourite = favourites.includes(id);

  const handleFavouriteClick = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(id));
    } else {
      dispatch(addToFavourites(id));
    }
  };

  const navigate = useNavigate();

  const handleClickSeeReviews = () => {
    navigate(`/catalog/${id}/reviews`);
  };

  const formattedLocation =
    location?.split(", ").reverse().join(", ") || "Unknown location";

  return (
    <div className={css.camperWrapper}>
      <img src={gallery[0]?.original} alt={name} className={css.imgCar} />
      <div className={css.carInfo}>
        <div className={css.title}>
          <h3>{name}</h3>
          <div className={css.price}>
            <h3>€{formattedPrice}</h3>
            <button
              onClick={handleFavouriteClick}
              className={css.btnHeart}
              aria-label={
                isFavourite ? "Remove from favourites" : "Add to favourites"
              }
              title={
                isFavourite ? "Remove from favourites" : "Add to favourites"
              }
            >
              <svg
                className={`${css.iconHeart} ${isFavourite ? css.active : ""}`}
              >
                <use href={`${sprite}#icon-heart`} />
              </svg>
            </button>
          </div>
        </div>

        <div className={css.starLocation}>
          <div
            className={css.star}
            onClick={handleClickSeeReviews}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                handleClickSeeReviews();
              }
            }}
          >
            <svg className={css.iconStar}>
              <use href={`${sprite}#icon-star`} />
            </svg>
            <p className={css.reviews}>
              {rating} ({reviews?.length || 0} Reviews)
            </p>
          </div>
          <div className={css.map}>
            <svg className={css.iconMap}>
              <use href={`${sprite}#icon-map`} />
            </svg>
            <p>{formattedLocation}</p>
          </div>
        </div>

        <p className={css.description}>{description}</p>
        <Facilities camper={camper} />
        <Link to={`/catalog/${id}`} className={css.btnShowMore}>
          Show more
        </Link>
      </div>
    </div>
  );
}
