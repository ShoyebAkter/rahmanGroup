import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';

const FileUpload = ({ empData, setRefresh }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fileName: '',
    fileTitle: '',
    fileAttachment: null,
  });
  const [isValidFileSize, setIsValidFileSize] = useState(true); // State to track if file size is valid

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'fileAttachment') {
      const file = files[0];
      if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
        const maxSize = 1024 * 1024; // 1 MB
        if (allowedTypes.includes(file.type) && file.size <= maxSize) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            fileAttachment: file,
          }));
          setIsValidFileSize(true); // Update isValidFileSize state
        } else {
          setIsValidFileSize(false); // Update isValidFileSize state
        }
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidFileSize) return; // Prevent form submission if file size is not valid
    setLoading(true);

    const data = new FormData();
    data.append('fileName', formData.fileName);
    data.append('fileTitle', formData.fileTitle);
    data.append('fileAttachment', formData.fileAttachment);
    data.append('employeeId', empData.id);

    axios
      .post(`${apiUrl}/employee/addFile`, data, {
        headers: {
          loginToken: localStorage.getItem('loginToken'),
        },
      })
      .then((res) => {
        setLoading(false);
        swal({
          title: 'Success',
          icon: 'success',
          text: 'Attachment has been added successfully',
        });

        setFormData({
          fileName: '',
          fileTitle: '',
          fileAttachment: null,
        });

        // Call the callback function to trigger the parent component's useEffect
        setRefresh(Date.now());

        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          swal({
            title: 'Error',
            icon: 'error',
            text: err.response.data.error,
          });
        } else {
          console.error(err);
        }
      });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="font-bold mb-4 md:text-lg text-sm">Upload File</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-4 mt-4">
          <label htmlFor="fileName" className="block text-sm font-medium text-gray-700">
            Attachment Type
          </label>
          <select
            id="fileName"
            name="fileName"
            value={formData.fileName}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md border-[1px]"
            required
          >
            <option value="">Select...</option>
            <option value="Passport">Passport</option>
            <option value="Visa">Visa</option>
            <option value="National ID">National ID</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="fileTitle" className="block text-sm font-medium text-gray-700">
            File Title
          </label>
          <input
            type="text"
            id="fileTitle"
            name="fileTitle"
            value={formData.fileTitle}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border-gray-300 rounded-md border-[1px]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fileAttachment" className="block text-sm font-medium text-gray-700">
            File Attachment (PDF or Image, max 1MB)
          </label>
          <input
            type="file"
            id="fileAttachment"
            name="fileAttachment"
            accept="image/jpeg, image/png, application/pdf"
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md border-[1px]"
          />
          {!isValidFileSize && (
            <p className="text-red-500 text-sm mt-1">File size exceeds the maximum allowed size (1 MB)</p>
          )}
        </div>
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            !isValidFileSize && 'cursor-not-allowed opacity-50'
          }`}
          disabled={!isValidFileSize || loading} // Disable the button if file size is not valid or if loading is true
        >
          {loading ? 'Submitting... please wait!' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
