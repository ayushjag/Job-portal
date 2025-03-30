import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's Snow theme CSS
import { JobCategories, JobLocations } from '../assets/assets';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [salary, setSalary] = useState('');

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Initialize Quill editor
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        },
        placeholder: 'Enter job description...',
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const description = quillRef.current.root.innerHTML; // Get HTML content from Quill
    const jobData = {
      title,
      description,
      location,
      category,
      level,
      salary,
    };
    console.log('Job Data:', jobData);
    // You can now send `jobData` to your backend or handle it as needed
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Job Title */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Job Title</label>
        <input
          type="text"
          placeholder="Enter job title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Job Description (Quill Editor) */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Job Description</label>
        <div ref={editorRef} className="bg-white rounded-lg border border-gray-300"></div>
      </div>

      {/* Job Details (Category, Location, Level) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Job Category */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Job Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select category</option>
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Job Location */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Job Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select location</option>
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Job Level */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Job Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select level</option>
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>
      </div>

      {/* Job Salary */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-2">Job Salary</label>
        <input
          type="text"
          placeholder="Enter salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Job
        </button>
      </div>
    </form>
  );
};

export default AddJob;