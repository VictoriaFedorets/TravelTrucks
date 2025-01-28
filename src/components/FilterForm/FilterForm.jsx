import { useId } from "react";
import { Formik, Form, Field } from "formik";
import sprite from "../../icons/sprite.svg";
import css from "./FilterForm.module.css";

export default function FilterForm({ onFilter }) {
  const id = useId();

  const handleSubmit = (values, actions) => {
    const normalizedLocation = values.location
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

    const filteredValues = {
      ...values,
      location: normalizedLocation,
    };

    console.log("Filtered values:", filteredValues); // Додано для налагодження

    onFilter(filteredValues); // Передача фільтрів до батьківського компонента
    actions.setSubmitting(false); // Завершення стану сабміту
  };

  const vehicleEquipment = [
    { name: "AC", label: "AC", icon: "icon-ac" },
    { name: "automatic", label: "Automatic", icon: "icon-automatic" },
    { name: "kitchen", label: "Kitchen", icon: "icon-kitchen" },
    { name: "TV", label: "TV", icon: "icon-tv" },
    { name: "bathroom", label: "Bathroom", icon: "icon-shower" },
    { name: "radio", label: "Radio", icon: "icon-radio" },
    { name: "gas", label: "Gas", icon: "icon-gas" },
    { name: "microwave", label: "Microwave", icon: "icon-microwave" },
    // { name: "shower", label: "Shower", icon: "icon-shower" },
    { name: "refrigerator", label: "Refrigerator", icon: "icon-fridge" },
    { name: "water", label: "Water", icon: "icon-water" },
  ];

  const vehicleTypes = [
    { value: "van", label: "Van", icon: "icon-l-grid" },
    {
      value: "fullyIntegrated",
      label: "Fully Integrated",
      icon: "icon-m-grid",
    },
    { value: "alcove", label: "Alcove", icon: "icon-s-grid" },
  ];

  return (
    <Formik
      initialValues={{
        location: "",
        AC: false,
        TV: false,
        bathroom: false,
        gas: false,
        kitchen: false,
        microwave: false,
        // shower: false,
        radio: false,
        refrigerator: false,
        water: false,
        automatic: false,
        vehicleType: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className={css.sidebar}>
          {/* Локація */}
          <label htmlFor={`${id}-location`} className={css.locationTitle}>
            Location
          </label>
          <div className={css.locationInput}>
            <svg className={css.iconMap}>
              <use href={`${sprite}#icon-map`} />
            </svg>
            <Field
              className={css.input}
              id={`${id}-location`}
              name="location"
              type="text"
              placeholder="Kyiv, Ukraine"
            />
          </div>

          {/* Фільтри */}
          <label className={css.filters}>Filters</label>

          <h2 className={css.vehicle}>Vehicle equipment</h2>
          <ul className={css.equipmentType}>
            {vehicleEquipment.map(filter => (
              <li
                key={filter.name}
                className={`${css.equipmentItem} ${
                  values[filter.name] ? css.active : ""
                }`}
              >
                <Field
                  type="checkbox"
                  id={`${id}-${filter.name}`}
                  name={filter.name}
                  className={css.fieldItem}
                />
                <label htmlFor={`${id}-${filter.name}`}>
                  <svg className={css.icon}>
                    <use href={`${sprite}#${filter.icon}`} />
                  </svg>
                  <p>{filter.label}</p>
                </label>
              </li>
            ))}
          </ul>

          <h2 className={css.vehicle}>Vehicle type</h2>
          <ul className={css.equipmentType}>
            {vehicleTypes.map(type => (
              <li
                key={type.value}
                className={`${css.equipmentItem} ${
                  values.vehicleType === type.value ? css.active : ""
                }`}
              >
                <Field
                  type="radio"
                  id={`${id}-${type.value}`}
                  name="vehicleType"
                  value={type.value}
                  checked={values.vehicleType === type.value}
                  className={css.fieldItem}
                  onChange={() => {
                    // Логіка: якщо вибрано той самий тип — знімаємо вибір
                    if (values.vehicleType === type.value) {
                      setFieldValue("vehicleType", ""); // Знімаємо вибір
                    } else {
                      setFieldValue("vehicleType", type.value); // Встановлюємо значення
                    }
                  }}
                />
                <label htmlFor={`${id}-${type.value}`}>
                  <svg className={css.icon}>
                    <use href={`${sprite}#${type.icon}`} />
                  </svg>
                  <p>{type.label}</p>
                </label>
              </li>
            ))}
          </ul>

          <button type="submit" className={css.submitButton}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
}
