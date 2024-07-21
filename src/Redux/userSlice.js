import { createSlice } from "@reduxjs/toolkit";
import userData from "../Table/userData.json";

const userSlice = createSlice({
    name:'users',
    initialState: {
        Formdata:[]
    },
    reducers:{
        // addUser:(state, action)=>{
        //     state.push(action.payload)
        // },
        addUser:(state, action)=>{
            state.Formdata= action.payload;
        },
        // updateUser:(state, action)=>{
        //     const {id, efname, elname, eemail, epassword, ephnumber}= action.payload;
        //     const uu= state.find((user=>user.id === id));
        //     if(uu){                
        //         uu.fname = efname;
        //         uu.lname= elname;
        //         uu.email = eemail;
        //         uu.password = epassword;
        //         uu.phnumber = ephnumber;
        //     }
        // },
    //    deleteUser:(state, action)=>{
    //     const {id} = action.payload;
    //     const uu = state.find((user)=>user.id === id);
    //     if(uu){
    //         return state.filter(f => f.id !== id);
    //     }
    //    }
    //     // deleteUser:(state, action)=>{
        //     state.users=action.payload;
        // }
           
        
    }
})
export const {addUser} = userSlice.actions
export default userSlice.reducer;

