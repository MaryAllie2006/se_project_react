import "./Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/"> <img className="header__logo" src={logo} alt="Project Logo" /> </Link>  
     
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch/>
        
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        {" "}
        + Add Clothes
      </button>
      <Link to="/profile" className="header__link"> 
      <div className="header_user-container">
        <p className="header_username">Terrence Tegegne</p>
        <img
          className="header_avatar"
          src={avatar}
          alt="Terrence Tegegne"
        ></img>
      </div>
      </Link>
    </header>
  );
}
export default Header;
