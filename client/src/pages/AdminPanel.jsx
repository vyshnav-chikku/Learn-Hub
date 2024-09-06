import React, { useState, useEffect } from 'react';
import axios from '../axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AdminPanel = () => {
  const [mentors, setMentors] = useState([]);

  // Retrieve the token from localStorage or any other mechanism
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('/admin/mentors', config);
        setMentors(response.data);
      } catch (err) {
        console.error('Error fetching mentors:', err);
      }
    };

    fetchMentors();
  }, []);

  const handleVerification = async (mentorId, isVerified) => {
    try {
      await axios.put(`/admin/mentors/${mentorId}/verify`, { isVerified }, config);

      // Update the state to reflect the changes
      setMentors((prev) => 
        prev.map((mentor) => mentor._id === mentorId ? { ...mentor, isVerified } : mentor)
      );
    } catch (err) {
      console.error('Error updating verification status:', err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header">
          <h2 className="text-center">Admin Panel - Mentor Verification</h2>
        </div>
        <div className="card-body">
          {mentors.length > 0 ? (
            <table className="table table-hover table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Verified</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mentors.map(mentor => (
                  <tr key={mentor._id}>
                    <td>{mentor.name}</td>
                    <td>{mentor.email}</td>
                    <td>
                      <span className={`badge ${mentor.isVerified ? 'bg-success' : 'bg-danger'}`}>
                        {mentor.isVerified ? 'Verified' : 'Not Verified'}
                      </span>
                    </td>
                    <td>
                      {mentor.isVerified ? (
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleVerification(mentor._id, false)}
                        >
                          Unverify
                        </button>
                      ) : (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleVerification(mentor._id, true)}
                        >
                          Verify
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="alert alert-info text-center">
              No mentors available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
