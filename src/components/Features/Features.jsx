import { useSelector } from "react-redux";
import { selectCurrentCamper } from "../../redux/camper/selectors";
import sprite from "../../icons/sprite.svg";
import css from "./Features.module.css";
import Facilities from "../Facilities/Facilities";

export default function Features() {
  const currentCamper = useSelector(selectCurrentCamper);
  console.log("Current camper:", currentCamper);

  const { form, length, width, height, tank, consumption } = currentCamper;

  if (!currentCamper || Object.keys(currentCamper).length === 0) {
    return <p>Loading...</p>; // Показываем, пока данные не загружены
  }

  if (!currentCamper.reviews || currentCamper.reviews.length === 0) {
    return <p>No reviews available.</p>; // Нет отзывов
  }

  return (
    <div className={css.features}>
      <Facilities camper={currentCamper} />

      <h3 className={css.title}>Vehicle details</h3>

      <ul className={css.vehicleDetails}>
        <li className={css.detailsItem}>
          <p>form</p>
          <p>{form}</p>
        </li>
        <li className={css.detailsItem}>
          <p>length</p>
          <p>{length}</p>
        </li>
        <li className={css.detailsItem}>
          <p>width</p>
          <p>{width}</p>
        </li>
        <li className={css.detailsItem}>
          <p>height</p>
          <p>{height}</p>
        </li>
        <li className={css.detailsItem}>
          <p>tank</p>
          <p>{tank}</p>
        </li>
        <li className={css.detailsItem}>
          <p>consumption</p>
          <p>{consumption}</p>
        </li>
      </ul>
    </div>
  );
}
