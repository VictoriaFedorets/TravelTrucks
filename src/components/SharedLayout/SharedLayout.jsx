import Header from "../Header/Header.jsx";
import { Toaster } from "react-hot-toast";
import css from "./SharedLayout.module.css";

export default function SharedLayout({ children }) {
  return (
    <>
      <Header className={css.container} />
      <main>{children}</main>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
