
import React, { useState } from "react";
import "../Table/Registration.css";
import { useFirebase } from "./firebase";

function RegistrationWithFirebase() {
    const firebase = useFirebase();
    console.log(firebase);
  const [user, setUser] = useState({
    // userId: null,
   
    email: "",
    password: "",
    
    
  });
  
  const handleInput = (e) => {
   setUser( e.target.value);
  };
  

  
const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await firebase.signupUserWithEmailAndPassword( user.email, user.password)
  console.log(result);
  };



  return (
    <div>
      <form className="registration-form" onSubmit={handleSubmit}>
        {/* <h2>{user.userId ? "Edit User" : "Add User"}</h2>
        <label htmlFor="fname">First Name</label>
        <input
          className="registration-input"
          type="text"
          value={user.fname}
          name="fname"
          id="fname"
          placeholder="Enter Your First Name"
          onChange={handleInput}
        /> */}
        {/* {error.fname && <span style={{ color: "red", textAlign:"right"}}>{error.fname}</span>} */}
        {/* <label htmlFor="lname">Last Name</label>
        <input
          className="registration-input"
          type="text"
          value={user.lname}
          name="lname"
          id="lname"
          placeholder="Enter Your Last Name"
          onChange={handleInput}
        /> */}
        {/* {error.lname && <span style={{ color: "red", textAlign:"right"}}>{error.lname}</span>} */}
        <label htmlFor="email">Email</label>
        <input
          className="registration-input"
          type="text"
          value={user.email}
          name="email"
          id="email"
          placeholder="Enter Your Email id"
          onChange={handleInput}
        />
        {/* {error.email && <span style={{ color: "red", textAlign:"right"}}>{error.email}</span>} */}
        <label htmlFor="password">Password</label>
        <input
          className="registration-input"
          type="password"
          value={user.password}
          name="password"
          id="password"
          placeholder="Enter password"
          onChange={handleInput}
        />
        {/* {error.password && <span style={{ color: "red", textAlign:"right"}}>{error.password}</span>} */}
        {/* <label htmlFor="phnumber">Phone Number</label>
        <input
          className="registration-input"
          type="text"
          value={user.phnumber}
          name="phnumber"
          id="phnumber"
          placeholder="Enter Phone Number"
          onChange={handleInput}
        /> */}
         {/* {error.phnumber && <span style={{ color: "red", textAlign:"right"}}>{error.phnumber}</span>} */}
        <button className="registration-btn" type="submit" name="submit">
          {/* {user.userId ? "Save Changes" : "Add User"} */} Submit
        </button>
      </form>
      {/* {user.error && <div style={{ color: "red" }}>{user.error}</div>} */}
      
    </div>
  );
}

export default RegistrationWithFirebase;

