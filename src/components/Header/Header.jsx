import sprite from "../../icons/sprite.svg";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Header.module.css";

export default function Header() {
  const getNavLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <header className={css.containerHeader}>
      <Link to="/" className={css.logo}>
        <svg className={css.iconLogo}>
          <use href={`${sprite}#icon-logo`} />
        </svg>
      </Link>

      <nav className={css.nav}>
        <NavLink to="/" className={getNavLinkClass}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={getNavLinkClass}>
          Catalog
        </NavLink>
        <NavLink to="/favourites" className={getNavLinkClass}>
          Favourites
        </NavLink>
      </nav>
    </header>
  );
}
