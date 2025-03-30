import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className=" text-white py-8 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo and tagline */}
        <div className="flex flex-col items-center md:items-start">
          <img src={assets.logo} alt="Company Logo" className="w-32 mb-2" />
          <p className="text-gray-400 text-sm">Your trusted job search partner.</p>
        </div>
        {/* Social Icons */}
        <div className="flex gap-4">

          <a href="#"><img src={assets.facebook_icon} alt="Facebook" className="w-6 h-6" /></a>
          <a href="#"><img src={assets.twitter_icon} alt="Twitter" className="w-6 h-6" /></a>
          <a href="#"><img src={assets.adobe_logo} alt="LinkedIn" className="w-18" /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
