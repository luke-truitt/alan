import React, { useContext } from "react";
import { AuthContext, AuthProvider } from "../../providers/AuthProvider";
import { navigate } from "react-router-dom";
import {auth, generateUserDocument} from "../../firebase";

const ProfilePage = () => {
  const user = useContext(AuthContext);
  const {firstName, lastName, phone, email} = user;

  console.log(firstName);
  console.log(lastName);
  console.log(phone);
  console.log(email);
  console.log(user);
  
  return (
    <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        
        <div className = "md:pl-4">
        <h2 className = "text-2xl font-semibold">{firstName} {lastName}</h2>
        <h3 className = "italic">{email}</h3>
        <h3 className = "italic">{phone}</h3>
        </div>
      </div>
      <button className = "w-full py-3 bg-red-600 mt-4 text-white" onClick = {() => {auth.signOut()}}>Sign out</button>
    </div>
  ) 
};

export default ProfilePage;
