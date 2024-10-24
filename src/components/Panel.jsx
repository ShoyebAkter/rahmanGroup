import React from 'react';

const Panel = ({ title, children, panelHeight }) => {
  return (
    <div className="md:w-1/3 w-full mt-4 min-h-[250px]">
      <div className='w-full h-[40px] bg-gray-300 py-2'>
        <h2 className="text-md font-bold mb-1 text-center">{title}</h2>
      </div>
      
      <div className={`h-full w-full p-2 bg-gray-100`}>{children}</div>
    </div>
  );
};

export default Panel;
