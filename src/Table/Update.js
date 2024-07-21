import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addUser } from "../Redux/userSlice";

function Update (){
    const {id}= useParams();
    const users = useSelector((state)=>state.users.Formdata)
      const existingUser = users.filter(editUser => editUser.id === parseInt(id));
    const { fname, lname, email, password, phnumber } = existingUser[0];
     const [editUser, setEditUser] = useState({
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        phnumber: phnumber,
       
      });
      const dispatch=useDispatch();
      const navigate = useNavigate();
      const handleInput = (e) => {
        const { name, value } = e.target;
        setEditUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    
      
      const handleUpdate = (e) => {
        e.preventDefault();
        const udata= {
            id: parseInt(id),
            fname: editUser.fname,
            lname: editUser.lname,
            email: editUser.email,
            password: editUser.password,
            phnumber: editUser.phnumber,
          };
        dispatch(addUser([udata]));
        navigate("/");
      };
    

    return(
        <div>
        <form className="registration-form" onSubmit={handleUpdate} >
          <h2>Update Form</h2>
          <label htmlFor="fname">First Name</label>
          <input
            className="registration-input"
            type="text"
            value={editUser.fname}
            name="fname"
            id="fname"
            placeholder="Enter Your First Name"
            onChange={handleInput}
          />
  
          <label htmlFor="lname">Last Name</label>
          <input
            className="registration-input"
            type="text"
            value={editUser.lname}
            name="lname"
            id="lname"
            placeholder="Enter Your Last Name"
            onChange={handleInput}
          />
  
          <label htmlFor="email">Email</label>
          <input
            className="registration-input"
            type="text"
            value={editUser.email}
            name="email"
            id="email"
            placeholder="Enter Your Email id"
            onChange={handleInput}
          />
  
          <label htmlFor="password">Password</label>
          <input
            className="registration-input"
            type="password"
            value={editUser.password}
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={handleInput}
          />
  
          <label htmlFor="phnumber">Phone Number</label>
          <input
            className="registration-input"
            type="text"
            value={editUser.phnumber}
            name="phnumber"
            id="phnumber"
            placeholder="Enter Phone Number"
            onChange={handleInput}
          />
          <button className="registration-btn" type="submit" name="submit">
            Update
          </button>
        </form>
        </div>
    );
};
export default Update;