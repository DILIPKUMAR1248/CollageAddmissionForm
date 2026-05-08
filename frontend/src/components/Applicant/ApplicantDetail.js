/**
 * ApplicantDetail Component
 * Displays detailed information about a single applicant
 */

import React, { useState, useEffect } from 'react';
import { applicantAPI } from '../../services/api';
import './ApplicantDetail.css';

const ApplicantDetail = ({ applicantId }) => {
  // State for applicant data
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch applicant details by ID
   */
  const fetchApplicantDetail = async () => {
    try {
      setLoading(true);
      const response = await applicantAPI.getApplicant(applicantId);
      setApplicant(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch applicant details. Please try again later.');
      console.error('Error fetching applicant details:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch applicant data when component mounts
  useEffect(() => {
    if (applicantId) {
      fetchApplicantDetail();
    }
  }, [applicantId]);

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

  // Display loading state
  if (loading) {
    return <div className="loading">Loading applicant details...</div>;
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
  if (!applicant) {
    return (
      <div className="no-data">
        <p>Applicant not found</p>
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
    <div className="applicant-detail">
      <div className="detail-header">
        <h2>Applicant Details</h2>
        <div className="header-actions">
          <button 
            className="btn btn-edit"
            onClick={() => window.location.href = `/applicants/edit/${applicant.id}`}
          >
            Edit Applicant
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => window.history.back()}
          >
            Back to List
          </button>
        </div>
      </div>

      {/* Applicant Information Card */}
      <div className="detail-card">
        <div className="card-header">
          <h3>Personal Information</h3>
          <span className={`status-badge ${applicant.status?.toLowerCase() || 'pending'}`}>
            {applicant.status || 'PENDING'}
          </span>
        </div>
        
        <div className="card-content">
          <div className="info-grid">
            {/* Basic Information */}
            <div className="info-section">
              <h4>Basic Information</h4>
              <div className="info-row">
                <span className="label">Full Name:</span>
                <span className="value">
                  {applicant.first_name} {applicant.last_name}
                </span>
              </div>
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{applicant.email}</span>
              </div>
              <div className="info-row">
                <span className="label">Phone:</span>
                <span className="value">{applicant.phone}</span>
              </div>
              <div className="info-row">
                <span className="label">Date of Birth:</span>
                <span className="value">{formatDate(applicant.dateOfBirth)}</span>
              </div>
              <div className="info-row">
                <span className="label">Gender:</span>
                <span className="value">{applicant.gender || 'Not specified'}</span>
              </div>
              <div className="info-row">
                <span className="label">Nationality:</span>
                <span className="value">{applicant.nationality || 'Not specified'}</span>
              </div>
            </div>

            {/* Address Information */}
            <div className="info-section">
              <h4>Address Information</h4>
              <div className="info-row">
                <span className="label">Address:</span>
                <span className="value">{applicant.address || 'Not specified'}</span>
              </div>
              <div className="info-row">
                <span className="label">City:</span>
                <span className="value">{applicant.city || 'Not specified'}</span>
              </div>
              <div className="info-row">
                <span className="label">State:</span>
                <span className="value">{applicant.state || 'Not specified'}</span>
              </div>
              <div className="info-row">
                <span className="label">ZIP Code:</span>
                <span className="value">{applicant.zip || 'Not specified'}</span>
              </div>
              <div className="info-row">
                <span className="label">Country:</span>
                <span className="value">{applicant.country || 'Not specified'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Actions */}
      <div className="action-section">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button 
            className="btn btn-status"
            onClick={() => {
              const newStatus = prompt('Enter new status (PENDING, APPROVED, REJECTED):', applicant.status);
              if (newStatus && newStatus.trim()) {
                applicantAPI.updateApplicantStatus(applicant.id, newStatus.trim())
                  .then(() => {
                    alert('Status updated successfully!');
                    fetchApplicantDetail();
                  })
                  .catch(err => {
                    alert('Failed to update status. Please try again.');
                    console.error('Error updating status:', err);
                  });
              }
            }}
          >
            Update Status
          </button>
          <button 
            className="btn btn-delete"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this applicant?')) {
                applicantAPI.deleteApplicant(applicant.id)
                  .then(() => {
                    alert('Applicant deleted successfully!');
                    window.location.href = '/applicants';
                  })
                  .catch(err => {
                    alert('Failed to delete applicant. Please try again.');
                    console.error('Error deleting applicant:', err);
                  });
              }
            }}
          >
            Delete Applicant
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetail;
