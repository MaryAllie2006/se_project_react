import React, { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfileModal({ isOpen, onClose, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onEditProfile({ name, avatar });
      onClose();
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText={loading ? "Saving..." : "Save"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">Name</label>
      <input
        type="text"
        className="modal__input"
        id="name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <label htmlFor="avatar" className="modal__label">Avatar URL</label>
      <input
        type="url"
        className="modal__input"
        id="avatar"
        value={avatar}
        onChange={e => setAvatar(e.target.value)}
        required
      />
      {error && <div className="modal__error">{error}</div>}
    </ModalWithForm>
  );
}
