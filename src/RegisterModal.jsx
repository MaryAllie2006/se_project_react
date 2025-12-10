import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { signup } from "./utils/auth";

export default function RegisterModal({ onClose, isOpen, onRegisterSubmit }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSubmit({ name, avatar, email, password })
      .then(() => {
        setName("");
        setAvatar("");
        setEmail("");
        setPassword("");
        onClose();
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name-input" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name-input"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="avatar-input" className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          id="avatar-input"
          placeholder="Enter your avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
          required
        />
      </label>
      <label htmlFor="email-input" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email-input"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor="password-input" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="password-input"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}