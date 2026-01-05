import "./SideBar.css";
import avatar from "../../images/avatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser?.avatar || avatar}
        alt={currentUser?.name || "Default Avatar"}
      />
      <p className="sidebar__username">{currentUser?.name || "Your Name"}</p>
      {onEditProfile && (
        <button className="sidebar__edit-btn" type="button" onClick={onEditProfile}>
          Edit Profile
        </button>
      )}
    </div>
  );
}

export default SideBar;
