import "./SideBar.css";
import avatar from "../../images/avatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar || avatar}
          alt={currentUser?.name || "Default Avatar"}
        />
        <p className="sidebar__username">{currentUser?.name || "Your Name"}</p>
      </div>
      {onEditProfile && (
        <button className="sidebar__edit-btn" type="button" onClick={onEditProfile}>
          Edit Profile
        </button>
      )}
      {onSignOut && (
        <button className="sidebar__logout-btn" type="button" onClick={onSignOut}>
          Log out
        </button>
      )}
    </div>
  );
}

export default SideBar;
