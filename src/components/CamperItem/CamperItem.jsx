import { useDispatch } from "react-redux";
import sprite from "../../icons/sprite.svg";

import css from "./CamperItem.module.css";

export default function CamperItem({
  camper: { gallery, name, price, rating, reviews, location, description },
}) {
  const dispatch = useDispatch();

  return (
    <div className={css.camperWrapper}>
      <img src={gallery[0].original} alt={name} className={css.imgCar} />

      <div className={css.carInfo}>
          <div className={css.title}>
            <h3>{name}</h3>
            <p>€{price}</p>
          </div>
    
          <div className={css.details}>
            <svg className={css.iconLogo}>
              <use href={`${sprite}#icon-star`} width={16} height={16} />
            </svg>
            <p>
              {rating}({reviews.length} Reviews)
            </p>
            <svg className={css.iconLogo}>
              <use href={`${sprite}#icon-map`} width={16} height={16} />
            </svg>
            <p>{location}</p>
          </div>
          <p className={css.description}>{description}</p>
    
          {/* <FacilitiesIcon camper={camper} /> */}
    
          <button>Show more</button>
      </div>
    </div>
  );
}
