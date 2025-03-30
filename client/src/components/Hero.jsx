import React, { useContext, useRef } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Hero = () => {
  const { setSearch, setSearchFilter } = useContext(AppContext); // Ensure setSearchFilter exists in context
  const titleref = useRef();
  const locationref = useRef();

  const Onsearch = () => {
    setSearchFilter({
      title: titleref.current.value,
      location: locationref.current.value,
    });

    setSearch(true);

    console.log({
      title: titleref.current.value,
      location: locationref.current.value,
    });
  };

  return (
    <div className="bg-blue-50 ">
      {/* Hero Section */}
      <div className="container mx-auto pt-6 px-4">
        <div className="bg-blue-400 p-8 rounded-lg shadow-lg mb-5 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Over 10,000+ Jobs to Apply</h2>
          <p className="text-lg text-blue-100 mb-8">
            Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!
          </p>
          <div className="flex flex-col md:flex-row gap-4 mb-5 justify-center">
            <div className="flex items-center bg-white p-2  rounded-lg">
              <img src={assets.search_icon} alt="Search" className="w-6 h-6 mx-2" />
              <input
                className="bg-transparent focus:outline-none w-full"
                type="text"
                placeholder="Search for jobs"
                ref={titleref}
              />
            </div>
            <div className="flex items-center bg-white p-2 rounded-lg">
              <img src={assets.location_icon} alt="Location" className="w-6 h-6 mx-2" />
              <input
                className="bg-transparent focus:outline-none w-full"
                type="text"
                placeholder="Location"
                ref={locationref}
              />
            </div>
            <button
              onClick={Onsearch}
              className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='border border-gray-300 py-4  shadow-md mx-10 p-1'>
        <div className='flex justify-center  gap-19 my-3 m-3'>
          <p>Trusted By</p>
          <img className='h-6' src={assets.accenture_logo} alt="" />
          <img className='h-6' src={assets.adobe_logo} alt="" />
          <img className='h-6' src={assets.amazon_logo} alt="" />
          <img className='h-6' src={assets.facebook_icon} alt="" />
          <img className='h-6' src={assets.microsoft_logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
