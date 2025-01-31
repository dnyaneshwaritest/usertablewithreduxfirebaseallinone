import { createSlice } from "@reduxjs/toolkit";
// import Password from "antd/es/input/Password";

const initialState={
    email:'',
    password:'',
    error:''
}
const loginSlice= createSlice({
    name: 'login',
    initialState,
    reducers:{
        setEmail(state, action){
            state.email = action.payload;
        },
        setPassword(state, action){
            state.password = action.payload;
        },
        setError(state, action){
            state.error = action.payload;
        },
        clearForm(state){
            state.email='';
            state.password = '';
            state.error = '';
        },
    },
});
export const {setEmail, setPassword, setError, clearForm} = loginSlice.actions;
export default loginSlice.reducer;