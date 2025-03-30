import React from 'react';
import { assets, viewApplicationsPageData } from '../assets/assets';

const ViewApplication = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">SNo</th>
              <th className="px-4 py-2">Applicant</th>
              <th className="px-4 py-2">Job Title</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Resume</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((application, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 flex items-center space-x-2">
                  <img src={application.imgSrc} alt="Applicant" className="w-8 h-8 rounded-full" />
                  <span>{application.name}</span>
                </td>
                <td className="px-4 py-2 text-center">{application.jobTitle}</td>
                <td className="px-4 py-2 text-center">{application.location}</td>
                <td className="px-4 py-2 text-center">
                  <a
                    href=''
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline flex items-center justify-center"
                  >
                    Resume <img className='w-4 h-4 ml-2' src={assets.resume_download_icon} alt="Resume Download Icon" />
                  </a>
                </td>
                <td className="px-4 py-2 text-center">
                  <button className="bg-white text-black px-3 py-1 rounded-lg hover:bg-gray-200 mr-2">
                    Accept
                  </button>
                  <button className="bg-white text-black px-3 py-1 rounded-lg hover:bg-gray-200">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplication;