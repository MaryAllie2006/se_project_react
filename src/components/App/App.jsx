// React and library imports
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { signup, signin } from "../../utils/auth";

// Styles
import "./App.css";

// Constants and utils
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../../utils/api";

// Contexts
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../../LoginModal";

function App() {
    // Sign out handler
    const handleSignOut = () => {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      setCurrentUser(null);
    };
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  
  // Registration handler

  // Like/Dislike handler
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        window.api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        window.api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };
  const handleRegister = async ({ name, avatar, email, password }) => {
    const res = await signup(name, avatar, email, password);
    // Immediately sign in after registration
    const loginRes = await signin(email, password);
    setIsLoggedIn(true);
    localStorage.setItem("token", loginRes.token);
  };
  // Modal open/close helpers
  const openRegisterModal = () => setActiveModal("register");
  const closeModal = () => setActiveModal("");
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addItem({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };


  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        setSelectedCard({}); // Clear the selected card after deletion
        closeActiveModal(); // Close the modal after deletion
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} onRegisterClick={openRegisterModal} />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={isLoggedIn ? <Profile handleCardClick={handleCardClick} handleAddClick={handleAddClick} clothingItems={clothingItems} onSignOut={handleSignOut} /> : <Navigate to="/" />}
              />
              {/* Remove /register route, use modal instead */}
              <Route
                path="/login"
                element={<LoginModal />}
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            activeModal={activeModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={handleDeleteItem}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeModal}
            onRegister={handleRegister}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
