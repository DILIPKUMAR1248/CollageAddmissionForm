/**
 * EducationForm Component
 * Form for creating and editing education records
 */

import React, { useState, useEffect } from 'react';
import { educationAPI, applicantAPI } from '../../services/api';
import './EducationForm.css';

const EducationForm = ({ educationId, isEdit = false }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    CollageName: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    grade: '',
    description: '',
    applicant: null
  });

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /**
   * Fetch applicants for dropdown
   */
  const fetchApplicants = async () => {
    try {
      const response = await applicantAPI.getAllApplicants();
      setApplicants(response.data);
    } catch (err) {
      console.error('Error fetching applicants:', err);
    }
  };

  /**
   * Fetch education data for editing
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchLoading(true);
        
        // Fetch applicants for dropdown
        await fetchApplicants();

        if (isEdit && educationId) {
          const response = await educationAPI.getEducation(educationId);
          const education = response.data;
          
          // Format dates for input fields
          const formattedStartDate = education.startDate 
            ? new Date(education.startDate).toISOString().split('T')[0]
            : '';
          const formattedEndDate = education.endDate 
            ? new Date(education.endDate).toISOString().split('T')[0]
            : '';
          
          setFormData({
            CollageName: education.CollageName || '',
            degree: education.degree || '',
            fieldOfStudy: education.fieldOfStudy || '',
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            grade: education.grade || '',
            description: education.description || '',
            applicant: education.applicant?.id || null
          });
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchData();
  }, [isEdit, educationId]);

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
      // Find selected applicant object
      const selectedApplicant = applicants.find(app => app.id === parseInt(formData.applicant));
      
      const submitData = {
        ...formData,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
        applicant: selectedApplicant || null
      };

      let response;
      if (isEdit && educationId) {
        // Update existing education record
        response = await educationAPI.updateEducation(educationId, submitData);
        setSuccess('Education record updated successfully!');
      } else {
        // Create new education record
        response = await educationAPI.createEducation(submitData);
        setSuccess('Education record created successfully!');
        // Reset form after successful creation
        setFormData({
          CollageName: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          grade: '',
          description: '',
          applicant: null
        });
      }
    } catch (err) {
      setError(`Failed to ${isEdit ? 'update' : 'create'} education record. Please try again.`);
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  // Display loading state
  if (fetchLoading) {
    return <div className="loading">Loading data...</div>;
  }

  return (
    <div className="education-form">
      <h2>{isEdit ? 'Edit Education Record' : 'Add New Education Record'}</h2>
      
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

      {/* Education Form */}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="CollageName">College/University Name *</label>
          <input
            type="text"
            id="CollageName"
            name="CollageName"
            value={formData.CollageName}
            onChange={handleChange}
            required
            placeholder="Enter college or university name"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="degree">Degree *</label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              placeholder="Enter degree (e.g., Bachelor's, Master's, PhD)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="fieldOfStudy">Field of Study *</label>
            <input
              type="text"
              id="fieldOfStudy"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              required
              placeholder="Enter field of study (e.g., Computer Science, Engineering)"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date *</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="grade">Grade/CGPA</label>
            <input
              type="text"
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="Enter grade or CGPA (e.g., A, 3.8, First Class)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="applicant">Applicant</label>
            <select
              id="applicant"
              name="applicant"
              value={formData.applicant || ''}
              onChange={handleChange}
            >
              <option value="">Select Applicant (Optional)</option>
              {applicants.map((applicant) => (
                <option key={applicant.id} value={applicant.id}>
                  {applicant.first_name} {applicant.last_name} - {applicant.email}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter additional details about your education (achievements, activities, etc.)"
          />
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Education' : 'Create Education')}
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

export default EducationForm;
