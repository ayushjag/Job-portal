import React from 'react';
import { assets } from '../assets/assets';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Header */}
      <div className="w-full bg-white shadow-lg rounded-lg p-4   flex justify-between items-center">
        {/* Logo */}
        <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className="h-12 cursor-pointer" />
        {/* User Section */}
        <div className="flex items-center gap-4">
          <p className="text-lg font-semibold text-gray-700">Welcome Ayush</p>
          <div className="relative group">
            <img src={assets.company_icon} alt="Company Icon" className="h-10 w-10 rounded-full border" />
            {/* Dropdown */}
            <ul className="absolute right-0 w-32 bg-white list-none shadow-lg hidden group-hover:block">
              <li className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full min-h-screen ">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-white shadow-lg  rounded-lg p-4">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/dashboard/add-jobs"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 hover:bg-gray-100 rounded ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                  }`
                }
              >
                <img src={assets.add_icon} alt="Add Job" className="h-6 w-6" />
                <p>Add Job</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-jobs"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 hover:bg-gray-100 rounded ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                  }`
                }
              >
                <img src={assets.home_icon} alt="Manage Jobs" className="h-6 w-6" />
                <p>Manage Jobs</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/view-applications"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 hover:bg-gray-100 rounded ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                  }`
                }
              >
                <img src={assets.person_tick_icon} alt="View Applications" className="h-6 w-6" />
                <p>View Applications</p>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="w-3/4 bg-white shadow-lg pl-4 rounded-lg">
          {/* Main content goes here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;