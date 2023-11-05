import React from 'react'
import FormMain from './FormMain'



const Main = ({user}) => {
  return (
   <main className='border border-gray-700 overflow-y-auto'>
    <header className='font-bold p-4 border-b-[1px] border-gray-700'>
        AnaSayfa
      
    </header>
    <FormMain user = {user}/>

   </main>
  )
}

export default Main