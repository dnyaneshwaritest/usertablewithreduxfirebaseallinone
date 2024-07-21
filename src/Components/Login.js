import React,{useState} from "react";
import { Input, Form, Button,Card } from "antd";
import Password from "antd/es/input/Password";
import { useSelector, useDispatch } from "react-redux";
import { setEmail, setPassword, setError, clearForm } from "../Redux/loginSlice";
import "../Style/Login.css";

function Login (){
    const dispatch= useDispatch();
    const {email, password, error} = useSelector((state)=>state.login);
    // const [email, setEmail]= useState('');
    // const [password, setPassword]= useState('');
    // const [error, setError]= useState('');

    const handleChangeEmail = (e)=>{
        dispatch(setEmail(e.target.value));
        dispatch(setError(''));
    }

    const handleChangePassword = (e)=>{
        dispatch(setPassword(e.target.value));
        dispatch(setError(''));
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidation.test(email)){
        dispatch(setError("Please Enter Valid Email Address."))
        return;
    }

    const passwordValidation = /^(?=.*[a-zA-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
    if (!passwordValidation.test(password)){
        dispatch(setError("Password should have atleast 8 characters long with atleast 1 spacel character, 1 number 1 capital letter. "))
        return;
    }
    console.log('Email:', email);
    console.log('Password:', password);
    // setEmail('');
    // setPassword('');
    // setError('');
    dispatch(clearForm());
}
    return(
        <div>
           <Card className="login-card"> 
            <Form className="login-form" onClick={handleSubmit}>
                <label>Email Id</label>
                <Input type="email" value={email}
                onChange={handleChangeEmail}
                 placeholder="Please Enter yor email id"/>
                
                  <label>Password</label>
                <Password
                value={password}
                onChange={handleChangePassword}/>
                
                {/* {password && <p style={{color:'red'}}>{error}</p>} */}
                <Button className="login-btn">Login</Button>
            </Form>
            {error && <div style={{color:'red'}}>{error}</div>}
            </Card>
        </div>
    )
};

export default Login;