import { useSelector } from "react-redux";
import { selectCurrentCamper } from "../../redux/camper/selectors";
import sprite from "../../icons/sprite.svg";
import css from "./Reviews.module.css";

export default function Reviews() {
  const currentCamper = useSelector(selectCurrentCamper);
  const stars = [1, 2, 3, 4, 5];

  console.log("Current camper:", currentCamper);

  if (!currentCamper || Object.keys(currentCamper).length === 0) {
    return <p>Loading...</p>; // Показываем, пока данные не загружены
  }

  if (!currentCamper.reviews || currentCamper.reviews.length === 0) {
    return <p>No reviews available.</p>; // Нет отзывов
  }

  return (
    <div className={css.reviewsWrapper}>
      <ul>
        {currentCamper.reviews.map((review, index) => (
          <li className={css.reviewItem} key={index}>
            <div className={css.name}>
              <span className={css.firstLetter}>{review.reviewer_name[0]}</span>
              <div className={css.nameReview}>
                <h4>{review.reviewer_name}</h4>

                <ul className={css.starList}>
                  {stars.map((star, index) => (
                    <li key={index}>
                      <svg
                        className={`${css.icon} ${
                          index < review.reviewer_rating ? css.filled : ""
                        }`}
                      >
                        <use href={`${sprite}#icon-star`}></use>
                      </svg>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className={css.reviewText}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
