import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { assets, jobsApplied } from '../assets/assets';
import { format } from 'date-fns';

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleSave = () => {
    // Handle save logic here (e.g., upload to backend)
    setIsEdit(false);
  };

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] mx-auto my-10">
        <h1 className="text-xl font-semibold">Your Resume</h1>
        <div className="flex mt-3 gap-4">
          {isEdit ? (
            <>
              <label htmlFor="resumeUpload" className="cursor-pointer">
                <p>Select Resume</p>
                <input
                  className="hidden"
                  id="resumeUpload"
                  onChange={handleResumeChange}
                  accept="application/pdf"
                  type="file"
                />
                <img className="py-2" src={assets.profile_upload_icon} alt="Upload Icon" />
              </label>
              <button onClick={handleSave} className="bg-green-200 text-black px-4 rounded-lg">
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              {resume ? (
                <a
                  className="bg-blue-100 text-blue-600 rounded-lg py-3 px-3"
                  href={URL.createObjectURL(resume)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              ) : (
                <p className="text-gray-500">No resume uploaded</p>
              )}
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border border-gray-300 rounded-lg px-5 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <h2 className="mt-8 text-lg font-semibold">Jobs Applied</h2>
        <table className="w-full mt-4 border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Company</th>
              <th className="p-2 text-left">Job Title</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="p-2 flex items-center gap-2 text-left">
                  <img src={job.logo} alt={job.company} className="w-8 h-8" />
                  <span>{job.company}</span>
                </td>
                <td className="p-2 text-left">{job.title}</td>
                <td className="p-2 text-left">{job.location}</td>
                <td className="p-2 text-left">{format(new Date(job.date), 'dd MMM yyyy')}</td>
                <td className={`${job.status == 'Accepted'? 'bg-green-100':job.status == 'Rejected'? 'bg-red-100':'bg-blue-100'} rounded px-3  py-1.5`}>{job.status}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Applications;
