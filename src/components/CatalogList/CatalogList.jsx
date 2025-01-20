import { useDispatch, useSelector } from "react-redux";
import css from "./CatalogList.module.css";
import { useEffect } from "react";
import { fetchCampers } from "../../redux/transport/operations.js";
import CamperItem from "../CamperItem/CamperItem.jsx";

export default function CatalogList() {
  const dispatch = useDispatch();
  // const campersState = useSelector(state => state);
  // console.log(campersState);
  const campers = useSelector(state => state.transport.items); // Змінити відповідно до структури
  console.log(campers);

  useEffect(() => {
    dispatch(fetchCampers()); // Виклик thunk
  }, [dispatch]);

  return (
    <>
      <ul className={css.camperList}>
        {campers.map(camper => (
          <li key={camper.id}>
            <CamperItem camper={camper} />
          </li>
        ))}
      </ul>
    </>
  );
}
