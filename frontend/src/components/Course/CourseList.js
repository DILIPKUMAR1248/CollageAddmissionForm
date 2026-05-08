/**
 * CourseList Component
 * Displays a list of all courses with options to view, edit, and delete
 */

import React, { useState, useEffect } from 'react';
import { courseAPI } from '../../services/api';
import './CourseList.css';

const CourseList = () => {
  // State to store courses data
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all courses from API
   */
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getAllCourses();
      setCourses(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch courses. Please try again later.');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a course by ID
   * @param {number} id - Course ID to delete
   */
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseAPI.deleteCourse(id);
        // Refresh courses list after deletion
        fetchCourses();
        alert('Course deleted successfully!');
      } catch (err) {
        setError('Failed to delete course. Please try again.');
        console.error('Error deleting course:', err);
      }
    }
  };

  // Fetch courses when component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  // Display loading state
  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  // Display error state
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="course-list">
      <h2>Course Management</h2>
      
      {/* Add New Course Button */}
      <div className="actions">
        <button 
          className="btn btn-primary"
          onClick={() => window.location.href = '/courses/new'}
        >
          Add New Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="table-container">
        <table className="courses-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Priority</th>
              <th>Mode</th>
              <th>Applicant ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">No courses found</td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.courseName}</td>
                  <td>
                    <span className={`priority ${course.priority?.toLowerCase() || 'normal'}`}>
                      {course.priority || 'NORMAL'}
                    </span>
                  </td>
                  <td>
                    <span className={`mode ${course.mode?.toLowerCase() || 'regular'}`}>
                      {course.mode || 'REGULAR'}
                    </span>
                  </td>
                  <td>{course.applicant?.id || 'N/A'}</td>
                  <td className="actions-cell">
                    <button 
                      className="btn btn-view"
                      onClick={() => window.location.href = `/courses/${course.id}`}
                    >
                      View
                    </button>
                    <button 
                      className="btn btn-edit"
                      onClick={() => window.location.href = `/courses/edit/${course.id}`}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-delete"
                      onClick={() => handleDelete(course.id)}
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

export default CourseList;
