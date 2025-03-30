import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';

const JobListing = () => {
    const { search, searchFilter, setSearchFilter, jobs } = useContext(AppContext);
    const [showfilter, setShowFilter] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedcategory, setSelectedCategory] = useState([]);
    const [selectedlocation, setSelectedLocation] = useState([]);
    const jobsPerPage = 6;



    // Handle category selection
    const handleCategory = (category) => {
        setSelectedCategory(prev => 
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    // Handle location selection
    const handleLocation = (location) => {
        setSelectedLocation(prev => 
            prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
        );
    };

    // Filter jobs based on category and location selection
    const filteredJobs = jobs.filter(job =>
        (selectedcategory.length === 0 || selectedcategory.includes(job.category)) &&
        (selectedlocation.length === 0 || selectedlocation.includes(job.location))
    );

    // Calculate pagination
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const visibleJobs = filteredJobs.slice(startIndex, endIndex);

    return (
        <div className="p-6 bg-white flex gap-6 min-h-screen"> 
            {/* Sidebar */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                {search && (searchFilter?.title !== '' || searchFilter?.location !== '') && (
                    <>
                        <h1 className="text-xl font-semibold mb-3">Current Search</h1>
                        <div className="flex gap-2 flex-wrap">
                            {searchFilter?.title && (
                                <span className="flex items-center bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    {searchFilter.title}
                                    <img
                                        onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
                                        src={assets.cross_icon}
                                        alt="Clear title filter"
                                        className="w-4 h-4 ml-2 cursor-pointer hover:opacity-75"
                                    />
                                </span>
                            )}
                            {searchFilter?.location && (
                                <span className="flex items-center bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                                    {searchFilter.location}
                                    <img
                                        onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
                                        src={assets.cross_icon}
                                        alt="Clear location filter"
                                        className="w-4 h-4 ml-2 cursor-pointer hover:opacity-75"
                                    />
                                </span>
                            )}
                        </div>
                    </>
                )}
                <button onClick={() => setShowFilter(prev => !prev)} className='px-6 lg:hidden py-1.5 rounded border border-gray-400'>
                    {showfilter ? "Close" : "Filter"}
                </button>
                {/* Category filter */}
                <div className={showfilter ? "" : ' max-lg:hidden pt-2'}>
                    <h4 className='font-medium text-lg'>Search By Categories</h4>
                    <ul>
                        {JobCategories.map((category, index) => (
                            <li className='cursor-pointer flex items-center' key={index}>
                                <input 
                                    onChange={() => handleCategory(category)}
                                    checked={selectedcategory.includes(category)}
                                    className='scale-125 m-3' 
                                    type="checkbox" 
                                />{category}
                            </li>
                        ))}
                    </ul>
                </div> 
                <div className={showfilter ? "" : ' max-lg:hidden pt-2'}>
                    <h4 className='font-medium text-lg'>Search By Location</h4>
                    <ul>
                        {JobLocations.map((location, index) => (
                            <li className='cursor-pointer flex items-center' key={index}>
                                <input 
                                    onChange={() => handleLocation(location)}
                                    checked={selectedlocation.includes(location)}
                                    className='scale-125 m-3' 
                                    type="checkbox" 
                                />{location}
                            </li>
                        ))}
                    </ul>
                </div> 
            </div>
            <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
                <h1 className='font-medium text-xl py-2'>Latest Jobs</h1>
                <p className='mb-8'>Get your desired job from top company</p>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {visibleJobs.map((job, index) => (
                        <JobCard job={job} key={index} />
                    ))}
                </div>
                {/* Pagination */}
                {filteredJobs.length > jobsPerPage && (
                    <div className="flex justify-center items-center gap-4 mt-4">
                        <button
                            className="p-2 rounded bg-gray-200 hover:bg-gray-300"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <img src={assets.left_arrow_icon} alt="Previous" className="w-2 h-2" />
                        </button>
                        {Array.from({ length: Math.ceil(filteredJobs.length / jobsPerPage) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-2 rounded ${currentPage === index + 1 ? "bg-blue-100 text-blue-500" : "bg-white hover:bg-blue-200"}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className="p-2 rounded bg-gray-200 hover:bg-gray-300"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredJobs.length / jobsPerPage)))}
                            disabled={currentPage === Math.ceil(filteredJobs.length / jobsPerPage)}
                        >
                            <img src={assets.right_arrow_icon} alt="Next" className="w-2 h-2" />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default JobListing;
