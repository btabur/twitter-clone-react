import React from 'react'

const Aside = () => {
  return (
    <div className='hidden lg:block p-5 mt-5'> 
    
    <ul className='flex flex-wrap gap-4'>
    <li className='border p-2 rounded-md border-gray cursor-pointer'>#scss</li>
    <li className='border p-2 rounded-md border-gray cursor-pointer'>#HTML</li>
    <li className='border p-2 rounded-md border-gray cursor-pointer'>#react</li>
    <li className='border p-2 rounded-md border-gray cursor-pointer'>#javascript</li>
    <li className='border p-2 rounded-md border-gray cursor-pointer'>#yazilimGeliştirme</li>
    </ul>
    
    </div>
  )
}

export default Aside