/**
 * API Service for College Admission System
 * This file contains all HTTP requests to the backend API
 */

import axios from 'axios';

// Base URL for API calls
const API_BASE_URL = '/api/8080/v1';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Applicant API endpoints
 */
export const applicantAPI = {
  // Get all applicants
  getAllApplicants: () => api.get('/applicant/get/all'),
  
  // Get applicant by ID
  getApplicant: (id) => api.get(`/applicant/get/${id}`),
  
  // Create new applicant
  createApplicant: (applicantData) => api.post('/applicant/save', applicantData),
  
  // Update applicant
  updateApplicant: (id, applicantData) => api.put(`/applicant/update/${id}`, applicantData),
  
  // Delete applicant
  deleteApplicant: (id) => api.delete(`/applicant/delete/${id}`),
  
  // Update applicant status
  updateApplicantStatus: (id, status) => api.patch(`/applicant/status/${id}`, status),
};

/**
 * Course API endpoints
 */
export const courseAPI = {
  // Get all courses
  getAllCourses: () => api.get('/course/getAll'),
  
  // Get course by ID
  getCourse: (id) => api.get(`/course/get/${id}`),
  
  // Create new course
  createCourse: (courseData) => api.post('/course/save', courseData),
  
  // Update course
  updateCourse: (id, courseData) => api.put(`/course/update/${id}`, courseData),
  
  // Delete course
  deleteCourse: (id) => api.delete(`/course/delete/${id}`),
};

/**
 * Education API endpoints
 */
export const educationAPI = {
  // Get all education records
  getAllEducation: () => api.get('/education/getAll'),
  
  // Get education by ID
  getEducation: (id) => api.get(`/education/get/${id}`),
  
  // Create new education record
  createEducation: (educationData) => api.post('/education/save', educationData),
  
  // Update education
  updateEducation: (id, educationData) => api.put(`/education/update/${id}`, educationData),
  
  // Delete education
  deleteEducation: (id) => api.delete(`/education/delete/${id}`),
};

export default api;
