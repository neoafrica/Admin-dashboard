import React,{useState} from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";

// Modal Component
const Modal = ({ isOpen, onClose, onConfirm, deleteStatus }) => {
    const [clicked, setClicked] = useState(false)
  if (!isOpen) return null; // Don't render the modal if it's not open


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to delete this item?</h3>
        <div className="modal-buttons">
          <button className="modal-button cancel" onClick={onClose}>
            Cancel
          </button>

          {clicked && !deleteStatus ? (
            <div  className="modal-button delete-spiner">
                <Spinner animating={true} speed={1} size={16} color="#fff" />
            </div>
          ) : (
            <button className="modal-button confirm" onClick={()=>{setClicked(true),onConfirm()}}>
              Confirm
            </button>

          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
