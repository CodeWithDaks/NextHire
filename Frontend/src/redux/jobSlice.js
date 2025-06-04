// Slice ka matlab hai: ek particular feature ya data part ke liye state, reducers, aur 
// actions ka combination.

import { createSlice } from "@reduxjs/toolkit";

const jobSlice =createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],//For Jobs posted by
        singleJob:null,
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery :"",// In hero section for Job search by a specfic keyword
        
    },
    reducers:{
       //actions
       setAllJobs:(state,action)=>{
         state.allJobs =action.payload;
       },

       setSingleJob:(state,action)=>{
            state.singleJob =action.payload;
       },

       setAllAdminJobs:(state,action)=>{
        state.allAdminJobs=action.payload
       },
       setSearchJobByText:(state,action)=>{
        state.searchJobByText=action.payload
       },
       setAllAppliedJobs:(state,action)=>{
        state.allAppliedJobs = action.payload
       },
       setSearchedQuery:(state,action)=>{
        state.searchedQuery = action.payload
       }



    }
});
export const {setAllJobs,setSingleJob,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs,setSearchedQuery}=jobSlice.actions;
export default jobSlice.reducer;
