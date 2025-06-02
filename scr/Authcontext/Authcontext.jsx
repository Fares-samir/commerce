import React, { createContext, useEffect, useState } from 'react'

export let Authcon=createContext();
export default function Authcontext({children}) {
   let[token,settoken]= useState(null)
   useEffect(()=>{
    if(localStorage.getItem("token")){
      settoken(localStorage.getItem("token"))
    }
   },[])

  return (
    <div>
        <Authcon.Provider value={{token,settoken}}>
            {children}
        </Authcon.Provider>
      
    </div>
  )
}
