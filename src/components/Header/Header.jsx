import sprite from "../../icons/sprite.svg";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Header.module.css";

export default function Header() {
  const getNavLinkClass = props => {
    return clsx(css.link, props.isActive && css.active);
  };

  return (
    <header className={css.containerHeader}>
      <svg className={css.iconLogo}>
        <use href={`${sprite}#icon-logo`} />
      </svg>
      <nav className={css.nav}>
        <NavLink to="/" className={getNavLinkClass}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={getNavLinkClass}>
          Catalog
        </NavLink>
      </nav>
    </header>
  );
}
