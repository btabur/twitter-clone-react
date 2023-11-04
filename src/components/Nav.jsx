import React from 'react'
import {RiTwitterXLine} from 'react-icons/ri'
const Nav = ({user}) => {
  return (
   <nav className='flex flex-col justify-between items-end p-2 py-4'>
    <div>
    <RiTwitterXLine className="text-4xl"/>
    
    </div>
    {/* kullanıcı bilgileri */}
    <div></div>
   </nav>
  )
}

export default Nav