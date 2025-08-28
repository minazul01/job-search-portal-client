/* eslint-disable react/prop-types */

import {  Link } from "react-router-dom";
import { format } from 'date-fns'

const JobCard = ({data}) => {

  console.log(data)

  const {
  bit_count,
  // buyer: { email, name: buyerName, photo },
  category,
  deadline,
  description,
  maxPrice,
  minPrice,
  title,
  _id
} = data || [];

  return (
     <Link
      to={`/job/${_id}`}
      className='w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all'
    >
      <div className='flex items-center justify-between'>
        <span className='text-xs font-light text-gray-800 '>
          Deadline: {format(new Date(deadline), 'P')}
        </span>
        <span className='px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full '>
          {category}
        </span>
      </div>

      <div>
        <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
          {title}
        </h1>

        <p className='mt-2 text-sm text-gray-600 '>
         {description?.substring(0,150)}
        </p>
        <p className='mt-2 text-sm font-bold text-gray-600 '>
          Range: ${minPrice} - ${maxPrice}
        </p>
        <p className='mt-2 text-sm font-bold text-gray-600 '>Total Bids: {bit_count}</p>
      </div>
    </Link>
  )
}
export default JobCard;
