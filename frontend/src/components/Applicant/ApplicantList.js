/**
 * ApplicantList Component
 * Displays a list of all applicants with options to view, edit, delete, and update status
 */

import React, { useState, useEffect } from 'react';
import { applicantAPI } from '../../services/api';
import './ApplicantList.css';

const ApplicantList = () => {
  // State to store applicants data
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all applicants from the API
   */
  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const response = await applicantAPI.getAllApplicants();
      setApplicants(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch applicants. Please try again later.');
      console.error('Error fetching applicants:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete an applicant by ID
   * @param {number} id - Applicant ID to delete
   */
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this applicant?')) {
      try {
        await applicantAPI.deleteApplicant(id);
        // Refresh the applicants list after deletion
        fetchApplicants();
        alert('Applicant deleted successfully!');
      } catch (err) {
        setError('Failed to delete applicant. Please try again.');
        console.error('Error deleting applicant:', err);
      }
    }
  };

  /**
   * Update applicant status
   * @param {number} id - Applicant ID
   * @param {string} status - New status value
   */
  const handleStatusUpdate = async (id, currentStatus) => {
    const newStatus = prompt('Enter new status (PENDING, APPROVED, REJECTED):', currentStatus);
    if (newStatus && newStatus.trim()) {
      try {
        await applicantAPI.updateApplicantStatus(id, newStatus.trim());
        // Refresh the applicants list after status update
        fetchApplicants();
        alert('Applicant status updated successfully!');
      } catch (err) {
        setError('Failed to update applicant status. Please try again.');
        console.error('Error updating status:', err);
      }
    }
  };

  // Fetch applicants when component mounts
  useEffect(() => {
    fetchApplicants();
  }, []);

  // Display loading state
  if (loading) {
    return <div className="loading">Loading applicants...</div>;
  }

  // Display error state
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="applicant-list">
      <h2>Applicant Management</h2>
      
      {/* Add New Applicant Button */}
      <div className="actions">
        <button 
          className="btn btn-primary"
          onClick={() => window.location.href = '/applicants/new'}
        >
          Add New Applicant
        </button>
      </div>

      {/* Applicants Table */}
      <div className="table-container">
        <table className="applicants-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">No applicants found</td>
              </tr>
            ) : (
              applicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td>{applicant.id}</td>
                  <td>{applicant.first_name}</td>
                  <td>{applicant.last_name}</td>
                  <td>{applicant.email}</td>
                  <td>{applicant.phone}</td>
                  <td>{applicant.city}</td>
                  <td>
                    <span className={`status ${applicant.status?.toLowerCase() || 'pending'}`}>
                      {applicant.status || 'PENDING'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button 
                      className="btn btn-view"
                      onClick={() => window.location.href = `/applicants/${applicant.id}`}
                    >
                      View
                    </button>
                    <button 
                      className="btn btn-edit"
                      onClick={() => window.location.href = `/applicants/edit/${applicant.id}`}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-status"
                      onClick={() => handleStatusUpdate(applicant.id, applicant.status)}
                    >
                      Status
                    </button>
                    <button 
                      className="btn btn-delete"
                      onClick={() => handleDelete(applicant.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantList;
