import "./ModalWithForm.css";

function ModalWithForm({children, buttonText, title, activeModal}) {
    console.log(activeModal);
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened" }`}>
      <div className="modal__content">
      <h2 className="modal__title">{title}</h2>
      <button type="button" className="modal__close-btn"></button>
        <form className="modal__form">
            {children}
          <button className="modal__addGarment">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
