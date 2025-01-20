import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={css.heroBackground}>
      <div className={css.containerHome}>
        <h1>Campers of your dreams</h1>
        <p>You can find everything you want in our catalog</p>
        <Link to="./catalog" className={css.btnViewNow}>
          View Now
        </Link>
      </div>
    </section>
  );
}
