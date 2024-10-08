import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export const AuthContext =createContext();

export const AuthContextProvider = ({children}) => {
  const [currentUser,setCurrentUser] =useState(JSON.parse(localStorage.getItem("user")) || null );

  const login = async (inputs) => {
    const res =await axios.post("http://localhost:5000/api/auth/login", inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data)
  }

  const logout = async () => {
    await axios.post("http://localhost:5000/api/auth/logout");
    setCurrentUser(null)
    toast.success("User logged Out!")
  }

  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(currentUser))
  },[currentUser])

  return(
    <AuthContext.Provider value={{currentUser,login,logout}}>{children}</AuthContext.Provider>
  )
}