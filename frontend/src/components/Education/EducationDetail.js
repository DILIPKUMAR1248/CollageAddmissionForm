/**
 * EducationDetail Component
 * Displays detailed information about a single education record
 */

import React, { useState, useEffect } from 'react';
import { educationAPI } from '../../services/api';
import './EducationDetail.css';

const EducationDetail = ({ educationId }) => {
  // State for education data
  const [education, setEducation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch education details by ID
   */
  const fetchEducationDetail = async () => {
    try {
      setLoading(true);
      const response = await educationAPI.getEducation(educationId);
      setEducation(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch education details. Please try again later.');
      console.error('Error fetching education details:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch education data when component mounts
  useEffect(() => {
    if (educationId) {
      fetchEducationDetail();
    }
  }, [educationId]);

  /**
   * Format date for display
   * @param {string} dateString - Date string from API
   * @returns {string} Formatted date
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /**
   * Calculate duration between start and end dates
   * @param {string} startDate - Start date string
   * @param {string} endDate - End date string
   * @returns {string} Duration string
   */
  const calculateDuration = (startDate, endDate) => {
    if (!startDate) return 'N/A';
    
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                   (end.getMonth() - start.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    } else {
      return `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    }
  };

  // Display loading state
  if (loading) {
    return <div className="loading">Loading education details...</div>;
  }

  // Display error state
  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button 
          className="btn btn-primary"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    );
  }

  // Display no data state
  if (!education) {
    return (
      <div className="no-data">
        <p>Education record not found</p>
        <button 
          className="btn btn-primary"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="education-detail">
      <div className="detail-header">
        <h2>Education Details</h2>
        <div className="header-actions">
          <button 
            className="btn btn-edit"
            onClick={() => window.location.href = `/education/edit/${education.id}`}
          >
            Edit Education
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => window.history.back()}
          >
            Back to List
          </button>
        </div>
      </div>

      {/* Education Information Card */}
      <div className="detail-card">
        <div className="card-header">
          <h3>Academic Information</h3>
          {education.grade && (
            <span className={`grade-badge ${education.grade.toLowerCase()}`}>
              Grade: {education.grade}
            </span>
          )}
        </div>
        
        <div className="card-content">
          <div className="info-grid">
            {/* Institution Information */}
            <div className="info-section">
              <h4>Institution Details</h4>
              <div className="info-row">
                <span className="label">Education ID:</span>
                <span className="value">{education.id}</span>
              </div>
              <div className="info-row">
                <span className="label">College/University:</span>
                <span className="value">{education.CollageName}</span>
              </div>
              <div className="info-row">
                <span className="label">Degree:</span>
                <span className="value">{education.degree}</span>
              </div>
              <div className="info-row">
                <span className="label">Field of Study:</span>
                <span className="value">{education.fieldOfStudy}</span>
              </div>
              <div className="info-row">
                <span className="label">Grade/CGPA:</span>
                <span className="value">{education.grade || 'Not specified'}</span>
              </div>
            </div>

            {/* Timeline Information */}
            <div className="info-section">
              <h4>Timeline</h4>
              <div className="info-row">
                <span className="label">Start Date:</span>
                <span className="value">{formatDate(education.startDate)}</span>
              </div>
              <div className="info-row">
                <span className="label">End Date:</span>
                <span className="value">
                  {education.endDate ? formatDate(education.endDate) : 'Ongoing'}
                </span>
              </div>
              <div className="info-row">
                <span className="label">Duration:</span>
                <span className="value">
                  {calculateDuration(education.startDate, education.endDate)}
                </span>
              </div>
              <div className="info-row">
                <span className="label">Status:</span>
                <span className="value">
                  {education.endDate ? 'Completed' : 'Ongoing'}
                </span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          {education.description && (
            <div className="description-section">
              <h4>Additional Information</h4>
              <div className="description-content">
                {education.description}
              </div>
            </div>
          )}

          {/* Applicant Information */}
          {education.applicant && (
            <div className="applicant-section">
              <h4>Applicant Information</h4>
              <div className="applicant-info">
                <div className="info-row">
                  <span className="label">Applicant ID:</span>
                  <span className="value">{education.applicant.id}</span>
                </div>
                <div className="info-row">
                  <span className="label">Name:</span>
                  <span className="value">
                    {education.applicant.first_name} {education.applicant.last_name}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Email:</span>
                  <span className="value">{education.applicant.email}</span>
                </div>
                <div className="info-row">
                  <span className="label">Phone:</span>
                  <span className="value">{education.applicant.phone}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Actions */}
      <div className="action-section">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button 
            className="btn btn-edit"
            onClick={() => window.location.href = `/education/edit/${education.id}`}
          >
            Edit Education
          </button>
          <button 
            className="btn btn-delete"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this education record?')) {
                educationAPI.deleteEducation(education.id)
                  .then(() => {
                    alert('Education record deleted successfully!');
                    window.location.href = '/education';
                  })
                  .catch(err => {
                    alert('Failed to delete education record. Please try again.');
                    console.error('Error deleting education record:', err);
                  });
              }
            }}
          >
            Delete Education
          </button>
          {education.applicant && (
            <button 
              className="btn btn-view"
              onClick={() => window.location.href = `/applicants/${education.applicant.id}`}
            >
              View Applicant
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationDetail;
