import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const RecruiterLogin = () => {
  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);
  const {setShowrecruiterlogin} = useContext(AppContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state === 'Sign up' && !isTextDataSubmitted) {
      setIsTextDataSubmitted(true);
    }
  };
  useEffect(()=>{
    document.body.style.overflow = 'hidden'
    return ()=>{
      document.body.style.overflow = 'unset'

    }
  })

  return (
    <div className="absolute top-0 left-0 right-0 min-h-screen flex items-center justify-center backdrop-blur-sm bg-opacity-50">
      <form onSubmit={handleSubmit} className="relative bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
        <img 
          onClick={() => setShowrecruiterlogin(false)} 
          src={assets.cross_icon} 
          className="absolute top-4 right-4 w-4 h-4 cursor-pointer" 
          alt="Close" 
        />
        <h1 className="text-2xl font-bold text-center">Recruiter {state}</h1>
        <p className="text-gray-500 text-center">
          {state === 'Login' ? 'Welcome back! Please log in' : 'Create an account to get started'}
        </p>

        {state === 'Sign up' && isTextDataSubmitted ? (
          <div className="flex flex-col items-center space-y-2">
            <label htmlFor="image" className="cursor-pointer">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload Area"
                className="w-32 h-32 object-cover border-2 border-dashed border-gray-300 rounded-full"
              />
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
            <p className="text-sm text-gray-500">Upload Company Logo</p>
          </div>
        ) : (
          <>
            {state !== 'Login' && (
              <div className="flex items-center border rounded-lg p-2 gap-2">
                <img src={assets.person_icon} alt="Person Icon" className="w-5 h-5" />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full outline-none"
                />
              </div>
            )}
          </>
        )}

        <div className="flex items-center border rounded-lg p-2 gap-2">
          <img src={assets.email_icon} alt="Email Icon" className="w-5 h-5" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full outline-none"
            required
          />
        </div>

        <div className="flex items-center border rounded-lg p-2 gap-2">
          <img src={assets.lock_icon} alt="Lock Icon" className="w-5 h-5" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          {state === 'Login' ? 'Login' : 'Create Account'}
        </button>

        <p className="text-center">
          {state === 'Login' ? (
            <>Don't have an account? <span className='cursor-pointer text-blue-500' onClick={() => setState('Sign up')}>Sign up</span></>
          ) : (
            <>Already have an account? <span className='cursor-pointer text-blue-500' onClick={() => setState('Login')}>Login</span></>
          )}
        </p>
      </form>
    </div>
  );
};

export default RecruiterLogin;