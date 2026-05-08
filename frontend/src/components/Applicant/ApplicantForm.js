/**
 * ApplicantForm Component
 * Form for creating and editing applicants
 */

import React, { useState, useEffect } from 'react';
import { applicantAPI } from '../../services/api';
import './ApplicantForm.css';

const ApplicantForm = ({ applicantId, isEdit = false }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    nationality: '',
    status: 'PENDING'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /**
   * Fetch applicant data for editing
   */
  useEffect(() => {
    if (isEdit && applicantId) {
      const fetchApplicant = async () => {
        try {
          setLoading(true);
          const response = await applicantAPI.getApplicant(applicantId);
          const applicant = response.data;
          
          // Format date for input field
          const formattedDate = applicant.dateOfBirth 
            ? new Date(applicant.dateOfBirth).toISOString().split('T')[0]
            : '';
          
          setFormData({
            ...applicant,
            dateOfBirth: formattedDate
          });
          setError(null);
        } catch (err) {
          setError('Failed to fetch applicant data. Please try again.');
          console.error('Error fetching applicant:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchApplicant();
    }
  }, [isEdit, applicantId]);

  /**
   * Handle input field changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Format date for API
      const submitData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null
      };

      let response;
      if (isEdit && applicantId) {
        // Update existing applicant
        response = await applicantAPI.updateApplicant(applicantId, submitData);
        setSuccess('Applicant updated successfully!');
      } else {
        // Create new applicant
        response = await applicantAPI.createApplicant(submitData);
        setSuccess('Applicant created successfully!');
        // Reset form after successful creation
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          gender: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          country: '',
          nationality: '',
          status: 'PENDING'
        });
      }
    } catch (err) {
      setError(`Failed to ${isEdit ? 'update' : 'create'} applicant. Please try again.`);
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  // Display loading state
  if (loading && isEdit) {
    return <div className="loading">Loading applicant data...</div>;
  }

  return (
    <div className="applicant-form">
      <h2>{isEdit ? 'Edit Applicant' : 'Add New Applicant'}</h2>
      
      {/* Success Message */}
      {success && (
        <div className="success-message">
          {success}
          <button 
            className="close-btn"
            onClick={() => setSuccess(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
          <button 
            className="close-btn"
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="first_name">First Name *</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              placeholder="Enter first name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name *</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            placeholder="Enter address"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="zip">ZIP Code</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="Enter ZIP code"
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="nationality">Nationality</label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="Enter nationality"
          />
        </div>

        {isEdit && (
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Applicant' : 'Create Applicant')}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicantForm;
