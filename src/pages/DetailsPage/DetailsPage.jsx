import { useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import sprite from "../../icons/sprite.svg";
import { fetchByIdCamper } from "../../redux/camper/operations.js";
import css from "./DetailsPage.module.css";
import clsx from "clsx";

export default function DetailsPage() {
  const { id } = useParams(); // Берем id из параметров маршрута
  const dispatch = useDispatch();

  const camper = useSelector(state => state.camper.current);
  const isLoading = useSelector(state => state.camper.isLoading);
  const error = useSelector(state => state.camper.error);

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!camper) return <p>No camper found.</p>;

  return (
    <div className={css.detailsWrapper}>
      <div className={css.detailsInfo}>
        <div>
          <h3 className={css.title}>{camper.name}</h3>

          <div className={css.starLocation}>
            <div className={css.icon}>
              <svg className={css.iconStar}>
                <use href={`${sprite}#icon-star`} />
              </svg>
              <p className={css.reviews}>
                {camper.rating}({camper.reviews?.length || 0} Reviews)
              </p>
            </div>

            <div className={css.icon}>
              <svg className={css.iconMap}>
                <use href={`${sprite}#icon-map`} />
              </svg>
              <p>{camper.location}</p>
            </div>
          </div>

          <h3 className={css.price}>€{camper.price}</h3>
        </div>

        <ul className={css.imgGallery}>
          {Array.isArray(camper.gallery) && camper.gallery.length > 0 ? (
            camper.gallery.map((photo, index) => (
              <li key={`${id}-${index}`} className={css.galleryItem}>
                <img
                  src={photo.original}
                  alt={camper.name}
                  className={css.imgCar}
                />
              </li>
            ))
          ) : (
            <p>No gallery images available.</p>
          )}
        </ul>

        <p className={css.description}>{camper.description}</p>
      </div>

      <div className={css.featuresReviews}>
        <ul className={css.featuresReviewsList}>
          <li className={css.featuresItems}>
            <NavLink to="features" className={getNavLinkClass}>
              Features
            </NavLink>
          </li>
          <li className={css.reviewsItems}>
            <NavLink to="reviews" className={getNavLinkClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
}
