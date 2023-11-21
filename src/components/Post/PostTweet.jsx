import React, { useEffect, useState } from 'react'
import { BiMessageRounded } from 'react-icons/bi';
import { FaRetweet } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShare2 } from 'react-icons/fi';
import moment from 'moment/moment';
import 'moment/locale/tr'
import { auth, db } from '../../firabase/config';
import DropDown from './DropDown';
import { arrayRemove, arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import EditMode from './EditMode';


const PostTweet = ({tweet}) => {
  const [isLiked,setIsLiked] = useState()
  const [isImgDeleting,setIsImgDeleting] = useState(false)

  const [isEditMode,setIsEditMode] = useState(false)
    //tarih verisi şu andan ne kadar önce hesaplandı
    const date = moment(tweet.createdAt?.toDate()).fromNow()



    const handleEdit = async ()=>{
     

     
    }
  const handleDelete = async()=>{
    if(confirm("Tweeti silmeyi onaylıyor musunuz ?")) {
      const tweetRef = doc(db,"tweets",tweet.id)
      await deleteDoc(tweetRef)

    }
  }
  // tweeti kullanıcının beğenip beğenmediği yakalanır
  useEffect(()=> {
    const found = tweet.likes.find((id)=>id ===auth.currentUser.uid)
    setIsLiked(found)
  },[tweet])

  //* like ekleme ve silme
  const handleToggleLike =async ()=> {
  const tweetRef = doc(db,'tweets',tweet.id)

  await updateDoc(tweetRef,{
    likes: isLiked 
          ? arrayRemove(auth.currentUser.uid) //like i kaldırır
          : arrayUnion(auth.currentUser.uid ) // like i ekler
   
  })


  }
  return (
    <div className='flex relative gap-3 p-3 border-b-[1px] border-gray-700'>
      <img className='w-12 h-12  rounded-full' src={tweet.user.photo} alt="" />
      <div className='w-full'>
        {/* Üst Kısım -> kullanıcı bilgileri */}
        <div className='flex justify-between'>
            <div className='flex items-center gap-3'>
                <p className='font-bold'>{tweet.user.name}</p>
                <p className='text-gray'>@{tweet.user.name?.toLowerCase().replace(" ","_")}</p>
                <p className='text-gray'>{date}</p>
            </div>
            {/* Ayar */}
            {tweet.user.id === auth.currentUser.uid && 
            <DropDown handleEdit={()=> setIsEditMode(true)} handleDelete={handleDelete} /> }
         
        </div>
        {/* Orta Kısım -> tweet içeriği */}

        
        <div className='my-3'>
          {isEditMode ? 
             <EditMode id={tweet.id} isImgDeleting={isImgDeleting}  setIsImgDeleting={setIsImgDeleting}
             close={()=>setIsEditMode(false)} text = {tweet.textContent} isImage = {tweet.imageContent}/>
          : <p>{tweet.textContent} </p> }
            {tweet.imageContent && (
                <img className={` ${isImgDeleting && 'blur-sm'} my-2 rounded-lg w-full object-cover mx-auto max-h-[440px] `} src={tweet.imageContent} />
            )
            }
        </div>


        {/* alt kısım ->etlileşim butonları */}
        <div className="flex justify-between">
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#00b7ff69]">
            <BiMessageRounded className='text-2xl'/>
          </div>
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#44ff005a]">
            <FaRetweet className='text-2xl'/>
          </div>
          <div onClick={handleToggleLike} className="flex items-center gap-1  p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#e263eb69]">
          {isLiked ? <FcLike className='text-2xl'/>:  <AiOutlineHeart className='text-2xl' />}
            { tweet.likes.length}
          </div>
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#6600ff62]">
            <FiShare2 className='text-2xl'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostTweet
