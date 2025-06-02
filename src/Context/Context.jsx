import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
export let carcontext=createContext()

export default function Context({children}) {
    let[numcartitems,setnumcartitems]=useState(null)
    console.log(import.meta.env.VITE_baseURL);
    
    const baseurl=`${import.meta.env.VITE_baseURL}/api/v1/cart`
    const heaferoptions={
        headers:{
            token:localStorage.getItem("token")
        }
    }
    useEffect(()=>{if(localStorage.getItem("token")){
        getusercart().then((req)=>{
            console.log(req.data.numOfCartItems);
            setnumcartitems(req.data.numOfCartItems)
            
        })
    }

    },[])
    function getusercart(){
      return  axios.get(baseurl,heaferoptions)
    }
    function addusercart(id){
        let data={
            productId:id
        }
        return axios.post(baseurl,data,heaferoptions)
    }
    function deleteuserproduct(id){
        return axios.delete(`${baseurl}/${id}`,heaferoptions)
    }
    function clearuserproduct(){
        return axios.delete(`${baseurl}`,heaferoptions)
    }
    function update(id,count){
        let data={
            count:count
        }
        return axios.put(`${baseurl}/${id}`,data,heaferoptions)
    }
  return (
    <div>
        <carcontext.Provider value={{getusercart,clearuserproduct,update,deleteuserproduct,numcartitems,setnumcartitems,addusercart}}>{children}</carcontext.Provider>
      
    </div>
  )
}
