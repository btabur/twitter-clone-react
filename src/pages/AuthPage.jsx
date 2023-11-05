import React, { useState } from "react";

import {FcGoogle} from 'react-icons/fc';
import {RiTwitterXLine} from 'react-icons/ri'
import {auth, provider} from '../firabase/config'
import {createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const AuthPage = () => {

    const [SignUp ,setSignUp] = useState(false);
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError]=useState(false);

    const navigate = useNavigate()

    const handleSubmit = (e)=> {
        e.preventDefault()
            if(SignUp) {
                //yeni hesap oluştur

                createUserWithEmailAndPassword(auth,email,password)
                .then(res => toast.success("Hesap oluşturuldu"))
                .catch(err => {
                    toast.error("Bir hata oluştu")
                    console.log("hata oldu",err)})
            }else {
                //var olan hesaba gir

                signInWithEmailAndPassword(auth,email,password)
                .then(()=> toast.success("Giriş Yapıldı"))
                .catch(err=> {
                    toast.error("Bir hata oluştu")
                    console.log("hata oluştu",err.code)
                    //şifreyi unuttu ise
                    if(err.code=== 'auth/invalid-login-credentials') {
                        setError(true)
                    }
                })
            }
    }
    const handleGoogle = ()=> {
        signInWithPopup(auth,provider)
        .then(()=> navigate("/feed"))
    }

    const resetPassword = ()=> {
        sendPasswordResetEmail(auth,email)
        .then(()=> console.log('şifre sıfırlama şifresi gönderildi'))

    }
  return (
    <section className=" h-screen grid place-items-center">
      <div className="bg-black flex flex-col p-20 rounded-lg">
        {/* logo */}
        <div className="flex justify-center mb-5">
           <RiTwitterXLine className="text-4xl"/>
        </div>
        <h1 className="text-center font-bold text-xl mb-5">Twitter'a giriş yap</h1>

        <button onClick={handleGoogle} className="flex items-center bg-white py-2 px-10 rounded-full text-black cursor-pointer gap-3 transition ">
                <FcGoogle className="text-lg"/>
            <span>Google ile Giriş Yap</span>
        </button>
        <form onSubmit={handleSubmit}
        className="flex flex-col">
            <label className="mt-5">E Mail</label>
            <input onChange={(e) =>setEmail(e.target.value)} className="text-black rounded mt-1 p-2 outline-none shadow focus:shadow-[gray]" type="text" required />
        
            <label className="mt-5">Şifre</label>
            <input onChange={(e) => setPassword(e.target.value)} className="text-black rounded mt-1 p-2 outline-none shadow focus:shadow-[gray]" type="password" required/>

            <button className="bg-white text-black mt-10 rounded-full p-1 font-bold">
                {SignUp ? 'Kaydol' : 'Giriş Yap'}
                </button>

                <p className="mt-5 flex gap-4">
                    <span>
                        {SignUp ? ' Hessabınız varsa ' :'Hesabınız yoksa'}
                    </span>
                    <span className="cursor-pointer text-blue-600" onClick={()=> setSignUp(!SignUp)}>
                        {SignUp ? 'Giriş Yap ': ' Kaydolun'}
                    </span>
                </p>
        </form>

        {error && (
            <p className="mt-5 text-center text-red-500 cursor-pointer"
            onClick={resetPassword}>
                Şifrenizi mi Unuttunuz ?</p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
