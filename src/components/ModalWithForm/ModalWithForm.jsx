import "./ModalWithForm.css";

function ModalWithForm({children, buttonText, title, isOpen, onClose, onSubmit}) {

  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content">
      <h2 className="modal__title">{title}</h2>
      <button onClick={onClose} type="button" className="modal__close-btn"></button>
        <form onSubmit={onSubmit} className="modal__form">
            {children}
          <button className="modal__addGarment">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
