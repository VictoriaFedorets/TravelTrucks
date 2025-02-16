import { Formik, Form, Field } from "formik";
import { useId, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./BookingForm.module.css";

export default function BookingForm() {
  const id = useId();
  const [startDate, setStartDate] = useState(null);

  return (
    <div className={css.wrapperForm}>
      <h3 className={css.titleForm}>Book your campervan now</h3>
      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={{
          name: "",
          email: "",
          bookingDate: "",
          comment: "",
        }}
        onSubmit={(values, { resetForm }) => {
          // console.log("Form submitted with values:", values);

          // Імітація успішної відправки даних
          setTimeout(() => {
            alert("Form submitted successfully!");
            resetForm();
            setStartDate(null);
          }, 500);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <Field
              className={css.input}
              id={`${id}-name`}
              name="name"
              type="text"
              placeholder="Name*"
            />

            <Field
              className={css.input}
              id={`${id}-email`}
              name="email"
              type="email"
              placeholder="Email*"
            />

            <div
              className={css.input}
              //   id={`${id}-bookingDate`}
              // name="bookingDate"
              // type="date"
            >
              <DatePicker
                className={css.inputPicker}
                selected={startDate}
                onChange={date => {
                  setStartDate(date);
                  setFieldValue("bookingDate", date); // оновлюємо поле в Formik
                }}
                placeholderText="Booking date*"
                minDate={new Date()} // Мін дата: сьогодні
                popperPlacement="bottom-end"
              />
            </div>

            <Field
              className={`${css.input} ${css.inputComment}`}
              id={`${id}-comment`}
              name="comment"
              as="textarea"
              placeholder="Сomment*"
            />

            <button type="submit" className={css.sendButton}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
