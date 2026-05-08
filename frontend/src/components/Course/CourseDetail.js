/**
 * CourseDetail Component
 * Displays detailed information about a single course
 */

import React, { useState, useEffect } from 'react';
import { courseAPI } from '../../services/api';
import './CourseDetail.css';

const CourseDetail = ({ courseId }) => {
  // State for course data
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch course details by ID
   */
  const fetchCourseDetail = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getCourse(courseId);
      setCourse(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch course details. Please try again later.');
      console.error('Error fetching course details:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch course data when component mounts
  useEffect(() => {
    if (courseId) {
      fetchCourseDetail();
    }
  }, [courseId]);

  // Display loading state
  if (loading) {
    return <div className="loading">Loading course details...</div>;
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
  if (!course) {
    return (
      <div className="no-data">
        <p>Course not found</p>
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
    <div className="course-detail">
      <div className="detail-header">
        <h2>Course Details</h2>
        <div className="header-actions">
          <button 
            className="btn btn-edit"
            onClick={() => window.location.href = `/courses/edit/${course.id}`}
          >
            Edit Course
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => window.history.back()}
          >
            Back to List
          </button>
        </div>
      </div>

      {/* Course Information Card */}
      <div className="detail-card">
        <div className="card-header">
          <h3>Course Information</h3>
          <div className="badges">
            <span className={`priority-badge ${course.priority?.toLowerCase() || 'normal'}`}>
              {course.priority || 'NORMAL'} PRIORITY
            </span>
            <span className={`mode-badge ${course.mode?.toLowerCase() || 'regular'}`}>
              {course.mode || 'REGULAR'}
            </span>
          </div>
        </div>
        
        <div className="card-content">
          <div className="info-grid">
            {/* Basic Information */}
            <div className="info-section">
              <h4>Basic Information</h4>
              <div className="info-row">
                <span className="label">Course ID:</span>
                <span className="value">{course.id}</span>
              </div>
              <div className="info-row">
                <span className="label">Course Name:</span>
                <span className="value">{course.courseName}</span>
              </div>
              <div className="info-row">
                <span className="label">Priority:</span>
                <span className="value">{course.priority || 'NORMAL'}</span>
              </div>
              <div className="info-row">
                <span className="label">Mode:</span>
                <span className="value">{course.mode || 'REGULAR'}</span>
              </div>
            </div>

            {/* Applicant Information */}
            <div className="info-section">
              <h4>Applicant Information</h4>
              {course.applicant ? (
                <>
                  <div className="info-row">
                    <span className="label">Applicant ID:</span>
                    <span className="value">{course.applicant.id}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Name:</span>
                    <span className="value">
                      {course.applicant.first_name} {course.applicant.last_name}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="label">Email:</span>
                    <span className="value">{course.applicant.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Phone:</span>
                    <span className="value">{course.applicant.phone}</span>
                  </div>
                </>
              ) : (
                <div className="info-row">
                  <span className="value">No applicant assigned</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Actions */}
      <div className="action-section">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button 
            className="btn btn-edit"
            onClick={() => window.location.href = `/courses/edit/${course.id}`}
          >
            Edit Course
          </button>
          <button 
            className="btn btn-delete"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this course?')) {
                courseAPI.deleteCourse(course.id)
                  .then(() => {
                    alert('Course deleted successfully!');
                    window.location.href = '/courses';
                  })
                  .catch(err => {
                    alert('Failed to delete course. Please try again.');
                    console.error('Error deleting course:', err);
                  });
              }
            }}
          >
            Delete Course
          </button>
          {course.applicant && (
            <button 
              className="btn btn-view"
              onClick={() => window.location.href = `/applicants/${course.applicant.id}`}
            >
              View Applicant
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
