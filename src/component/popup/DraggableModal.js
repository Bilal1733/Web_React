import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './DraggableModal.css';

const DraggableModal = ({ isOpen, onClose, title, children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e, ui) => {
    setPosition({
      x: position.x + ui.deltaX,
      y: position.y + ui.deltaY,
    });
  };

  const handleClick = (e) => {
    // Close the modal only if the click target is the close button
    if (e.target.classList.contains('close-button')) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Draggable
      handle=".modal-header"
      defaultPosition={{ x: 0, y: 0 }}
      position={position}
      onDrag={handleDrag}
    >
      <div className="draggable-modal">
        <div className="modal-header" onClick={handleClick}>
          <h3>{title}</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default DraggableModal;
