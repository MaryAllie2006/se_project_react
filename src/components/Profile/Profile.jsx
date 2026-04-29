import {useState} from "react"; 
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css"; 

function Profile({handleCardClick, handleAddClick, clothingItems, onCardLike, onSignOut, onEditProfile}) {
        return (
            <div className="profile">
                <section className="profile__sidebar">
                    <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />
                </section>
                <section className="profile__clothes-items">
                    <ClothesSection handleCardClick={handleCardClick} handleAddClick={handleAddClick} clothingItems={clothingItems} onCardLike={onCardLike} />
                </section>
                
            </div>
        );
}    

export default Profile;   