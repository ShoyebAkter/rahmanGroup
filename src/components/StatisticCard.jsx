import React from 'react'

const StatisticCard = ({ name, value }) => {

  return (
    <div className="w-full flex justify-stretch items-center gap-7">
      <div className='p-2'>{name}</div>
      <div className='text-2xl p-2'>{value}</div>
    </div>
  );
};

export default StatisticCard;
