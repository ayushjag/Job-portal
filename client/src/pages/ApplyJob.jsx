import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';

const ApplyJob = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);

  useEffect(() => {
    if (jobs.length > 0) {
      const data = jobs.find((job) => job._id === id);
      if (data) {
        setJobData(data);
      }
    }
  }, [id, jobs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted successfully!');
  };

  return jobData ? (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 flex">
        {/* Left section */}
        <div className="w-2/3 pr-6">
          <h1 className="text-3xl font-bold mb-4">{jobData.title}</h1>
          <div className="flex items-center gap-3 mb-4">
            <img src={assets.company_icon} alt={jobData.name} className="w-10 h-10" />
            <button className="bg-blue-600 ml-100 text-white p-2 rounded-md hover:bg-blue-700 transition">Apply Jobs</button>
            <h2 className="text-lg font-semibold">{jobData.name}</h2>
          </div>
          <p className="text-gray-600 mb-2"><strong>Location:</strong> {jobData.location}</p>
          <p className="text-gray-600 mb-2"><strong>Level:</strong> {jobData.level}</p>
          <p className="text-gray-600 mb-4"><strong>Category:</strong> {jobData.category}</p>
          <p className="text-gray-600 mb-4"><strong>Salary:</strong> {jobData.salary}K</p>
          <div dangerouslySetInnerHTML={{ __html: jobData.description }} className="mb-6 rich-text"></div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">Apply Now</button>
          </form>
        </div>

        {/* Right section */}
        <div className="w-1/3  pl-6">
          <h2 className="text-2xl font-bold mb-4">More jobs from {jobData.companyId.name}</h2>
          {jobs.filter(job => job._id !== jobData._id && job.companyId._id === jobData.companyId._id)
            .slice(0, 3)  // Show more jobs
            .map((job, index) => <JobCard key={index} job={job} />)}
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
