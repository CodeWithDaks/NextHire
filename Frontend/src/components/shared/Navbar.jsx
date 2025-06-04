
import React from 'react';
import { USER_API_END_POINT } from '@/utils/constant';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import axios from 'axios';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { Button } from '../ui/button';


const Navbar = () => {

  // const user =true;//Agar user ha tu  Profile show hoga
  //Agar user ni ha tu login or singUp button show hoga

  const { user } = useSelector(store => store.auth);
  // console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  //For logging out the page:-
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });//withCredentials:true jab ham cross-origin request kar raha ho tu iska use karta ha
      if (res.data.success) {
        dispatch(setUser(null));
        localStorage.clear();// <-- clear persisted Redux state
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>

        <div><h1 className='text-2xl font-bold'>Next<span className='text-[#F83002]'>Hire</span></h1></div>

        <div className='flex items-center gap-12'>
          <ul className='flex font-bold items-center gap-5 cursor-pointer'>

            {
              //Yaha pa Home,Job,Browser all there are dispaly But if the role of user was a recruiter than we change this.So we render user conditionaly
              user && user.role === 'recruiter' ? (
                <>
                  <li className='hover:text-[#F83002]'><Link to="/admin/companies"> Companies</Link></li>
                  <li className='hover:text-[#F83002]'><Link to="/admin/jobs">Jobs</Link></li>
                </>
              ) : (
                <>
                  <li className='hover:text-[#F83002]'><Link to="/">Home</Link></li>
                  <li className='hover:text-[#F83002]'><Link to="/jobs">Jobs</Link></li>
                  <li className='hover:text-[#F83002]'><Link to="/browse">Browse</Link></li>
                </>
              )
            }



            {/* <li className='hover:text-[#F83002]'><Link to="/">Home</Link></li>
            <li className='hover:text-[#F83002]'><Link to="/jobs">Jobs</Link></li>
            <li className='hover:text-[#F83002]'><Link to="/browse">Browse</Link></li>   */}
          </ul>



          {
            !user ? (
              <div className='flex items-center gap-2'>

                <Link to="/login"><Button variant="outline" >Login</Button></Link>
                <Link to="/signup"><Button className='text-white text-1xl rounded-xl bg-[#5021a1] hover:bg-[#412571] p-2'>Signup</Button></Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className='cursor-pointer w-14'>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" className='rounded-3xl' />
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className='w-80'>
                  <div className=''>
                    <div className='flex gap-2 space-y-2'>
                      <Avatar className="cursor-pointer w-10">
                        {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" class="rounded-2xl" /> */}

                        {/* Dynamically Pic */}
                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" class="rounded-2xl" />
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-[#F83002] ">{user?.fullname}</h4>
                        <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                      </div>
                    </div>



                    <div className="flex flex-col gap-3 my-2 text-gray-950">

                      {
                        //Yha ham view profile ko only student ka lia show kara raha ha admin ka lia kyoki admin ki koi profile thodi hogi vo tu job post kara ga                      
                        user && user.role === 'student' && (
                          <div className='flex w-fit items-center gap-2 cursor-pointer'>
                            <User2 />
                            <button variant="link"><Link to="/profile">View Profile</Link></button>
                          </div>

                        )
                      }


                      {/* {
                     //Phala ham asa kar raha tha jab view profile dono ka account pa login karna pa show ho raha tha    
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <User2 />
                        <button variant="link"><Link to="/profile">View Profile</Link></button>
                      </div> } */}


                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <LogOut />
                        <button onClick={logoutHandler} variant="link">Logout</button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
        </div>


      </div>
    </div>

  )
}

export default Navbar;



