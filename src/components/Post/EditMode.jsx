import React from 'react'
import { BiSolidSave } from "react-icons/bi";
import {ImCancelCircle} from "react-icons/im"
import {BsFillTrashFill} from "react-icons/bs"
const EditMode = ({id,text,isImage}) => {
    const deleteImage= ()=> {
        
    }
  return (
    <div className='flex align-items-center '>
                <input className='rounded p-1 px-2 text-black' type='text' defaultValue={text}/> 
                <button className='mx-4 p-2 text-xl text-green-400 rounded-full hover:bg-gray-500'>
                  <BiSolidSave/>
                </button>
                <button className='mx-4 p-2 text-xl text-red-400 rounded-full hover:bg-gray-500'>
                  <ImCancelCircle/>
                </button>
                {isImage && 
                  <button onClick={deleteImage} className='absolute end-0 top-20 bg-white transition mx-4 p-2 text-xl text-red-400 rounded-full hover:bg-gray-500  '>
                  <BsFillTrashFill/>
                </button>
                }
              </div>
  )
}

export default EditMode