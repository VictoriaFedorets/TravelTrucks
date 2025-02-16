import sprite from "../../icons/sprite.svg";
import css from "./Facilities.module.css";

export default function Facilities({ camper }) {
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
    transmission: "icon-s-grid",
  };

  const trueFeatures = Object.entries(camper).filter(
    ([key, value]) => value === true
  );

  // Добаємо властивості з їх значеннями, якщо вони існують
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
          {/* Якщо ця властивість transmission, виводимо значення */}
          <p className={css.facilitiesText}>
            {key === "transmission" || key === "engine" ? value : key}
          </p>
        </li>
      ))}
    </ul>
  );
}
