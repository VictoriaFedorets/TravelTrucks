import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId, useState } from "react";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./BookingForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  bookingDate: Yup.date().required("Booking date is required"),
  comment: Yup.string().required("Comment is required"),
});

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
        validationSchema={validationSchema}
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
        {({ setFieldValue, errors, touched }) => (
          <Form>
            <Field
              className={css.input}
              id={`${id}-name`}
              name="name"
              type="text"
              placeholder="Name*"
            />
            <ErrorMessage name="name" component="div" className={css.error} />

            <Field
              className={css.input}
              id={`${id}-email`}
              name="email"
              type="email"
              placeholder="Email*"
            />
            <ErrorMessage name="email" component="div" className={css.error} />

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
              {touched.bookingDate && errors.bookingDate && (
                <div className={css.error}>{errors.bookingDate}</div>
              )}
            </div>

            <Field
              className={`${css.input} ${css.inputComment}`}
              id={`${id}-comment`}
              name="comment"
              as="textarea"
              placeholder="Сomment*"
            />
            <ErrorMessage
              name="comment"
              component="div"
              className={css.error}
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
