import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const AgentFormModal = ({ isOpen, setModal, onSubmit, formData, setFormData, loading,  clearData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal
        isOpen={isOpen}
        contentLabel="Agent Form"
        ariaHideApp={false} // Disable accessibility warning
        style={{
            content: {
            width: '300px', // Set the width of the modal content
            margin: 'auto', // Center the modal horizontally
            // You can add more custom styles as needed
            }
        }}
        >
        <h2 className="text-lg font-semibold mb-4 text-center">Agent Form</h2>
        <hr />
        <form onSubmit={onSubmit}>
            <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mt-4">Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter name"
                required
            />
            </div>
            <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter mobile"
            />
            </div>
            <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter email"
            />
            </div>

            <hr/>

            <div className='flex flex-wrap gap-1 '>
            <button
            type="submit"
            className="inline-block mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
            {  loading ? "Processing" :  "Submit" }
            </button>
            <button
            type="button"
            onClick={() => clearData()}
            className="inline-block bg-orange-300 mt-3 hover:bg-gray-400 text-gray-800 font-semibold py-2 text-sm px-2 rounded-md"
            >
            Clear form
            </button>
            <button
            
            type="button"
            onClick={() => setModal(false)}
            className="inline-block bg-red-300 mt-3 hover:bg-gray-400 text-gray-800 font-semibold py-2 text-sm px-2 rounded-md"
            >
            Cancel
            </button>
            </div>
        </form>
        </Modal>

  );
};

export default AgentFormModal;
