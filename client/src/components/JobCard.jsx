import { useNavigate } from 'react-router-dom';
import React from 'react';
import { assets, jobsData } from '../assets/assets';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Company Icon */}
      <div className="flex justify-center mb-3">
        <img src={assets.company_icon} alt="Company Logo" className="w-12 h-12" />
      </div>

      {/* Job Title */}
      <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>

      {/* Job Location & Level */}
      <div className="flex justify-between text-gray-600 text-sm my-2">
        <span className="bg-gray-100 px-3 py-1 rounded-full">{job.location}</span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{job.level}</span>
      </div>

      {/* Job Description */}
      <p className="text-gray-700 text-sm mt-2" dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) + '...' }}></p>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-2">
        <button  onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}}  className="bg-blue-500 p-2 text-white px-4 rounded-lg hover:bg-blue-600  transition">
          Apply Now
        </button>
        <button  onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}}  className="border border-blue-500 text-blue-500 px-4  rounded-lg hover:bg-blue-100 transition">
          Learn More
        </button>
      </div>
    
    </div>
  );
};

export default JobCard;
