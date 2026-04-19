import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import useForm from '../../hooks/useForm';

const initialFormValues = {
  name: '',
  avatar: '',
  email: '',
  password: '',
};

const validate = (values) => {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Name is required';
  if (!values.avatar.trim()) errors.avatar = 'Avatar URL is required';
  if (!values.email.trim()) errors.email = 'Email is required';
  if (!values.password.trim()) errors.password = 'Password is required';

  return errors;
};

export default function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useForm(
    initialFormValues,
    validate,
    async (formValues) => {
      await onRegister(formValues);
      resetForm();
      onClose();
    }
  );

  return (
    <ModalWithForm
      title="Register"
      buttonText={isSubmitting ? 'Registering...' : 'Register'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      secondaryButtonText="Already have an account? Sign In"
      onSecondaryClick={onSwitchToLogin}
    >
      <label htmlFor="name-input">Name</label>
      <input id="name-input" name="name" type="text" value={values.name} onChange={handleChange} required />
      {errors.name && <div className="modal__error">{errors.name}</div>}

      <label htmlFor="avatar-input">Avatar URL</label>
      <input id="avatar-input" name="avatar" type="url" value={values.avatar} onChange={handleChange} required />
      {errors.avatar && <div className="modal__error">{errors.avatar}</div>}

      <label htmlFor="email-input">Email</label>
      <input id="email-input" name="email" type="email" value={values.email} onChange={handleChange} required />
      {errors.email && <div className="modal__error">{errors.email}</div>}

      <label htmlFor="password-input">Password</label>
      <input id="password-input" name="password" type="password" value={values.password} onChange={handleChange} required />
      {errors.password && <div className="modal__error">{errors.password}</div>}
    </ModalWithForm>
  );
}
 