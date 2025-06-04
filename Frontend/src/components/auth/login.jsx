import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setloading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'

const Login = () => {

  const [input, setInput] = useState({

    email: "",
    password: "",
    role: "",

  });

  const navigate = useNavigate();
  const dispatch = useDispatch();//dispatch is used to send an action to the Redux store, which updates the state.
  const { loading,user } = useSelector(store => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }


  const submitHandler = async (e) => {
    e.preventDefault();//restrict the refresh of page
    // console.log(input);

    dispatch(setloading(true));
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      if (res.data.success) {

        console.log("User set ho raha hai:", res.data.user);///

        dispatch(setUser(res.data.user));//data Ui pa show hoga iss sa
        navigate("/");
        toast.success(res.data.message);//Agar toast use nahi karna chahte, to UI per error message show karein, taake user ko console open na karna pade.
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally {
      dispatch(setloading(false));
    }
  }


//
useEffect(()=>{
      if(user){
        navigate("/");
      }  
},[]);




  return (
    <div>
      <Navbar />

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.9 }}

        className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-lg shadow-[#5021a1]'>
          <h1 className='font-bold text-center text-3xl mb-5'><i> Login</i></h1>

          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="xyz@gmail.com" />
          </div>

          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="password" />
          </div>

          <div className='flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4 my-5">

              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className='cursor-pointer'
                />
                <Label htmlFor="r1">Student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className='cursor-pointer' />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

          </div>

          {
            loading ? (<Button className="w-full rounded-md font-bold bg-black text-white my-5 py-1"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait</Button>
            ) :
              (
                <Button type="submit" className="w-full rounded-md font-bold bg-black text-white my-5 py-1"> Login</Button>
              )}

          <span className='text-sm'>Create a new account?<Link to="/signup" className='text-blue-600'>Signup</Link></span>


        </form>
      </motion.div>

    </div>

  )
}

export default Login;

