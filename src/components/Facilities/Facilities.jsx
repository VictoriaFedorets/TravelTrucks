import sprite from "../../icons/sprite.svg";
import css from "./Facilities.module.css";

export default function Facilities({ camper }) {
  // Карта иконок для соответствующих свойств
  const iconMap = {
    AC: "icon-ac",
    TV: "icon-tv",
    bathroom: "icon-shower",
    gas: "icon-gas",
    microwave: "icon-microwave",
    kitchen: "icon-kitchen",
    shower: "icon-shower",
    radio: "icon-radio",
    refrigerator: "icon-fridge",
    water: "icon-water",
    engine: "icon-fuel",
    transmission: "icon-s-grid", // Иконка для трансмиссии
  };

  // Фильтруем свойства с булевыми значениями true
  const trueFeatures = Object.entries(camper).filter(
    ([key, value]) => value === true
  );

  // Добавляем свойства с их значениями, если они существуют
  if (camper.transmission) {
    trueFeatures.push(["transmission", camper.transmission]);
  }

  if (camper.engine) {
    trueFeatures.push(["engine", camper.engine]);
  }

  return (
    <ul className={css.facilitiesList}>
      {trueFeatures.map(([key, value]) => (
        <li key={key} className={css.facilitiesItem}>
          <svg className={css.icon}>
            <use href={`${sprite}#${iconMap[key] || "icon-default"}`} />
          </svg>
          {/* Если это свойство transmission, выводим значение */}
          <p className={css.facilitiesText}>
            {key === "transmission" || key === "engine" ? value : key}
          </p>
        </li>
      ))}
    </ul>
  );
}
