import React, { useEffect, useState } from 'react'
import FormMain from './FormMain'
import { collection, onSnapshot } from 'firebase/firestore'
import Loader from './Post/Loader'
import PostTweet from './Post/PostTweet'
import { db } from '../firabase/config'


const Main = ({user}) => {
  const [tweets,setTweets] =useState(null)
  //atılan tweetleri çekme 
  useEffect(()=> {
  
  const tweetCol = collection(db,'tweets')
  
  onSnapshot(tweetCol,(snapshot)=> {

    const tempTweets = []
    snapshot.forEach((doc)=> tempTweets.push({id:doc.id,...doc.data()}))

    setTweets(tempTweets)
  });


  },[])
  return (
   <main className='border border-gray-700 overflow-y-auto'>
    <header className='font-bold p-4 border-b-[1px] border-gray-700'>
        AnaSayfa
      
    </header>
    <FormMain user = {user}/>

    {!tweets ? <Loader/> : tweets.map((tweet)=> <PostTweet key={tweet.id} tweet={tweet}/>)
    }
   </main>
  )
}

export default Main