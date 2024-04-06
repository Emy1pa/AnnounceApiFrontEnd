import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const AnnounceList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  // Function to fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/list', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAnnouncements(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch announcements when component mounts
  useEffect(() => {
    fetchAnnouncements();
  }, []); // Empty dependency array means this effect will only run once after the initial render

  // Function to handle deletion of announcement
  const handleDelete = async (announcementId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/announcement/${announcementId}`);
      // Update announcements state after deletion
      setAnnouncements(announcements.filter(announcement => announcement.id !== announcementId));
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to handle adding announcement
  const handleAddAnnouncement = () => {
    navigate("/organizer");
};

  return (
    <div className="container mx-auto px-4">
      {/* Button for adding announcement */}
      <button onClick={handleAddAnnouncement} className="bg-green-500 hover:bg-green-700 text-white mt-8 float-right font-bold py-2 px-4 rounded mb-4">
        Add Announcement
      </button>

      {/* Table */}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Required Skills</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map(announcement => (
            <tr key={announcement.id}>
              <td className="border px-4 py-2">{announcement.id}</td>
              <td className="border px-4 py-2">{announcement.title}</td>
              <td className="border px-4 py-2">{announcement.type}</td>
              <td className="border px-4 py-2">{announcement.date}</td>
              <td className="border px-4 py-2">{announcement.description}</td>
              <td className="border px-4 py-2">{announcement.location}</td>
              <td className="border px-4 py-2">
                {Array.isArray(announcement.required_skills) ? announcement.required_skills.join(', ') : 'No skills specified'}
              </td>
              <td className="border px-4 py-2">
                <div className="flex">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(announcement.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnnounceList;
