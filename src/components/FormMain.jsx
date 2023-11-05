import React from 'react'
import {BsFillImageFill} from 'react-icons/bs'

const FormMain = ({user}) => {
  return (
    <form className='flex gap-3 p-4 border-b-[1px] border-gray-700'>
        <img className='rounded-full h-[35px] md:h-[45px]' src={user?.photoURL}/>
        <div>
            <input className='w-full bg-transparent my-2 outline-none text-normal md:text-xl' type="text"
            placeholder='Neler Oluyor ? '/>
            <div>
                <BsFillImageFill/>
                <input type="file" />
                <button>Tweetle</button>
            </div>
        </div>
    </form>
  )
}

export default FormMain