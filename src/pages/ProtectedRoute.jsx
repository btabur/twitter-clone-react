import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../firabase/config'
import { Navigate, Outlet } from 'react-router-dom'



const ProtectedRoute = () => {
    const [isAuth,setIsAuth] = useState(null)

    useEffect(()=> {

        //kullanıcı oturumu her açtığında çalışır
        onAuthStateChanged(auth,(user)=> {
                if(user) {
                    setIsAuth(true)
                }    else {
                    setIsAuth(false)
                }
        })
    },[]);

    if(isAuth===false) {
        return<Navigate to={'/'} replace/>
    }
    //yetkisi varsa alt route a  yönlendir
    return (
            <Outlet/>
          )
    
 
}

export default ProtectedRoute