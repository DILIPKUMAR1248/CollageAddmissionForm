/**
 * CourseForm Component
 * Form for creating and editing courses
 */

import React, { useState, useEffect } from 'react';
import { courseAPI, applicantAPI } from '../../services/api';
import './CourseForm.css';

const CourseForm = ({ courseId, isEdit = false }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    courseName: '',
    priority: 'NORMAL',
    mode: 'REGULAR',
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
   * Fetch course data for editing
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchLoading(true);
        
        // Fetch applicants for dropdown
        await fetchApplicants();

        if (isEdit && courseId) {
          const response = await courseAPI.getCourse(courseId);
          const course = response.data;
          
          setFormData({
            courseName: course.courseName || '',
            priority: course.priority || 'NORMAL',
            mode: course.mode || 'REGULAR',
            applicant: course.applicant?.id || null
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
  }, [isEdit, courseId]);

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
        applicant: selectedApplicant || null
      };

      let response;
      if (isEdit && courseId) {
        // Update existing course
        response = await courseAPI.updateCourse(courseId, submitData);
        setSuccess('Course updated successfully!');
      } else {
        // Create new course
        response = await courseAPI.createCourse(submitData);
        setSuccess('Course created successfully!');
        // Reset form after successful creation
        setFormData({
          courseName: '',
          priority: 'NORMAL',
          mode: 'REGULAR',
          applicant: null
        });
      }
    } catch (err) {
      setError(`Failed to ${isEdit ? 'update' : 'create'} course. Please try again.`);
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
    <div className="course-form">
      <h2>{isEdit ? 'Edit Course' : 'Add New Course'}</h2>
      
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

      {/* Course Form */}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="courseName">Course Name *</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
            placeholder="Enter course name"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="NORMAL">Normal</option>
              <option value="LOW">Low</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="mode">Mode</label>
            <select
              id="mode"
              name="mode"
              value={formData.mode}
              onChange={handleChange}
            >
              <option value="REGULAR">Regular</option>
              <option value="ONLINE">Online</option>
              <option value="HYBRID">Hybrid</option>
              <option value="PART-TIME">Part-time</option>
            </select>
          </div>
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

        {/* Form Actions */}
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Course' : 'Create Course')}
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

export default CourseForm;
