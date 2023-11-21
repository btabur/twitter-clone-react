import React, { useRef, useState } from 'react'
import { BiSolidSave } from "react-icons/bi";
import {ImCancelCircle} from "react-icons/im"
import {BsFillTrashFill} from "react-icons/bs"
import { db } from '../../firabase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { RiArrowGoBackFill } from "react-icons/ri";

const EditMode = ({id,text,isImage,close,isImgDeleting,setIsImgDeleting}) => {

  const inputRef = useRef();
 

//* Delete Fonksiyon
  const deleteImage= async ()=> {
        // const tweetRef = doc(db,'tweets',id)
        // await updateDoc(tweetRef,{imageContent:null})

        setIsImgDeleting(!isImgDeleting)
    } 
  
    const handleSave = async ()=> {
      const tweetRef = doc(db,'tweets',id)

      try {
        //yazı içeriğini günceller
          await updateDoc(tweetRef,{textContent:inputRef.current.value})

          //resim silenecekse siler
          if(isImgDeleting) {
            await updateDoc(tweetRef,{imageContent:null})
          }
      }catch(err) {
          console.log(err)
      }

    

      close()
    }
  return (
    <div className='flex align-items-center '>
                <input  ref={inputRef}
                className='rounded p-1 px-2 text-black' type='text' defaultValue={text}/> 
                <button onClick={handleSave}
                className='mx-4 p-2 text-xl text-green-400 rounded-full hover:bg-gray-500'>
                  <BiSolidSave/>
                </button>
                <button onClick={()=> {close(); setIsImgDeleting(false) }}
                 className='mx-4 p-2 text-xl text-red-400 rounded-full hover:bg-gray-500'>
                  <ImCancelCircle/>
                </button>
                {isImage && 
                  <button onClick={deleteImage} className='absolute end-0 top-20 bg-white transition mx-4 p-2 text-xl text-red-400 rounded-full hover:bg-gray-500  '>
                 {!isImgDeleting ? <BsFillTrashFill/> :<RiArrowGoBackFill/> }
                </button>
                }
              </div>
  )
}

export default EditMode