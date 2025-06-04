import React from 'react'
import LatestJobsCart from './LatestJobCarts';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';


// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {

  const { allJobs } = useSelector(store => store.job);//Displaying the Jobs which come from backend



  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.9 }}
     
     className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className='text-[#5021a1] '>Latset & Top</span>Job Openings</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {
          // randomJobs.slice(0, 6).map((item, index) => <LatestJobsCart />)
          allJobs.length <= 0 ? <span>No Job Avaliable</span> : allJobs?.slice(0, 6).map((job) => <LatestJobsCart key={job._id} job={job} />)
        }
      </div>
    </motion.div>
  )
}

export default LatestJobs
