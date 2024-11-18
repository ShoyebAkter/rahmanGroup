import React from 'react';

const Panel = ({ title, children, panelHeight }) => {
  return (
    <div className=" w-full mt-4 ">
    <div className="w-full h-[40px] bg-gray-300 py-2 rounded-t-lg shadow-md">
      <h2 className="text-md font-bold text-center">{title}</h2>
    </div>
    <div className="h-full w-full p-4 bg-gray-100 text-center py-6 rounded-b-lg shadow-md">{children}</div>
  </div>
  );
};

export default Panel;
