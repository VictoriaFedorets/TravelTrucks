import { useEffect } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import sprite from "../../icons/sprite.svg";
import { fetchByIdCamper } from "../../redux/transport/operations";
import css from "./DetailsPage.module.css";
import clsx from "clsx";

export default function DetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(state =>
    state.transport.items.find(item => item.id === id)
  );

  const getNavLinkClass = props => {
    return clsx(css.link, props.isActive && css.active);
  };

  useEffect(() => {
    if (!camper) {
      dispatch(fetchByIdCamper(id)); // Виклик thunk для завантаження даних
    }
  }, [dispatch, id, camper]);

  if (!camper) {
    return <p>Loading...</p>; // Пока данные загружаются
  }

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
          {camper.gallery.map((photo, index) => (
            <li key={`${id}-${index}`} className={css.galleryItem}>
              <img
                src={photo.original}
                alt={camper.name}
                className={css.imgCar}
              />
            </li>
          ))}
        </ul>

        <p className={css.description}>{camper.description}</p>
      </div>

      <div>
        <ul className={css.featuresReviews}>
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
