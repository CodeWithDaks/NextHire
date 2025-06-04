
import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'


const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Gurgoan", "Pune", "Mumbai"]
  },
  
  {
    filterType: "Industry",
    array: ["Software Development", "IT", "Support Role", "FullStack Web Developer"]
  },
 
  {
    filterType: "Salary",
    array: ["0-40k", "40k-1lakh", "1 lakh-5 lakh"]
  },
]



const FilterCard = () => {

  //We make these useState,useEffect for filtering job by location ,industry,salary
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();


  const changeHandler = (value) => {
    setSelectedValue(value);
  }


  useEffect(() => {
    // console.log(selectedValue)
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>

        {
          filterData.map((data, index) => (
            <div>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, idx) => {

                  //Logic for getting unique id in radiogroupItem
                  const itemId = `id${index}-${idx}`

                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId} > {item} </Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard;