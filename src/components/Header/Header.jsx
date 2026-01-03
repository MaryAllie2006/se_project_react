import "./Header.css";
import logo from "../../images/logo.svg";
import avatarDefault from "../../images/avatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData, onRegisterClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;

  return (
    <header className="header">
      <Link to="/"> <img className="header__logo" src={logo} alt="Project Logo" /> </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch/>
      {isLoggedIn && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
      )}
      {isLoggedIn ? (
        <Link to="/profile" className="header__link">
          <div className="header_user-container">
            <p className="header_username">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img
                className="header_avatar"
                src={currentUser.avatar}
                alt={currentUser.name}
              />
            ) : (
              <div className="header_avatar header_avatar_placeholder">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </Link>
      ) : (
        <div className="header__auth-links">
          <Link to="/login" className="header__link">Sign In</Link>
          <button
            type="button"
            className="header__register-btn"
            onClick={onRegisterClick}
          >
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
}
export default Header;
