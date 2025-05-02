import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
export default function AddItemModal({ onClose, isOpen, activeModal, onAddItemModalSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState(""); 

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = () => {
    e.preventDefault(); 
    onAddItemModalSubmit({name, imageUrl, weather}); 
    //empty the inputs 
    setName("");
    setImageUrl(""); 
    setWeather(""); 
  }; 

  return (
    <ModalWithForm
      buttonText="Add Garment"
      title="New Garment"
      activeModal={activeModal}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit ={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
      </label>
      <input
        type="text"
        className="modal__input"
        id="name"
        placeholder="Name"
        required
        minLength="1"
        maxLength="20"
        onChange={handleNameChange}
      />
      <label htmlFor="image" className="modal__label">
        Image
      </label>
      <input
        type="url"
        className="modal__input"
        id="image"
        placeholder="Image URL"
        required
        onChange={handleImageUrlChange}
        value={imageUrl}
      />
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend"> Select the weather type : </legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
