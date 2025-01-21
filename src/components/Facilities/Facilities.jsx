import css from "./Facilities.module.css";

export default function Facilities({ camper }) {
  console.log(camper);
  // Фильтруем свойства с значениями true
  const trueFeatures = Object.entries(camper).filter(
    ([key, value]) => value === true
  );

  return (
    <div>
      <ul className={css.facilitiesList}>
        {trueFeatures.map(([key]) => (
          <li key={key} className={css.facilitiesItem}>
            {/* <svg>
              <use></use>
            </svg> */}
            <p className={css.facilitiesText}>{key}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
