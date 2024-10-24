// NotFoundPage.js

import React from 'react';
import img from '../assets/404-error.jpg'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Page - Under development</h1>
        <p className="text-lg text-gray-600">
          The page you are looking for: is coming soon.
        </p>
        {/*<img
          src={img} // Replace with your own image
          alt="404 Not Found"
          className="mt-8 w-2/3 self-center h-auto"
  />*/}
      </div>
    </div>
  );
};

export default NotFound;
