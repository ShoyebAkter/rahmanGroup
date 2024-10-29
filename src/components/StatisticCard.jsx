import React from "react";

const StatisticCard = ({ name, value }) => {
  return (
    // <div className="w-full flex justify-stretch items-center gap-7">
    //   <div className='p-2'>{name}</div>
    //   <div className='text-2xl p-2'>{value}</div>
    // </div>
    <div className="flex justify-center items-center gap-10">
    <div class="w-[180px] text-2xl font-bold ">{value}</div>
    <div class="w-[30px] text-base text-gray-600">{name}</div>
      

    </div>
  );
};

export default StatisticCard;
