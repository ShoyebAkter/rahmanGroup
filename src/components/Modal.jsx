import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, children, dimensions }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  // Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
    onClose && onClose();
  };

  // Apply Tailwind CSS classes based on modalOpen state
  const modalClasses = modalOpen ? 'fixed inset-0 flex items-center justify-center z-50 w-full' : 'hidden';

  return (
    <div className={modalClasses}>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50"></div>
      {/* Modal */}
      <div className={`fixed z-50 bg-white rounded-lg shadow-lg p-6 mx-auto ${dimensions}`}>
        {/* Close button */}
        <button className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700" onClick={handleCloseModal}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* Modal content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
