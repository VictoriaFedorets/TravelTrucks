import { useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import sprite from "../../icons/sprite.svg";
import { fetchByIdCamper } from "../../redux/camper/operations.js";
import css from "./DetailsPage.module.css";
import clsx from "clsx";
import BookingForm from "../../components/BookingForm/BookingForm.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import {
  selectCurrentCamper,
  selectError,
  selectIsLoading,
} from "../../redux/camper/selectors.js";

export default function DetailsPage() {
  const { id } = useParams(); // Берем id из параметров маршрута
  const dispatch = useDispatch();
  const camper = useSelector(selectCurrentCamper);

  const { price, name, rating, reviews, location, description, gallery } =
    camper;
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const formattedPrice = Number(price).toFixed(2);
  // console.log(location);
  // через те що location undefined  до загрузки даних, тому робимо перевірку з тернарним нижче
  const formattedLocation = location
    ? camper.location.split(", ").reverse().join(", ")
    : "Location not available";

  const getNavLinkClass = props => {
    return clsx(css.link, props.isActive && css.active);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchByIdCamper(id));
    } else {
      console.error("ID is missing");
    }
  }, [dispatch, id]);

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!camper) return <p>No camper found.</p>;

  return (
    <div className={css.detailsWrapper}>
      <div className={css.detailsInfo}>
        <div>
          <h3 className={css.title}>{name}</h3>

          <div className={css.starLocation}>
            <a href="#reviews">
              <div className={css.icon}>
                <svg className={css.iconStar}>
                  <use href={`${sprite}#icon-star`} />
                </svg>
                <p className={css.reviews}>
                  {rating}({reviews?.length || 0} Reviews)
                </p>
              </div>
            </a>

            <div className={css.icon}>
              <svg className={css.iconMap}>
                <use href={`${sprite}#icon-map`} />
              </svg>
              <p>{formattedLocation}</p>
            </div>
          </div>

          <h3 className={css.price}>€{formattedPrice}</h3>
        </div>

        <ul className={css.imgGallery}>
          {Array.isArray(gallery) && gallery.length > 0 ? (
            gallery.map((photo, index) => (
              <li key={`${id}-${index}`} className={css.galleryItem}>
                <img src={photo.original} alt={name} className={css.imgCar} />
              </li>
            ))
          ) : (
            <p>No gallery images available.</p>
          )}
        </ul>

        <p className={css.description}>{description}</p>
      </div>

      <div className={css.featuresReviews}>
        <ul className={css.featuresReviewsList}>
          <li className={css.featuresItems}>
            <NavLink to="features" className={getNavLinkClass}>
              Features
            </NavLink>
          </li>
          <li className={css.reviewsItems} id="reviews">
            <NavLink to="reviews" className={getNavLinkClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <div className={css.formContainer}>
          <Outlet />
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
