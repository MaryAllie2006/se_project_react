import "./LoginModal.css";
import ModalWithForm from "./components/ModalWithForm/ModalWithForm";
import { useState } from "react";
   
export default function LoginModal({ onClose, isOpen, onLoginSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSubmit({ email, password })
      .then(() => {
        setEmail("");
        setPassword("");
        onClose();
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <ModalWithForm
      title="Sign In"
      buttonText="Sign In"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
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