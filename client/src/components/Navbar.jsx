import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { SignIn, useClerk,UserButton,useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const {openSignIn} = useClerk()
    const {user} = useClerk()
    const navigate =  useNavigate()
      const {setShowrecruiterlogin} = useContext(AppContext)
    
  return (
    <div className='shadow py-4'>
        <div className='flex container items-center justify-between w-full'>
            <img onClick={()=>navigate('/')} className='pl-4 cursor-pointer' src={assets.logo}></img>
            {
                user ? <div className='gap-3 flex items-center'>
                    <Link to='/applications'>Applied Jobs</Link>
                    <p>|</p>
                    <p className='max-sm:hidden'>{user.firstName+""+ user.lastName}</p>
                    <UserButton/>
                    </div>
                    :
                     <div className='gap-5 max-sm:text-sm flex'>
                     <button onClick={e=>setShowrecruiterlogin(true)} className='text-gray-600 cursor-pointer'>Recruitor login</button>
                     <button onClick={e=>openSignIn()} className='bg-blue-500 text-white  hover:bg-blue-600 transition duration-300 px-4 py-3 rounded-full cursor-pointer'>Login</button>
                
                 </div>
            }
           
        </div>
    </div>
  )
}

export default Navbar
