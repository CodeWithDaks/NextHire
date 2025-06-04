import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import LogIn from './components/auth/login'
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';

import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';


import AdminJobs from './components/admin/AdminJobs';
import AdminPostJob from './components/admin/AdminPostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';





const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <LogIn />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },


  //->Now for Admin(Companies). ill now we do for students
  {
    path: "/admin/companies",
    element: <ProtectedRoute> <Companies /> </ProtectedRoute> //Component  are independent and reusable bits of code.
  },

  {
    path: "/admin/companies/create",
    element: <ProtectedRoute> <CompanyCreate /> </ProtectedRoute>
  },

  {
    path: "/admin/companies/:id",
    element:<ProtectedRoute> <CompanySetup /></ProtectedRoute>
  },


  //->For Admin(Jobs)
  {
    path: "/admin/jobs",
    element:<ProtectedRoute> <AdminJobs /> </ProtectedRoute> 
  },

   {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><AdminPostJob /> </ProtectedRoute>
  },

  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /> </ProtectedRoute>
  }



]);


function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App;
