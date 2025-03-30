import React from 'react';
import { manageJobsData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const ManageJobs = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-white text-black">
            <tr>
              <th className="px-4 py-2">SNo</th>
              <th className="px-4 py-2">Job Title</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Application</th>
              <th className="px-4 py-2">Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{job.title}</td>
                <td className="px-4 py-2 text-center">{job.date}</td>
                <td className="px-4 py-2 text-center">{job.location}</td>
                <td className="px-4 py-2 text-center">{job.applicants}</td>
                <td className='px-4 py-2 '> <input className='scale-125 ml-4' type="checkbox" /> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex m-4 justify-end'>
        <button onClick={()=>navigate('/dashboard/add-jobs')} className='bg-black text-white px-4 py-2 rounded'>Add new job</button>
      </div>
    </div>
  );
};

export default ManageJobs;