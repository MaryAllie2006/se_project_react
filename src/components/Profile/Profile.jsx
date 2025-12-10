import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css"; 

function Profile({handleCardClick, handleAddClick, clothingItems, onSignOut}) {
        return (
            <div className="profile">
                <section className="profile__sidebar">
                    <SideBar />
                    <button className="profile__signout-button" onClick={onSignOut}>
                        Sign out
                    </button>
                </section>
                <section className="profile__clothes-items">
                    <ClothesSection handleCardClick={handleCardClick} handleAddClick={handleAddClick} clothingItems={clothingItems} />
                </section>
            </div>
        );
}

export default Profile;   