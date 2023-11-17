import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import {BsFillImageFill} from 'react-icons/bs'
import { toast } from 'react-toastify'
import { db, storage } from '../firabase/config';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import { v4 } from 'uuid';
import { IoMdCloseCircle } from "react-icons/io";
import Spinner from './Post/Spinner';



const FormMain = ({user}) => {

  const [isLoading,setIsLoading]=useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  //kolleksiyonun referansını alma
  const tweetCol = collection(db,"tweets");

  //resmi storage e yükler ve url sini döndürür

  const uploadImage = async (file)=> {
 
      if(!file) {
        return null;
      }

      //dosyayı yükleyeceğimiz konumun rederansını alma

    //  const fileRef = ref(storage,`${file.name}${v4()}`)
      const fileRef = ref(storage,file.name.concat(v4()))
    

      //referansını aldığımız konuma dosyayı yükle

    // referansını aldığımız konuma dosayayı yükle
    return await uploadBytes(fileRef, file)
      // başarılı oldu
      .then((res) => getDownloadURL(res.ref));
  }


  //formun gönderilmesi

  const handleSubmit =async (e)=> {
   
    e.preventDefault()
    setIsLoading(true)
    //formdaki verilere erişme
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];
  
     //yazı veya resim içeriği var mı  ?

     if(!textContent && !imageContent) {
      return toast.info("Lütfen tweet içeriği ekleyin")
     }
    
     const imageUrl = await uploadImage(imageContent)
      
     

      //kolaysiyona tweet i kaydet
      await addDoc(tweetCol, {
        textContent,
        imageContent:imageUrl,
        createdAt:serverTimestamp(),
        user:{
         id:user.uid,
         name : user.displayName,
         photo:user.photoURL
        },
        likes:[],
        isEdited:false,
      } )

      setIsLoading(false);
      setSelectedImage(false)
      e.target[0].value=""

  }

  const handleChange = (e)=> {
   
    const file = e.target.files[0];

    if (file) {
      // Seçilen dosyanın bir resim dosyası olup olmadığını kontrol etmek için
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function (e) {
          setSelectedImage(e.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        alert('Lütfen bir resim dosyası seçin.');
      }
    }


  }

  
  return (
    <form onSubmit={handleSubmit} className='flex gap-3 p-4 border-b-[1px] border-gray-700'>
        <img className='rounded-full h-[35px] md:h-[45px]' src={user?.photoURL}/>
        <div className='w-full'>
            <input className=' w-full bg-transparent my-2 outline-none text-normal md:text-xl' type="text"
            placeholder='Neler Oluyor ? '/>
             {selectedImage && 
                <div className='relative'>
                    <img className='rounded-lg py-3' src={selectedImage} alt="Seçilen Resim" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                    <IoMdCloseCircle onClick={()=>setSelectedImage(null)} className='absolute bg-black top-[20px] left-[10px] rounded-full w-[20px] h-[20px]'/>
                </div>
             }

            <div className=' w-full flex justify-between items-center'>
                {/* bu ikona tılayınca inputun devreye girmesi için  inputu labela id ile bağladık  inputu gizledik */}
                <label className='hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full' htmlFor="image">
                <BsFillImageFill/>
                </label>
                <input onChange={handleChange} className='hidden' id='image' type="file" />


                <button disabled={isLoading} className='bg-blue-600 flex items-center px-4 py-2 rounded-full transition hover:bg-blue-800'>
                  {isLoading && <Spinner className='me-3'/>} Tweetle
                </button>
            </div>
        </div>
    </form>
  )
}

export default FormMain