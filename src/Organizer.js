import React, { useState } from "react";
import axios from 'axios';

const Organizer = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [requiredSkills, setRequiredSkills] = useState(['']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming you're using Bearer token authentication
        }
      };

      const response = await axios.post('http://127.0.0.1:8000/api/announcement', {
        title,
        type,
        date,
        description,
        location,
        required_skills: requiredSkills
      }, config);

      console.log('Event created successfully:', response.data);
      // Reset form fields after successful submission
      setTitle('');
      setType('');
      setDate('');
      setDescription('');
      setLocation('');
      setRequiredSkills(['']);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...requiredSkills];
    updatedSkills[index] = value;
    setRequiredSkills(updatedSkills);
  };

  const addSkillInput = () => {
    // Add a new empty string to the requiredSkills state array
    setRequiredSkills([...requiredSkills, '']);
  };

  return (
    <div className="text-center bg-white">
      <h1 className="text-3xl font-bold mb-6">Event Organizer</h1>
      <div className="max-w-md mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              name="title"
              placeholder="Title"
              value={title}
            />
          </div>
          <div className="mb-4 flex justify-between">
            <div className="w-1/2 pr-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="type"
              >
                Type
              </label>
              <input
                onChange={(e) => setType(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="type"
                type="text"
                name="type"
                placeholder="Type"
                value={type}
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="date"
              >
                Date & Time
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="datetime"
                type="datetime-local" // Change the type to "datetime-local"
                name="date"
                value={date} // You can store date and time together in this single state
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
              id="description"
              name="description"
              placeholder="Description"
              value={description}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              onChange={(e) => setLocation(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              type="text"
              name="location"
              placeholder="Location"
              value={location}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="required_skills"
            >
              Required Skills
            </label>
            {requiredSkills.map((skill, index) => (
              <input
                key={index}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                type="text"
                name="required_skills[]"
                placeholder={`Skill ${index + 1}`}
                value={skill}
              />
            ))}
            {/* Button to add a new input field for another skill */}
            <button
              onClick={addSkillInput}
              className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-400 rounded"
              type="button"
            >
              Add Skill
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Announce
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Organizer;
