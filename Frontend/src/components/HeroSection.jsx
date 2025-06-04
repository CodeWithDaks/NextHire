import React, { useState } from 'react'
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {

//Ham yaha useSate bna raha ha taki ham browse page pa ja kar Job dek saka.
const [query,setQuery] = useState();
const dispatch =useDispatch();
const navigate =useNavigate();

const searchJobHandler =()=>{
       dispatch(setSearchedQuery(query));
       navigate("/browse");//Go to browse page
}



  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>

        <span className="mx-auto text-xl px-4 py-2 rounded-xl bg-gray-100 text-[#F83002] font-bold shadow-lg shadow-[#F83002] opacity-100 mar">
          Welcome to <span className='text-[#5021a1] italic'>NextHire</span>
        </span>
        <h1 className='text-5xl font-bold'>Search,Apply &<br /> Get Your <span className='text-[#5021a1]'> Dream Jobs</span></h1>
        <p className='font-semibold'><i>NextHire isn't just a name — it's your gateway to what's next in your career and beyond.</i></p>

        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 my-3 mx-auto'>
          <input
            type="text"
            placeholder='Find Job'
            onChange={(e)=> setQuery(e.target.value)}
            className='outline-none border-none w-full'
          />
          <Button onClick ={searchJobHandler} className="rounded-r-full bg-[#5021a1]">
            <Search className="h-5 w-5"></Search>
          </Button>

        </div>


      </div>
    </div>
  )
}

export default HeroSection;
