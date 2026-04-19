// React and library imports
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { signup, signin } from "../../utils/auth";

// Styles
import "./App.css";

// Constants and utils
import { coordinates, apiKey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  getCurrentUser,
  patchUser,
} from "../../utils/api";

// Contexts
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import LoginModal from "../loginModal/LoginModal";

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
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const openEditProfileModal = () => setIsEditProfileOpen(true);
  const closeEditProfileModal = () => setIsEditProfileOpen(false);

  const handleEditProfile = async (data) => {
    const token = localStorage.getItem("jwt");
    const updatedUser = await patchUser(data, token);
    setCurrentUser(updatedUser);
  };
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);

  // Restore session from stored JWT on app load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    getCurrentUser(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
      });
  }, []);
  // Registration handler

  // Like/Dislike handler
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!isLiked) {
      return addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item)),
          );
        })
        .catch((err) => console.log(err));
    } else {
      return removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item)),
          );
        })
        .catch((err) => console.log(err));
    }
  };
  const handleRegister = async ({ name, avatar, email, password }) => {
    await signup(name, avatar, email, password);
    const loginRes = await signin(email, password);
    setIsLoggedIn(true);
    localStorage.setItem("jwt", loginRes.token);
    const user = await getCurrentUser(loginRes.token);
    setCurrentUser(user);
    closeModal();
  };

  const handleLogin = async ({ email, password }) => {
    const loginRes = await signin(email, password);
    setIsLoggedIn(true);
    localStorage.setItem("jwt", loginRes.token);
    const user = await getCurrentUser(loginRes.token);
    setCurrentUser(user);
    closeModal();
  };

  const openRegisterModal = () => setActiveModal("register");
  const openLoginModal = () => setActiveModal("login");

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
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl, weather }, token)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    deleteItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id),
        );
        setSelectedCard({});
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
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
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onRegisterClick={openRegisterModal}
              onLoginClick={openLoginModal}
            />
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
                element={
                  isLoggedIn ? (
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      onSignOut={handleSignOut}
                      onEditProfile={openEditProfileModal}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/items"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
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
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={closeEditProfileModal}
            onEditProfile={handleEditProfile}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeModal}
            onRegister={handleRegister}
            onSwitchToLogin={openLoginModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeModal}
            onLoginSubmit={handleLogin}
            onSwitchToRegister={openRegisterModal}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
