/**
 * Main App Component
 * Root component with routing for the College Admission System
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Components
import LandingPage from './components/Landing/LandingPage';
import ApplicantList from './components/Applicant/ApplicantList';
import ApplicantForm from './components/Applicant/ApplicantForm';
import ApplicantDetail from './components/Applicant/ApplicantDetail';

import CourseList from './components/Course/CourseList';
import CourseForm from './components/Course/CourseForm';
import CourseDetail from './components/Course/CourseDetail';

import EducationList from './components/Education/EducationList';
import EducationForm from './components/Education/EducationForm';
import EducationDetail from './components/Education/EducationDetail';

// Import Navigation Component
import Navigation from './components/Navigation/Navigation';

/**
 * Main App Component
 * Sets up routing and overall layout for the application
 */
function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Header */}
        <Navigation />
        
        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            {/* Default Route - Landing Page */}
            <Route 
              path="/" 
              element={<LandingPage />} 
            />
            
            {/* Applicant Routes */}
            <Route 
              path="/applicants" 
              element={<ApplicantList />} 
            />
            <Route 
              path="/applicants/new" 
              element={<ApplicantForm />} 
            />
            <Route 
              path="/applicants/edit/:id" 
              element={<ApplicantForm isEdit={true} />} 
            />
            <Route 
              path="/applicants/:id" 
              element={<ApplicantDetail />} 
            />
            
            {/* Course Routes */}
            <Route 
              path="/courses" 
              element={<CourseList />} 
            />
            <Route 
              path="/courses/new" 
              element={<CourseForm />} 
            />
            <Route 
              path="/courses/edit/:id" 
              element={<CourseForm isEdit={true} />} 
            />
            <Route 
              path="/courses/:id" 
              element={<CourseDetail />} 
            />
            
            {/* Education Routes */}
            <Route 
              path="/education" 
              element={<EducationList />} 
            />
            <Route 
              path="/education/new" 
              element={<EducationForm />} 
            />
            <Route 
              path="/education/edit/:id" 
              element={<EducationForm isEdit={true} />} 
            />
            <Route 
              path="/education/:id" 
              element={<EducationDetail />} 
            />
            
            {/* Fallback Route for 404 */}
            <Route 
              path="*" 
              element={
                <div className="not-found">
                  <h2>404 - Page Not Found</h2>
                  <p>The page you're looking for doesn't exist.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => window.location.href = '/'}
                  >
                    Go Home
                  </button>
                </div>
              } 
            />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2024 College Admission System. All rights reserved.</p>
            <p>Built with React & Spring Boot</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
