import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { useNavigate } from 'react-router-dom'

const Home = () => {

useGetAllJobs();

//We do this because when a recuiter login it go to companies page;
const{user}= useSelector(store=>store.auth);
const navigate =useNavigate();
useEffect(()=>{
  if(user?.role ==='recuiter'){
    navigate("/admin/companies")
  }
},[]); 
   
  return (
    <div>
      {/* Welcome to NextHire */}
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs/>
      <Footer/>

    </div>
  )
}

export default Home;
