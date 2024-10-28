import React from 'react'

const Card = ({title, children}) => {
  return (
    // <div className='min-w-[275px] flex flex-col shadow-md rounded-sm'>
    //     <h1 className="text-xl font-bold w-full p-3 bg-gray-800 text-white rounded-md">{title}</h1>
    //     <div className='p-2'>
    //         {children}
    //     </div>
    // </div>
    <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="p-5">
                                                
                                                <div
                                                    class="bg-green-500 rounded-full py-2 px-2 text-center text-white font-semibold text-sm">
                                                    {title}
                                                </div>
                                            </div>
                                            <div class="ml-2 w-full">
                                                {children}
                                            </div>
                                        </div>
                                    </a>
  )
}

export default Card
