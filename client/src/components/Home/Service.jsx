import React from 'react'
import { Link } from 'react-router-dom'

const Service = () => {
  return (
    <div className='mt-10'>

    <div className='service h-[43vh] w-full '>
     <div className='flex items-center justify-center flex-col h-[100%] gap-y-6 mx-auto text-center'>
      <p className='text-white text-xl  font-semibold'>Repair Service</p>
      <p className='text-3xl text-white font-bold'>Up To 70% off - All t-shirt & Accessories</p>
      <Link to={'/products'}>
      <button className='border border-gray-10 bg-white text-slate-800 py-2 px-14 font-semibold hover:bg-transparent transition-all duration-100 hover:text-white '>Explore Now </button>
      </Link>
     </div>
    </div>
    </div>
  )
}

export default Service
