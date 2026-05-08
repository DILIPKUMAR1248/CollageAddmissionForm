/**
 * EducationList Component
 * Displays a list of all education records with options to view, edit, and delete
 */

import React, { useState, useEffect } from 'react';
import { educationAPI } from '../../services/api';
import './EducationList.css';

const EducationList = () => {
  // State to store education data
  const [educationRecords, setEducationRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all education records from API
   */
  const fetchEducationRecords = async () => {
    try {
      setLoading(true);
      const response = await educationAPI.getAllEducation();
      setEducationRecords(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch education records. Please try again later.');
      console.error('Error fetching education records:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete an education record by ID
   * @param {number} id - Education ID to delete
   */
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this education record?')) {
      try {
        await educationAPI.deleteEducation(id);
        // Refresh education list after deletion
        fetchEducationRecords();
        alert('Education record deleted successfully!');
      } catch (err) {
        setError('Failed to delete education record. Please try again.');
        console.error('Error deleting education record:', err);
      }
    }
  };

  /**
   * Format date for display
   * @param {string} dateString - Date string from API
   * @returns {string} Formatted date
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Fetch education records when component mounts
  useEffect(() => {
    fetchEducationRecords();
  }, []);

  // Display loading state
  if (loading) {
    return <div className="loading">Loading education records...</div>;
  }

  // Display error state
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="education-list">
      <h2>Education Management</h2>
      
      {/* Add New Education Record Button */}
      <div className="actions">
        <button 
          className="btn btn-primary"
          onClick={() => window.location.href = '/education/new'}
        >
          Add New Education Record
        </button>
      </div>

      {/* Education Records Table */}
      <div className="table-container">
        <table className="education-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>College Name</th>
              <th>Degree</th>
              <th>Field of Study</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Grade</th>
              <th>Applicant ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {educationRecords.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">No education records found</td>
              </tr>
            ) : (
              educationRecords.map((education) => (
                <tr key={education.id}>
                  <td>{education.id}</td>
                  <td>{education.CollageName}</td>
                  <td>{education.degree}</td>
                  <td>{education.fieldOfStudy}</td>
                  <td>{formatDate(education.startDate)}</td>
                  <td>{formatDate(education.endDate)}</td>
                  <td>
                    <span className={`grade ${education.grade?.toLowerCase() || 'none'}`}>
                      {education.grade || 'N/A'}
                    </span>
                  </td>
                  <td>{education.applicant?.id || 'N/A'}</td>
                  <td className="actions-cell">
                    <button 
                      className="btn btn-view"
                      onClick={() => window.location.href = `/education/${education.id}`}
                    >
                      View
                    </button>
                    <button 
                      className="btn btn-edit"
                      onClick={() => window.location.href = `/education/edit/${education.id}`}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-delete"
                      onClick={() => handleDelete(education.id)}
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

export default EducationList;
