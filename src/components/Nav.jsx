import React from 'react'
import {RiTwitterXLine} from 'react-icons/ri'
import { navSections } from '../constants'
import UserLoader from './UserLoader'
import { BiDoorOpen } from 'react-icons/bi'
import { signOut } from 'firebase/auth'
import { auth } from '../firabase/config'
import { useNavigate } from 'react-router-dom'
const Nav = ({user}) => {
  const navigate = useNavigate();
  return (
   <nav className='flex flex-col justify-between items-end p-2 py-4'>
    <div>
    <RiTwitterXLine className="text-4xl mb-4"/>

    {navSections.map((i)=> (
      <div className='flex justify-center md:justify-normal items-center gap-3 text-2xl md:text-lx p-3 cursor-pointer transition rounded-lg hover:bg-[#4c4a4a]'>
        {i.icon}
        <span className='hidden md:block'>{i.title}</span>
      </div>
    ))}
    </div>
    {/* kullanıcı bilgileri */}
    <div>
      {!user ? <UserLoader/> : 
      <div className='flex flex-col gap-5'> 
      <div className='flex gap-2 items-center'>
      <img className='w-12 h-12 rounded-full' src={user.photoURL} alt="" />
        <p className='hidden md:block '>{user.displayName}</p>
      </div>
      

        <button
         onClick={()=> signOut(auth).then(()=> navigate("/"))}
         className='flex justify-center items-center gap-1 bg-gray-700 rounded cursor-pointer text-2xl md:text-[14px] p-3'>
          <BiDoorOpen className='text-2xl'/>
         <span className='hidden md:block '> Çıkış Yap</span>
          </button>
        </div>}
    </div>
   </nav>
  )
}

export default Nav