import React from "react"
import ClearIcon from '@mui/icons-material/Clear';
function Modal({img , setIsLargeImg}) {
  return (
    <div className="modal-container">
        <div className="cross" onClick={() => setIsLargeImg("")}>
            <ClearIcon />
        </div>
        <div className="modal">
            <img src={img} />
        </div>
    </div>
  )
};

export default Modal;