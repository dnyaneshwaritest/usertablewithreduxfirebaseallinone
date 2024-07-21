
import React, { useState, useEffect } from "react";
import "./Registration.css";
import { addUser } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function Registration() {
  const [user, setUser] = useState({
    userId: null,
    fname: "",
    lname: "",
    email: "",
    password: "",
    phnumber: "",
    
  });
  const [error, setError]=useState({});
  
const navigate = useNavigate();
const users = useSelector((state) => state.users.Formdata);
const dispatch = useDispatch();
const { userId } = useParams();
  
  const generateUniqueId = () => {
         const randomId = Math.random().toString(36).substr(2, 9); 
         const timestamp = Date.now().toString(36); 
          return randomId + timestamp;
       };
  useEffect(() => {
    const editData = users.find((itemdata) => itemdata.userId === userId)
    console.error("Data", editData);
    editData ? setUser({

      fname: editData.fname,
      lname: editData.lname,
      email: editData.email,
      password: editData.password,
      phnumber: editData.phnumber,
    }) : setUser({})
  }, [users,userId]);

  
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : ` ${name === "phnumber" ? "a valid phone number." : `${name} is required`}`,
    }));
  };
  

  
const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = {};

    if (!user.fname) {
    validationErrors.fname = "First name is required.";
  }

  if (!user.lname) {
    validationErrors.lname = "Last name is required.";
  }

  if (!user.email) {
    validationErrors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    validationErrors.email = "Please enter a valid email.";
  }

  if (!user.password) {
    validationErrors.password = "Password is required.";
  } else if (!/(?=.*[a-zA-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}/.test(user.password)) {
    validationErrors.password = "Please enter a valid password.";
  }

  if (!user.phnumber) {
    validationErrors.phnumber = "Phone number is required.";
  } else if (!/^[0-9]{10}$/.test(user.phnumber)) {
    validationErrors.phnumber = "Please enter a valid phone number.";
  }

  setError(validationErrors);
  

  
  // console.error("userId",Id);
  if (Object.keys(validationErrors).length === 0) {
    const Id = generateUniqueId();
    if (userId) {
      const dataIndex = users.findIndex((itemdata) => itemdata.userId === userId);
      const data = { userId: userId, ...user };
      let editData = [];
      if (dataIndex !== -1) {
        editData = users.map((item, index) => (index === dataIndex ? data : item));
      }
      dispatch(addUser(editData));
      } 
      else {
        const data = { userId: Id, ...user };
        dispatch(addUser([...users, data]));
    }

    setUser({
      userId: null,
      fname: "",
      lname: "",
      email: "",
      password: "",
      phnumber: "",
    });
    setError({});
    navigate("/");
  }
};



  return (
    <div>
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>{user.userId ? "Edit User" : "Add User"}</h2>
        <label htmlFor="fname">First Name</label>
        <input
          className="registration-input"
          type="text"
          value={user.fname}
          name="fname"
          id="fname"
          placeholder="Enter Your First Name"
          onChange={handleInput}
        />
        {error.fname && <span style={{ color: "red", textAlign:"right"}}>{error.fname}</span>}
        <label htmlFor="lname">Last Name</label>
        <input
          className="registration-input"
          type="text"
          value={user.lname}
          name="lname"
          id="lname"
          placeholder="Enter Your Last Name"
          onChange={handleInput}
        />
        {error.lname && <span style={{ color: "red", textAlign:"right"}}>{error.lname}</span>}
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
        {error.email && <span style={{ color: "red", textAlign:"right"}}>{error.email}</span>}
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
        {error.password && <span style={{ color: "red", textAlign:"right"}}>{error.password}</span>}
        <label htmlFor="phnumber">Phone Number</label>
        <input
          className="registration-input"
          type="text"
          value={user.phnumber}
          name="phnumber"
          id="phnumber"
          placeholder="Enter Phone Number"
          onChange={handleInput}
        />
         {error.phnumber && <span style={{ color: "red", textAlign:"right"}}>{error.phnumber}</span>}
        <button className="registration-btn" type="submit" name="submit">
          {user.userId ? "Save Changes" : "Add User"}
        </button>
      </form>
      {user.error && <div style={{ color: "red" }}>{user.error}</div>}
    </div>
  );
}

export default Registration;

