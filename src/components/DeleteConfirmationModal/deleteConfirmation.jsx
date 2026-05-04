import "./DeleteConfirmation.css";

function DeleteConfirmation({ isOpen, onClose, handleDeleteCard }) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_confirm">
        <button
          type="button"
          onClick={onClose}
          className="modal__close-btn"
        ></button>
        <div className="modal__confirm-container">
          <div className="modal__messages">
            <p className="modal__message">
              Are you sure you want to delete this item?
            </p>
            <p className="modal__message">This action is irreversible.</p>
          </div>
          <div className="modal__confirm-btns">
            <button
              type="button"
              className="modal__confirm-btn_type_delete"
              onClick={handleDeleteCard}
            >
              Yes, delete item
            </button>
            <button
              type="button"
              className="modal__confirm-btn_type_cancel"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;