import { createSlice } from "@reduxjs/toolkit";


//Iski help sa hama bar-bar states bna ka manage karna ki jarurat ni padti yahi manage kar leta ha
//Abhi ham ya loading Unloading ko manage kar raha ha

const authSlice =createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null
    },
    
    reducers:{
       //actions
       setloading:(state,action)=>{
        state.loading=action.payload;
       },

       setUser:(state,action)=>{
             state.user=action.payload;
       }
    }
});

export const {setloading,setUser}=authSlice.actions;
export default authSlice.reducer;